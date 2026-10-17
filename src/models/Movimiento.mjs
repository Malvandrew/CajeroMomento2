const TIPOS_MOVIMIENTO = new Set(["consignacion", "retiro", "transferencia", "pago_tarjeta"]);

export class Movimiento {
  constructor({
    id,
    fecha,
    hora,
    tipo,
    montoCentavos,
    productoOrigenId = null,
    productoDestinoId = null,
    transaccionTarjetaId = null,
    numeroCuota = null,
  }) {
    if (!id || !fecha || !hora) {
      throw new TypeError("El movimiento requiere id, fecha y hora.");
    }

    if (!TIPOS_MOVIMIENTO.has(tipo)) {
      throw new RangeError("El tipo de movimiento no es válido.");
    }

    if (tipo === "pago_tarjeta" && (
      !productoOrigenId
      || !productoDestinoId
      || !transaccionTarjetaId
      || !Number.isInteger(numeroCuota)
      || numeroCuota < 1
    )) {
      throw new TypeError("El pago de tarjeta requiere cuenta, tarjeta, compra y número de cuota.");
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
    this.transaccionTarjetaId = transaccionTarjetaId;
    this.numeroCuota = numeroCuota;
  }
}
