import { crearEstadoVacio, validarEstado } from "../models/EstadoAplicacion.mjs";

export class AlmacenamientoLocal {
  constructor({ storage = globalThis.localStorage, clave = "mi-plata.estado" } = {}) {
    if (!storage || typeof storage.getItem !== "function" || typeof storage.setItem !== "function") {
      throw new TypeError("El almacenamiento local del navegador no está disponible.");
    }

    this.storage = storage;
    this.clave = clave;
  }

  cargar() {
    const contenido = this.storage.getItem(this.clave);
    if (contenido === null) {
      return crearEstadoVacio();
    }

    let estado;
    try {
      estado = JSON.parse(contenido);
    } catch {
      throw new Error("Los datos bancarios guardados no se pueden leer.");
    }

    return validarEstado(estado);
  }

  guardar(estado) {
    validarEstado(estado);

    let contenido;
    try {
      contenido = JSON.stringify(estado);
    } catch {
      throw new Error("No se pudo preparar el estado bancario para guardarlo.");
    }

    try {
      this.storage.setItem(this.clave, contenido);
    } catch {
      throw new Error("No se pudieron guardar los cambios bancarios en este dispositivo.");
    }

    return estado;
  }
}
