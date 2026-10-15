const TASAS_POR_CUOTAS = [
  { maximo: 2, tasa: 0 },
  { maximo: 6, tasa: 0.019 },
  { maximo: Number.POSITIVE_INFINITY, tasa: 0.023 },
];

function obtenerFechaHora(fecha) {
  if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) {
    throw new TypeError("La fecha de la compra no es válida.");
  }

  return {
    fecha: [
      fecha.getFullYear(),
      String(fecha.getMonth() + 1).padStart(2, "0"),
      String(fecha.getDate()).padStart(2, "0"),
    ].join("-"),
    hora: [
      String(fecha.getHours()).padStart(2, "0"),
      String(fecha.getMinutes()).padStart(2, "0"),
      String(fecha.getSeconds()).padStart(2, "0"),
    ].join(":"),
  };
}

function obtenerTasa(numeroCuotas) {
  return TASAS_POR_CUOTAS.find((rango) => numeroCuotas <= rango.maximo).tasa;
}

export class TransaccionTarjeta {
  constructor({ id, tarjetaId, montoOriginalCentavos, numeroCuotas, fecha = new Date() }) {
    if (!id || !tarjetaId) {
      throw new TypeError("La compra requiere identificador y tarjeta.");
    }
    if (!Number.isSafeInteger(montoOriginalCentavos) || montoOriginalCentavos <= 0) {
      throw new RangeError("El monto de la compra debe ser positivo en centavos.");
    }
    if (!Number.isInteger(numeroCuotas) || numeroCuotas < 1) {
      throw new RangeError("El número de cuotas debe ser un entero de al menos uno.");
    }

    const tasaMensual = obtenerTasa(numeroCuotas);
    const interesCentavos = Math.round(montoOriginalCentavos * tasaMensual * numeroCuotas);
    const totalAPagarCentavos = montoOriginalCentavos + interesCentavos;
    const cuotaBaseCentavos = Math.floor(totalAPagarCentavos / numeroCuotas);
    const cuotasCentavos = Array.from({ length: numeroCuotas - 1 }, () => cuotaBaseCentavos);
    cuotasCentavos.push(totalAPagarCentavos - cuotaBaseCentavos * (numeroCuotas - 1));

    this.id = id;
    this.tarjetaId = tarjetaId;
    this.montoOriginalCentavos = montoOriginalCentavos;
    this.numeroCuotas = numeroCuotas;
    this.tasaMensual = tasaMensual;
    this.totalAPagarCentavos = totalAPagarCentavos;
    this.cuotasCentavos = cuotasCentavos;
    Object.assign(this, obtenerFechaHora(fecha));
  }
}
