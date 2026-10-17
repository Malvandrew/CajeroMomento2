import { ProductoFinanciero } from "./ProductoFinanciero.mjs";
import { validarCentavosNoNegativos } from "../utils/Dinero.mjs";

export class TarjetaCredito extends ProductoFinanciero {
  constructor({ id, clienteId, limiteCreditoCentavos = 0, creditoUtilizadoCentavos = 0 }) {
    super({ id, clienteId, tipo: "credito" });
    validarCentavosNoNegativos(limiteCreditoCentavos);
    validarCentavosNoNegativos(creditoUtilizadoCentavos);

    if (creditoUtilizadoCentavos > limiteCreditoCentavos) {
      throw new RangeError("El crédito utilizado no puede superar el límite inicial.");
    }

    this.limiteCreditoCentavos = limiteCreditoCentavos;
    this.creditoUtilizadoCentavos = creditoUtilizadoCentavos;
  }

  obtenerCreditoDisponibleCentavos() {
    return this.limiteCreditoCentavos - this.creditoUtilizadoCentavos;
  }

  autorizarCompra(montoOriginalCentavos) {
    if (!Number.isSafeInteger(montoOriginalCentavos) || montoOriginalCentavos <= 0) {
      throw new RangeError("La compra debe ser un entero positivo en centavos.");
    }

    if (montoOriginalCentavos > this.obtenerCreditoDisponibleCentavos()) {
      throw new RangeError("La compra supera el cupo de crédito disponible.");
    }

    this.creditoUtilizadoCentavos += montoOriginalCentavos;
    return this.obtenerCreditoDisponibleCentavos();
  }

  aplicarPagoCapital(montoCapitalCentavos) {
    if (!Number.isSafeInteger(montoCapitalCentavos) || montoCapitalCentavos < 0) {
      throw new RangeError("El capital pagado debe ser un entero no negativo en centavos.");
    }

    this.creditoUtilizadoCentavos = Math.max(
      0,
      this.creditoUtilizadoCentavos - montoCapitalCentavos,
    );
    return this.obtenerCreditoDisponibleCentavos();
  }
}
