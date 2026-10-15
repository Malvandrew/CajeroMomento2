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
}
