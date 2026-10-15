export function limpiarContenedor(contenedor) {
  if (!(contenedor instanceof HTMLElement)) {
    throw new TypeError("Se requiere un contenedor HTML válido.");
  }

  contenedor.replaceChildren();
}

export function mostrarMensaje(contenedor, texto, tipo = "info") {
  if (!(contenedor instanceof HTMLElement)) {
    throw new TypeError("Se requiere un contenedor HTML válido.");
  }

  const tiposValidos = new Set(["info", "exito", "error", "advertencia"]);
  if (!tiposValidos.has(tipo)) {
    throw new RangeError("El tipo de mensaje no es válido.");
  }

  const mensaje = document.createElement("p");
  mensaje.className = `mensaje mensaje--${tipo}`;
  mensaje.setAttribute("role", tipo === "error" ? "alert" : "status");
  mensaje.setAttribute("aria-live", tipo === "error" ? "assertive" : "polite");
  mensaje.textContent = texto;
  contenedor.replaceChildren(mensaje);
  return mensaje;
}
