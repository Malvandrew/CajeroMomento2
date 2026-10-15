export const VERSION_ESTADO = 1;

export function crearEstadoVacio() {
  return {
    version: VERSION_ESTADO,
    clientes: [],
    productos: [],
    movimientos: [],
    transaccionesTarjeta: [],
  };
}

export function validarEstado(estado) {
  if (!estado || typeof estado !== "object" || Array.isArray(estado)) {
    throw new TypeError("El estado bancario debe ser un objeto.");
  }

  if (estado.version !== VERSION_ESTADO) {
    throw new Error("La versión de los datos guardados no es compatible.");
  }

  const colecciones = [
    "clientes",
    "productos",
    "movimientos",
    "transaccionesTarjeta",
  ];

  for (const nombre of colecciones) {
    if (!Array.isArray(estado[nombre])) {
      throw new TypeError(`La colección ${nombre} no es válida.`);
    }
  }

  return estado;
}
