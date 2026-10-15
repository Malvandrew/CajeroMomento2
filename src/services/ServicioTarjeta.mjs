import { TarjetaCredito } from "../models/TarjetaCredito.mjs";
import { TransaccionTarjeta } from "../models/TransaccionTarjeta.mjs";
import { parsearCentavosPositivos } from "../utils/Dinero.mjs";

function clonarEstado(estado) {
  return {
    ...estado,
    clientes: [...estado.clientes],
    productos: [...estado.productos],
    movimientos: [...estado.movimientos],
    transaccionesTarjeta: [...estado.transaccionesTarjeta],
  };
}

export class ServicioTarjeta {
  constructor({ almacenamiento, generadorId = () => globalThis.crypto.randomUUID(), reloj = () => new Date() }) {
    if (!almacenamiento) {
      throw new TypeError("Se requiere un almacenamiento local.");
    }

    this.almacenamiento = almacenamiento;
    this.generadorId = generadorId;
    this.reloj = reloj;
  }

  obtenerTarjeta(clienteId) {
    const estado = this.almacenamiento.cargar();
    const tarjeta = estado.productos.find(
      (producto) => producto.clienteId === clienteId && producto.tipo === "credito",
    );
    if (!tarjeta) {
      throw new Error("No se encontró la tarjeta del cliente.");
    }

    return {
      id: tarjeta.id,
      limiteCreditoCentavos: tarjeta.limiteCreditoCentavos,
      creditoUtilizadoCentavos: tarjeta.creditoUtilizadoCentavos,
      creditoDisponibleCentavos: tarjeta.limiteCreditoCentavos - tarjeta.creditoUtilizadoCentavos,
      transacciones: estado.transaccionesTarjeta
        .filter((transaccion) => transaccion.tarjetaId === tarjeta.id)
        .map((transaccion) => ({ ...transaccion })),
    };
  }

  registrarCompra(clienteId, tarjetaId, valor, numeroCuotas) {
    const montoOriginalCentavos = parsearCentavosPositivos(valor);
    const estadoActual = this.almacenamiento.cargar();
    const indiceTarjeta = estadoActual.productos.findIndex(
      (producto) => producto.id === tarjetaId
        && producto.clienteId === clienteId
        && producto.tipo === "credito",
    );

    if (indiceTarjeta < 0) {
      throw new Error("No se encontró una tarjeta del cliente.");
    }

    const tarjetaOriginal = estadoActual.productos[indiceTarjeta];
    const tarjeta = new TarjetaCredito(tarjetaOriginal);
    tarjeta.autorizarCompra(montoOriginalCentavos);
    const transaccion = new TransaccionTarjeta({
      id: this.generadorId(),
      tarjetaId,
      montoOriginalCentavos,
      numeroCuotas,
      fecha: this.reloj(),
    });
    const estadoCandidato = clonarEstado(estadoActual);
    estadoCandidato.productos[indiceTarjeta] = tarjeta;
    estadoCandidato.transaccionesTarjeta.push(transaccion);

    this.almacenamiento.guardar(estadoCandidato);
    return {
      transaccion: { ...transaccion },
      creditoDisponibleCentavos: tarjeta.obtenerCreditoDisponibleCentavos(),
    };
  }
}
