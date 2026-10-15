export class Cliente {
  constructor({
    id,
    numeroIdentificacion,
    nombreCompleto,
    celular,
    usuario,
    contrasena,
    intentosFallidos = 0,
    bloqueado = false,
    productoIds = [],
  }) {
    const identificacion = String(numeroIdentificacion ?? "").trim();
    const nombreUsuario = String(usuario ?? "").trim();

    if (!id || !identificacion || !nombreCompleto?.trim() || !celular?.trim() || !nombreUsuario || !contrasena) {
      throw new TypeError("Todos los datos obligatorios del cliente deben estar completos.");
    }

    if (!Number.isInteger(intentosFallidos) || intentosFallidos < 0 || intentosFallidos > 3) {
      throw new RangeError("El contador de intentos de inicio de sesión no es válido.");
    }

    this.id = id;
    this.numeroIdentificacion = identificacion;
    this.nombreCompleto = nombreCompleto.trim();
    this.celular = celular.trim();
    this.usuario = nombreUsuario;
    this.contrasena = contrasena;
    this.intentosFallidos = intentosFallidos;
    this.bloqueado = Boolean(bloqueado) || intentosFallidos >= 3;
    this.productoIds = [...productoIds];
  }

  registrarIntentoFallido() {
    if (this.bloqueado) {
      throw new Error("La cuenta está bloqueada.");
    }

    this.intentosFallidos += 1;
    if (this.intentosFallidos >= 3) {
      this.bloqueado = true;
    }

    return Math.max(0, 3 - this.intentosFallidos);
  }

  registrarAccesoCorrecto() {
    if (this.bloqueado) {
      throw new Error("La cuenta está bloqueada.");
    }

    this.intentosFallidos = 0;
  }

  agregarProducto(productoId) {
    if (!productoId || this.productoIds.includes(productoId)) {
      throw new Error("El producto ya está asociado al cliente o no tiene id.");
    }

    this.productoIds.push(productoId);
  }
}
