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
  constructor({ id, tarjetaId, montoOriginalCentavos, numeroCuotas, fecha = new Date(), hora, pagos = [] }) {
    if (!id || !tarjetaId) {
      throw new TypeError("La compra requiere identificador y tarjeta.");
    }
    if (!Number.isSafeInteger(montoOriginalCentavos) || montoOriginalCentavos <= 0) {
      throw new RangeError("El monto de la compra debe ser positivo en centavos.");
    }
    if (!Number.isInteger(numeroCuotas) || numeroCuotas < 1) {
      throw new RangeError("El número de cuotas debe ser un entero de al menos uno.");
    }
    if (!Array.isArray(pagos)) {
      throw new TypeError("Los pagos de la transacción deben ser una lista.");
    }

    const tasaMensual = obtenerTasa(numeroCuotas);
    const interesCentavos = Math.round(montoOriginalCentavos * tasaMensual * numeroCuotas);
    const totalAPagarCentavos = montoOriginalCentavos + interesCentavos;
    const cuotaBaseCentavos = Math.floor(totalAPagarCentavos / numeroCuotas);
    const cuotasCentavos = Array.from({ length: numeroCuotas - 1 }, () => cuotaBaseCentavos);
    cuotasCentavos.push(totalAPagarCentavos - cuotaBaseCentavos * (numeroCuotas - 1));
    const capitalPorCuotaCentavos = Array.from(
      { length: numeroCuotas - 1 },
      () => Math.floor(montoOriginalCentavos / numeroCuotas),
    );
    capitalPorCuotaCentavos.push(
      montoOriginalCentavos
        - capitalPorCuotaCentavos.reduce((total, capital) => total + capital, 0),
    );

    this.id = id;
    this.tarjetaId = tarjetaId;
    this.montoOriginalCentavos = montoOriginalCentavos;
    this.numeroCuotas = numeroCuotas;
    this.tasaMensual = tasaMensual;
    this.totalAPagarCentavos = totalAPagarCentavos;
    this.cuotasCentavos = cuotasCentavos;
    this.capitalPorCuotaCentavos = capitalPorCuotaCentavos;
    this.pagos = pagos.map((pago) => ({ ...pago }));
    const fechaHora = fecha instanceof Date
      ? obtenerFechaHora(fecha)
      : { fecha, hora };
    if (typeof fechaHora.fecha !== "string" || typeof fechaHora.hora !== "string") {
      throw new TypeError("La fecha y hora de la compra no son válidas.");
    }

    Object.assign(this, fechaHora);
  }

  obtenerCuotas() {
    return this.cuotasCentavos.map((montoCentavos, indice) => {
      const numeroCuota = indice + 1;
      const pago = this.pagos.find((elemento) => elemento.numeroCuota === numeroCuota) ?? null;
      return {
        numeroCuota,
        montoCentavos,
        montoCapitalCentavos: this.capitalPorCuotaCentavos[indice],
        pagada: pago !== null,
        pago,
      };
    });
  }

  obtenerDeudaPendienteCentavos() {
    return this.obtenerCuotas()
      .filter((cuota) => !cuota.pagada)
      .reduce((total, cuota) => total + cuota.montoCentavos, 0);
  }

  obtenerCuotaPendiente(numeroCuota) {
    if (!Number.isInteger(numeroCuota) || numeroCuota < 1 || numeroCuota > this.numeroCuotas) {
      throw new RangeError("El número de cuota no es válido.");
    }

    if (this.pagos.some((pago) => pago.numeroCuota === numeroCuota)) {
      return null;
    }

    return {
      numeroCuota,
      montoCentavos: this.cuotasCentavos[numeroCuota - 1],
      montoCapitalCentavos: this.capitalPorCuotaCentavos[numeroCuota - 1],
    };
  }

  obtenerSiguienteCuotaPendiente() {
    for (let numeroCuota = 1; numeroCuota <= this.numeroCuotas; numeroCuota += 1) {
      const cuota = this.obtenerCuotaPendiente(numeroCuota);
      if (cuota) {
        return cuota;
      }
    }

    return null;
  }

  registrarPago(pago) {
    if (!pago?.id || !pago.cuentaOrigenId || !pago.fecha || !pago.hora) {
      throw new TypeError("El pago requiere id, cuenta de origen, fecha y hora.");
    }

    const cuota = this.obtenerCuotaPendiente(pago.numeroCuota);
    if (!cuota) {
      throw new Error("La cuota ya fue pagada.");
    }
    const siguienteCuota = this.obtenerSiguienteCuotaPendiente();
    if (pago.numeroCuota !== siguienteCuota.numeroCuota) {
      throw new Error("Solo se puede pagar la siguiente cuota pendiente.");
    }
    if (pago.montoCentavos !== cuota.montoCentavos) {
      throw new RangeError("El pago debe cubrir exactamente el valor programado de la cuota.");
    }
    if (pago.montoCapitalCentavos !== cuota.montoCapitalCentavos) {
      throw new RangeError("El capital aplicado no coincide con el capital de la cuota.");
    }

    this.pagos.push({ ...pago });
    return { ...pago };
  }
}
