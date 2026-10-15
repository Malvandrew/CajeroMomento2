import { ProductoFinanciero } from "./ProductoFinanciero.mjs";
import { validarCentavosNoNegativos } from "../utils/Dinero.mjs";

export class Cuenta extends ProductoFinanciero {
  constructor({ id, clienteId, tipo, saldoInicialCentavos = 0 }) {
    super({ id, clienteId, tipo });
    if (!Number.isSafeInteger(saldoInicialCentavos)) {
      throw new RangeError("El saldo de la cuenta debe ser un entero seguro en centavos.");
    }
    if (tipo === "ahorros") {
      validarCentavosNoNegativos(saldoInicialCentavos);
    }
    this.saldoCentavos = saldoInicialCentavos;
  }

  consignar(montoCentavos) {
    if (!Number.isSafeInteger(montoCentavos) || montoCentavos <= 0) {
      throw new RangeError("La consignación debe ser un entero positivo en centavos.");
    }

    this.saldoCentavos += montoCentavos;
    return this.saldoCentavos;
  }
}
