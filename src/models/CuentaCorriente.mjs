import { Cuenta } from "./Cuenta.mjs";

const PORCENTAJE_SOBREGIRO = 0.2;

export class CuentaCorriente extends Cuenta {
  constructor({ id, clienteId, saldoInicialCentavos = 0 }) {
    super({ id, clienteId, tipo: "corriente", saldoInicialCentavos });
    this.porcentajeSobregiro = PORCENTAJE_SOBREGIRO;
  }

  obtenerLimiteSobregiroCentavos() {
    if (this.saldoCentavos <= 0) {
      return 0;
    }

    return Math.floor(this.saldoCentavos * this.porcentajeSobregiro);
  }

  retirarEfectivo(montoCentavos) {
    if (!Number.isSafeInteger(montoCentavos) || montoCentavos <= 0) {
      throw new RangeError("El retiro debe ser un entero positivo en centavos.");
    }

    const limiteDisponibleCentavos = this.saldoCentavos + this.obtenerLimiteSobregiroCentavos();
    if (montoCentavos > limiteDisponibleCentavos) {
      throw new RangeError("El retiro supera el saldo y el sobregiro disponible.");
    }

    this.saldoCentavos -= montoCentavos;
    return this.saldoCentavos;
  }
}
