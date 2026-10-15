import { Cuenta } from "./Cuenta.mjs";

const TASA_INTERES_MENSUAL = 0.015;

function obtenerMesCalendario(fecha) {
  if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) {
    throw new TypeError("La fecha del retiro no es válida.");
  }

  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  return `${fecha.getFullYear()}-${mes}`;
}

export class CuentaAhorros extends Cuenta {
  constructor({ id, clienteId, saldoInicialCentavos = 0, mesInteresAcreditado = null }) {
    super({ id, clienteId, tipo: "ahorros", saldoInicialCentavos });
    this.tasaInteresMensual = TASA_INTERES_MENSUAL;
    this.mesInteresAcreditado = mesInteresAcreditado;
  }

  retirarEfectivo(montoCentavos, fecha = new Date()) {
    if (!Number.isSafeInteger(montoCentavos) || montoCentavos <= 0) {
      throw new RangeError("El retiro debe ser un entero positivo en centavos.");
    }

    const mesActual = obtenerMesCalendario(fecha);
    const debeAcreditarInteres = this.mesInteresAcreditado !== mesActual;
    const interesCentavos = debeAcreditarInteres
      ? Math.round(this.saldoCentavos * this.tasaInteresMensual)
      : 0;
    const nuevoSaldoCentavos = this.saldoCentavos + interesCentavos - montoCentavos;

    if (nuevoSaldoCentavos < 0) {
      throw new RangeError("El retiro supera el saldo disponible de la cuenta de ahorros.");
    }

    this.saldoCentavos = nuevoSaldoCentavos;
    if (debeAcreditarInteres) {
      this.mesInteresAcreditado = mesActual;
    }

    return {
      saldoCentavos: this.saldoCentavos,
      interesCentavos,
      montoRetiradoCentavos: montoCentavos,
    };
  }
}
