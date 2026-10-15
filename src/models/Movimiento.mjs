const TIPOS_MOVIMIENTO = new Set(["consignacion", "retiro", "transferencia"]);

export class Movimiento {
  constructor({
    id,
    fecha,
    hora,
    tipo,
    montoCentavos,
    productoOrigenId = null,
    productoDestinoId = null,
  }) {
    if (!id || !fecha || !hora) {
      throw new TypeError("El movimiento requiere id, fecha y hora.");
    }

    if (!TIPOS_MOVIMIENTO.has(tipo)) {
      throw new RangeError("El tipo de movimiento no es válido.");
    }

    if (!Number.isSafeInteger(montoCentavos) || montoCentavos <= 0) {
      throw new RangeError("El monto del movimiento debe ser positivo en centavos.");
    }

    this.id = id;
    this.fecha = fecha;
    this.hora = hora;
    this.tipo = tipo;
    this.montoCentavos = montoCentavos;
    this.productoOrigenId = productoOrigenId;
    this.productoDestinoId = productoDestinoId;
  }
}
