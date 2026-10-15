import { formatearCentavos } from "../utils/Dinero.mjs";
import { mostrarMensaje } from "./Renderizado.mjs";

const nombresMovimiento = {
  consignacion: "Consignación",
  retiro: "Retiro",
  transferencia: "Transferencia",
};

export function renderizarHistorial(contenedor, servicioMovimientos, clienteId) {
  const movimientos = servicioMovimientos.listarPorCliente(clienteId);
  contenedor.replaceChildren();

  const titulo = document.createElement("h2");
  titulo.textContent = "Movimientos";
  contenedor.append(titulo);

  if (movimientos.length === 0) {
    mostrarMensaje(contenedor, "Todavía no hay movimientos registrados.", "info");
    return;
  }

  const tabla = document.createElement("table");
  tabla.className = "movement-table";
  tabla.innerHTML = `
    <thead>
      <tr><th scope="col">Fecha</th><th scope="col">Hora</th><th scope="col">Tipo</th><th scope="col">Valor</th></tr>
    </thead>
    <tbody></tbody>
  `;
  const cuerpo = tabla.querySelector("tbody");

  for (const movimiento of movimientos) {
    const fila = document.createElement("tr");
    const valores = [
      movimiento.fecha,
      movimiento.hora,
      nombresMovimiento[movimiento.tipo] ?? movimiento.tipo,
      formatearCentavos(movimiento.montoCentavos),
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
