import { formatearCentavos } from "../utils/Dinero.mjs";
import { mostrarMensaje } from "./Renderizado.mjs";

export function renderizarTransferencias(contenedor, servicioTransferencias, clienteId, alTransferir = () => {}) {
  contenedor.innerHTML = `
    <section aria-labelledby="titulo-transferencia">
      <h2 id="titulo-transferencia">Transferir dinero</h2>
      <form data-form-transferencia>
        <label for="cuenta-origen">Cuenta de origen</label>
        <select id="cuenta-origen" name="origenId" required></select>
        <label for="cuenta-destino">Cuenta de destino</label>
        <select id="cuenta-destino" name="destinoId" required></select>
        <label for="monto-transferencia">Monto (COP)</label>
        <input id="monto-transferencia" name="monto" type="number" min="0.01" step="0.01" inputmode="decimal" required>
        <button class="button-primary" type="submit">Confirmar transferencia</button>
      </form>
      <div data-feedback aria-live="polite"></div>
    </section>
  `;

  const formulario = contenedor.querySelector("[data-form-transferencia]");
  const origen = formulario.querySelector("[name=origenId]");
  const destino = formulario.querySelector("[name=destinoId]");
  const feedback = contenedor.querySelector("[data-feedback]");
  const cuentasOrigen = servicioTransferencias.listarCuentasOrigen(clienteId);

  for (const cuenta of cuentasOrigen) {
    const opcion = document.createElement("option");
    opcion.value = cuenta.id;
    opcion.textContent = `${cuenta.nombre} · ${cuenta.id.slice(-6)} · ${cuenta.nombreCompleto}`;
    origen.append(opcion);
  }

  function actualizarDestinos() {
    destino.replaceChildren();
    const cuentasDestino = servicioTransferencias.listarCuentasDestino(origen.value);
    for (const cuenta of cuentasDestino) {
      const opcion = document.createElement("option");
      opcion.value = cuenta.id;
      opcion.textContent = `${cuenta.nombre} · ${cuenta.id.slice(-6)} · ${cuenta.nombreCompleto}`;
      destino.append(opcion);
    }

    destino.disabled = cuentasDestino.length === 0;
  }

  origen.addEventListener("change", actualizarDestinos);
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const datos = new FormData(formulario);

    try {
      const resultado = servicioTransferencias.transferir(
        clienteId,
        datos.get("origenId"),
        datos.get("destinoId"),
        datos.get("monto"),
      );
      mostrarMensaje(
        feedback,
        `Transferencia realizada. Origen: ${formatearCentavos(resultado.saldoOrigenCentavos)}; destino: ${formatearCentavos(resultado.saldoDestinoCentavos)}.`,
        "exito",
      );
      formulario.reset();
      actualizarDestinos();
      alTransferir(resultado);
    } catch (error) {
      mostrarMensaje(feedback, error.message, "error");
    }
  });

  actualizarDestinos();
}
