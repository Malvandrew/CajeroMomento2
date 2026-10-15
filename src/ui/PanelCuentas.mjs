import { formatearCentavos } from "../utils/Dinero.mjs";
import { mostrarMensaje } from "./Renderizado.mjs";

const nombresProducto = {
  ahorros: "Cuenta de ahorros",
  corriente: "Cuenta corriente",
  credito: "Tarjeta de crédito",
};

export function renderizarPanelCuentas(contenedor, servicioCuentas, clienteId, alOperar = () => {}) {
  contenedor.innerHTML = `
    <section class="accounts-view" aria-labelledby="titulo-cuentas">
      <h2 id="titulo-cuentas">Tus productos</h2>
      <label for="producto-seleccionado">Producto</label>
      <select id="producto-seleccionado" name="productoId"></select>
      <p class="balance-line"><span data-tipo-producto></span><output data-balance></output></p>
      <form data-form-operacion hidden>
        <label for="tipo-operacion">Operación</label>
        <select id="tipo-operacion" name="tipoOperacion">
          <option value="consignacion">Consignar</option>
          <option value="retiro">Retirar</option>
        </select>
        <label for="monto-operacion">Monto (COP)</label>
        <input id="monto-operacion" name="monto" type="number" min="0.01" step="0.01" inputmode="decimal" required>
        <button class="button-primary" type="submit">Confirmar operación</button>
      </form>
      <div data-feedback aria-live="polite"></div>
    </section>
  `;

  const selector = contenedor.querySelector("#producto-seleccionado");
  const etiquetaTipo = contenedor.querySelector("[data-tipo-producto]");
  const saldo = contenedor.querySelector("[data-balance]");
  const formulario = contenedor.querySelector("[data-form-operacion]");
  const feedback = contenedor.querySelector("[data-feedback]");
  const productos = servicioCuentas.listarProductos(clienteId);

  if (productos.length === 0) {
    mostrarMensaje(contenedor, "No hay productos disponibles para este cliente.", "advertencia");
    return;
  }

  for (const producto of productos) {
    const opcion = document.createElement("option");
    opcion.value = producto.id;
    opcion.textContent = nombresProducto[producto.tipo] ?? producto.tipo;
    selector.append(opcion);
  }

  function actualizarProductoSeleccionado() {
    const producto = productos.find((elemento) => elemento.id === selector.value);
    etiquetaTipo.textContent = nombresProducto[producto.tipo] ?? producto.tipo;

    if (producto.tipo === "credito") {
      saldo.textContent = `Disponible: ${formatearCentavos(producto.creditoDisponibleCentavos)} / Cupo: ${formatearCentavos(producto.limiteCreditoCentavos)}`;
      formulario.hidden = true;
      return;
    }

    saldo.textContent = formatearCentavos(producto.saldoCentavos);
    formulario.hidden = false;
  }

  selector.addEventListener("change", actualizarProductoSeleccionado);
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const datos = new FormData(formulario);
    const productoId = selector.value;

    try {
      let resultado;
      if (datos.get("tipoOperacion") === "consignacion") {
        resultado = servicioCuentas.consignar(clienteId, productoId, datos.get("monto"));
        mostrarMensaje(feedback, `Consignación realizada. Saldo: ${formatearCentavos(resultado.saldoCentavos)}.`, "exito");
      } else {
        resultado = servicioCuentas.retirar(clienteId, productoId, datos.get("monto"));
        const interes = resultado.interesCentavos > 0
          ? ` Interés acreditado: ${formatearCentavos(resultado.interesCentavos)}.`
          : "";
        mostrarMensaje(feedback, `Retiro realizado. Saldo: ${formatearCentavos(resultado.saldoCentavos)}.${interes}`, "exito");
      }

      const productoActualizado = servicioCuentas
        .listarProductos(clienteId)
        .find((elemento) => elemento.id === productoId);
      const indice = productos.findIndex((elemento) => elemento.id === productoId);
      productos[indice] = productoActualizado;
      actualizarProductoSeleccionado();
      formulario.reset();
      alOperar(resultado);
    } catch (error) {
      mostrarMensaje(feedback, error.message, "error");
    }
  });

  actualizarProductoSeleccionado();
}
