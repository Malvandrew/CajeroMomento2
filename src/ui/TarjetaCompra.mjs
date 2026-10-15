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

  const tabla = document.createElement("table");
  tabla.className = "movement-table";
  tabla.innerHTML = `
    <thead><tr><th scope="col">Fecha</th><th scope="col">Compra</th><th scope="col">Cuotas</th><th scope="col">Tasa</th><th scope="col">Valor cuota</th><th scope="col">Total</th></tr></thead>
    <tbody></tbody>
  `;
  const cuerpo = tabla.querySelector("tbody");

  for (const transaccion of [...transacciones].reverse()) {
    const fila = document.createElement("tr");
    const valores = [
      `${transaccion.fecha} ${transaccion.hora}`,
      formatearCentavos(transaccion.montoOriginalCentavos),
      String(transaccion.numeroCuotas),
      obtenerTextoTasa(transaccion.tasaMensual),
      formatearCentavos(transaccion.cuotasCentavos[0]),
      formatearCentavos(transaccion.totalAPagarCentavos),
    ];

    for (const valor of valores) {
      const celda = document.createElement("td");
      celda.textContent = valor;
      fila.append(celda);
    }

    cuerpo.append(fila);
  }

  contenedor.append(tabla);
}

export function renderizarTarjetaCompra(contenedor, servicioTarjeta, clienteId) {
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
      <div data-feedback aria-live="polite"></div>
      <div data-historial-compras></div>
    </section>
  `;

  contenedor.querySelector("[data-limite]").textContent = formatearCentavos(tarjeta.limiteCreditoCentavos);
  contenedor.querySelector("[data-utilizado]").textContent = formatearCentavos(tarjeta.creditoUtilizadoCentavos);
  contenedor.querySelector("[data-disponible]").textContent = formatearCentavos(tarjeta.creditoDisponibleCentavos);

  const formulario = contenedor.querySelector("[data-form-compra]");
  const monto = formulario.elements.monto;
  const cuotas = formulario.elements.numeroCuotas;
  const cotizacion = formulario.querySelector("[data-cotizacion]");
  const feedback = contenedor.querySelector("[data-feedback]");
  const boton = formulario.querySelector("button[type=submit]");

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
      contenedor.querySelector("[data-limite]").textContent = formatearCentavos(tarjeta.limiteCreditoCentavos);
      contenedor.querySelector("[data-utilizado]").textContent = formatearCentavos(tarjeta.creditoUtilizadoCentavos);
      contenedor.querySelector("[data-disponible]").textContent = formatearCentavos(tarjeta.creditoDisponibleCentavos);
      formulario.reset();
      actualizarCotizacion();
      renderizarHistorial(contenedor.querySelector("[data-historial-compras]"), tarjeta.transacciones);
      mostrarMensaje(feedback, `Compra aprobada. Cupo disponible: ${formatearCentavos(resultado.creditoDisponibleCentavos)}.`, "exito");
    } catch (error) {
      mostrarMensaje(feedback, error.message, "error");
    }
  });

  renderizarHistorial(contenedor.querySelector("[data-historial-compras]"), tarjeta.transacciones);
}
