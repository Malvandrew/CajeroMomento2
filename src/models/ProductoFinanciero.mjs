const TIPOS_PRODUCTO = new Set(["ahorros", "corriente", "credito"]);

export class ProductoFinanciero {
  constructor({ id, clienteId, tipo }) {
    if (!id || !clienteId) {
      throw new TypeError("El producto requiere identificador y cliente.");
    }

    if (!TIPOS_PRODUCTO.has(tipo)) {
      throw new RangeError("El tipo de producto financiero no es válido.");
    }

    this.id = id;
    this.clienteId = clienteId;
    this.tipo = tipo;
  }
}
