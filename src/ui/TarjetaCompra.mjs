import { TransaccionTarjeta } from "../models/TransaccionTarjeta.mjs";
import { formatearCentavos, parsearCentavosPositivos } from "../utils/Dinero.mjs";
import { mostrarMensaje } from "./Renderizado.mjs";

function obtenerTextoTasa(tasa) {
  return `${(tasa * 100).toLocaleString("es-CO", { maximumFractionDigits: 1 })}% mensual`;
}

function renderizarHistorial(contenedor, transacciones) {
  contenedor.replaceChildren();
  const titulo = document.createElement("h3");
  titulo.textContent = "Compras recientes";
  contenedor.append(titulo);

  if (transacciones.length === 0) {
    const vacio = document.createElement("p");
    vacio.textContent = "Todavía no hay compras registradas.";
    contenedor.append(vacio);
    return;
  }

  for (const transaccion of [...transacciones].reverse()) {
    const detalle = document.createElement("details");
    const resumen = document.createElement("summary");
    resumen.textContent = `Compra del ${transaccion.fecha} · ${formatearCentavos(transaccion.montoOriginalCentavos)} · ${obtenerTextoTasa(transaccion.tasaMensual)} · Total: ${formatearCentavos(transaccion.totalAPagarCentavos)} · Pendiente: ${formatearCentavos(transaccion.deudaPendienteCentavos)}`;
    detalle.append(resumen);

    const listaCuotas = document.createElement("ol");
    for (const cuota of transaccion.cuotas) {
      const elemento = document.createElement("li");
      const estado = cuota.pagada
        ? `Pagada el ${cuota.pago.fecha} ${cuota.pago.hora}`
        : "Pendiente";
      elemento.textContent = `Cuota ${cuota.numeroCuota} de ${transaccion.numeroCuotas}: ${formatearCentavos(cuota.montoCentavos)} · Capital que repone cupo: ${formatearCentavos(cuota.montoCapitalCentavos)} · ${estado}`;
      listaCuotas.append(elemento);
    }

    detalle.append(listaCuotas);
    contenedor.append(detalle);
  }
}

export function renderizarTarjetaCompra(contenedor, servicioTarjeta, clienteId, alPagar = () => {}) {
  let tarjeta = servicioTarjeta.obtenerTarjeta(clienteId);
  contenedor.innerHTML = `
    <section aria-labelledby="titulo-tarjeta">
      <h2 id="titulo-tarjeta">Tarjeta de crédito</h2>
      <p>Cupo: <output data-limite></output></p>
      <p>Utilizado: <output data-utilizado></output></p>
      <p>Disponible: <output data-disponible></output></p>
      <form data-form-compra>
        <label for="monto-compra">Valor de la compra (COP)</label>
        <input id="monto-compra" name="monto" type="number" min="0.01" step="0.01" inputmode="decimal" required>
        <label for="numero-cuotas">Número de cuotas</label>
        <input id="numero-cuotas" name="numeroCuotas" type="number" min="1" step="1" value="1" required>
        <div data-cotizacion aria-live="polite"></div>
        <button class="button-primary" type="submit">Confirmar compra</button>
      </form>
      <div data-feedback-compra aria-live="polite"></div>
      <form data-form-pago>
        <h3>Pagar cuota pendiente</h3>
        <label for="compra-pago">Compra</label>
        <select id="compra-pago" name="transaccionTarjetaId" required></select>
        <label for="cuenta-pago">Cuenta de origen</label>
        <select id="cuenta-pago" name="cuentaOrigenId" required></select>
        <p data-resumen-pago aria-live="polite"></p>
        <p>El pago no agrega intereses ni comisiones. Se conserva el interés ya incluido en la compra.</p>
        <button class="button-primary" type="submit" disabled>Pagar siguiente cuota</button>
      </form>
      <div data-feedback-pago aria-live="polite"></div>
      <div data-historial-compras></div>
    </section>
  `;

  const formulario = contenedor.querySelector("[data-form-compra]");
  const monto = formulario.elements.monto;
  const cuotas = formulario.elements.numeroCuotas;
  const cotizacion = formulario.querySelector("[data-cotizacion]");
  const feedbackCompra = contenedor.querySelector("[data-feedback-compra]");
  const boton = formulario.querySelector("button[type=submit]");
  const formularioPago = contenedor.querySelector("[data-form-pago]");
  const compraPago = formularioPago.elements.transaccionTarjetaId;
  const cuentaPago = formularioPago.elements.cuentaOrigenId;
  const resumenPago = formularioPago.querySelector("[data-resumen-pago]");
  const botonPago = formularioPago.querySelector("button[type=submit]");

  function actualizarResumenTarjeta() {
    contenedor.querySelector("[data-limite]").textContent = formatearCentavos(tarjeta.limiteCreditoCentavos);
    contenedor.querySelector("[data-utilizado]").textContent = formatearCentavos(tarjeta.creditoUtilizadoCentavos);
    contenedor.querySelector("[data-disponible]").textContent = formatearCentavos(tarjeta.creditoDisponibleCentavos);
  }

  function actualizarFormularioPago() {
    const transaccionSeleccionadaId = compraPago.value;
    const cuentaSeleccionadaId = cuentaPago.value;
    const transaccionesPendientes = tarjeta.transacciones.filter(
      (transaccion) => transaccion.cuotas.some((cuota) => !cuota.pagada),
    );
    compraPago.replaceChildren();
    const opcionCompraInicial = document.createElement("option");
    opcionCompraInicial.value = "";
    opcionCompraInicial.textContent = transaccionesPendientes.length > 0
      ? "Selecciona una compra"
      : "No hay cuotas pendientes";
    compraPago.append(opcionCompraInicial);

    for (const transaccion of transaccionesPendientes) {
      const cuotaPendiente = transaccion.cuotas.find((cuota) => !cuota.pagada);
      const opcion = document.createElement("option");
      opcion.value = transaccion.id;
      opcion.dataset.numeroCuota = String(cuotaPendiente.numeroCuota);
      opcion.textContent = `Compra del ${transaccion.fecha} · Cuota ${cuotaPendiente.numeroCuota} de ${transaccion.numeroCuotas}`;
      compraPago.append(opcion);
    }

    if (transaccionesPendientes.some((transaccion) => transaccion.id === transaccionSeleccionadaId)) {
      compraPago.value = transaccionSeleccionadaId;
    }

    const cuentas = servicioTarjeta.listarCuentasPago(clienteId);
    cuentaPago.replaceChildren();
    const opcionCuentaInicial = document.createElement("option");
    opcionCuentaInicial.value = "";
    opcionCuentaInicial.textContent = cuentas.length > 0
      ? "Selecciona una cuenta"
      : "No hay cuentas de depósito disponibles";
    cuentaPago.append(opcionCuentaInicial);

    for (const cuenta of cuentas) {
      const opcion = document.createElement("option");
      opcion.value = cuenta.id;
      opcion.textContent = `${cuenta.tipo === "ahorros" ? "Cuenta de ahorros" : "Cuenta corriente"} · Saldo: ${formatearCentavos(cuenta.saldoCentavos)}`;
      cuentaPago.append(opcion);
    }

    if (cuentas.some((cuenta) => cuenta.id === cuentaSeleccionadaId)) {
      cuentaPago.value = cuentaSeleccionadaId;
    }

    const transaccion = transaccionesPendientes.find(
      (elemento) => elemento.id === compraPago.value,
    );
    const cuotaPendiente = transaccion?.cuotas.find((cuota) => !cuota.pagada);
    const cuenta = cuentas.find((elemento) => elemento.id === cuentaPago.value);
    if (cuotaPendiente) {
      resumenPago.textContent = `Siguiente cuota: ${formatearCentavos(cuotaPendiente.montoCentavos)} · Capital que repone cupo: ${formatearCentavos(cuotaPendiente.montoCapitalCentavos)}.`;
      if (cuenta && cuenta.saldoCentavos < cuotaPendiente.montoCentavos) {
        resumenPago.textContent += " Saldo insuficiente en la cuenta seleccionada.";
      }
    } else {
      resumenPago.textContent = "Selecciona una compra con cuotas pendientes.";
    }

    botonPago.disabled = !cuotaPendiente
      || !cuenta
      || cuenta.saldoCentavos < cuotaPendiente.montoCentavos;
  }

  function actualizarCotizacion() {
    boton.disabled = false;
    cotizacion.replaceChildren();
    if (!monto.value || !cuotas.value) {
      return;
    }

    try {
      const montoCentavos = parsearCentavosPositivos(monto.value);
      const numeroCuotas = Number(cuotas.value);
      const vistaPrevia = new TransaccionTarjeta({
        id: "vista-previa",
        tarjetaId: tarjeta.id,
        montoOriginalCentavos: montoCentavos,
        numeroCuotas,
      });
      const parrafo = document.createElement("p");
      parrafo.textContent = `${obtenerTextoTasa(vistaPrevia.tasaMensual)} · ${numeroCuotas} cuotas · Primera cuota: ${formatearCentavos(vistaPrevia.cuotasCentavos[0])} · Total: ${formatearCentavos(vistaPrevia.totalAPagarCentavos)}`;
      cotizacion.append(parrafo);

      if (montoCentavos > tarjeta.creditoDisponibleCentavos) {
        boton.disabled = true;
        mostrarMensaje(cotizacion, "La compra supera el cupo disponible.", "advertencia");
      }
    } catch {
      boton.disabled = true;
      mostrarMensaje(cotizacion, "Ingresa un valor positivo y un número entero de cuotas desde uno.", "advertencia");
    }
  }

  monto.addEventListener("input", actualizarCotizacion);
  cuotas.addEventListener("input", actualizarCotizacion);
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
      const resultado = servicioTarjeta.registrarCompra(clienteId, tarjeta.id, monto.value, Number(cuotas.value));
        tarjeta = servicioTarjeta.obtenerTarjeta(clienteId);
        actualizarResumenTarjeta();
      formulario.reset();
      actualizarCotizacion();
      renderizarHistorial(contenedor.querySelector("[data-historial-compras]"), tarjeta.transacciones);
        actualizarFormularioPago();
        mostrarMensaje(feedbackCompra, `Compra aprobada. Cupo disponible: ${formatearCentavos(resultado.creditoDisponibleCentavos)}.`, "exito");
    } catch (error) {
        mostrarMensaje(feedbackCompra, error.message, "error");
    }
  });

    compraPago.addEventListener("change", actualizarFormularioPago);
    cuentaPago.addEventListener("change", actualizarFormularioPago);
    formularioPago.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const opcionCompra = compraPago.selectedOptions[0];
      const transaccionTarjetaId = compraPago.value;
      const numeroCuota = Number(opcionCompra?.dataset.numeroCuota);
      try {
        const resultado = servicioTarjeta.pagarCuota(
          clienteId,
          transaccionTarjetaId,
          numeroCuota,
          cuentaPago.value,
        );
        tarjeta = servicioTarjeta.obtenerTarjeta(clienteId);
        actualizarResumenTarjeta();
        renderizarHistorial(contenedor.querySelector("[data-historial-compras]"), tarjeta.transacciones);
        compraPago.value = "";
        actualizarFormularioPago();
        mostrarMensaje(
          contenedor.querySelector("[data-feedback-pago]"),
          `Cuota pagada por ${formatearCentavos(resultado.pago.montoCentavos)}. Capital que repone cupo: ${formatearCentavos(resultado.pago.montoCapitalCentavos)}. Disponible: ${formatearCentavos(resultado.creditoDisponibleCentavos)}.`,
          "exito",
        );
        alPagar();
      } catch (error) {
        mostrarMensaje(contenedor.querySelector("[data-feedback-pago]"), error.message, "error");
      }
    });

    actualizarResumenTarjeta();
  renderizarHistorial(contenedor.querySelector("[data-historial-compras]"), tarjeta.transacciones);
    actualizarFormularioPago();
}
