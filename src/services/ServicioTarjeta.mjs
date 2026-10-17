import { CuentaAhorros } from "../models/CuentaAhorros.mjs";
import { CuentaCorriente } from "../models/CuentaCorriente.mjs";
import { Movimiento } from "../models/Movimiento.mjs";
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

function crearMarcaDeTiempo(fecha) {
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

function crearCuentaParaPago(producto) {
  if (producto.tipo === "ahorros") {
    return new CuentaAhorros({
      id: producto.id,
      clienteId: producto.clienteId,
      saldoInicialCentavos: producto.saldoCentavos,
      mesInteresAcreditado: producto.mesInteresAcreditado,
    });
  }

  if (producto.tipo === "corriente") {
    return new CuentaCorriente({
      id: producto.id,
      clienteId: producto.clienteId,
      saldoInicialCentavos: producto.saldoCentavos,
    });
  }

  throw new Error("El producto seleccionado no es una cuenta de depósito.");
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
        .map((datosTransaccion) => {
          const transaccion = new TransaccionTarjeta(datosTransaccion);
          return {
            ...datosTransaccion,
            pagos: transaccion.pagos,
            cuotas: transaccion.obtenerCuotas(),
            deudaPendienteCentavos: transaccion.obtenerDeudaPendienteCentavos(),
          };
        }),
    };
  }

  listarCuentasPago(clienteId) {
    const estado = this.almacenamiento.cargar();
    const clienteExiste = estado.clientes.some((cliente) => cliente.id === clienteId);
    if (!clienteExiste) {
      throw new Error("No se encontró el cliente autenticado.");
    }

    return estado.productos
      .filter((producto) => producto.clienteId === clienteId
        && (producto.tipo === "ahorros" || producto.tipo === "corriente"))
      .map((producto) => ({
        id: producto.id,
        tipo: producto.tipo,
        saldoCentavos: producto.saldoCentavos,
      }));
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

  pagarCuota(clienteId, transaccionTarjetaId, numeroCuota, cuentaOrigenId) {
    const estadoActual = this.almacenamiento.cargar();
    const indiceTransaccion = estadoActual.transaccionesTarjeta.findIndex(
      (transaccion) => transaccion.id === transaccionTarjetaId,
    );
    if (indiceTransaccion < 0) {
      throw new Error("No se encontró la compra de tarjeta seleccionada.");
    }

    const datosTransaccion = estadoActual.transaccionesTarjeta[indiceTransaccion];
    const indiceTarjeta = estadoActual.productos.findIndex(
      (producto) => producto.id === datosTransaccion.tarjetaId
        && producto.clienteId === clienteId
        && producto.tipo === "credito",
    );
    if (indiceTarjeta < 0) {
      throw new Error("No se encontró una compra de tarjeta del cliente.");
    }

    const indiceCuenta = estadoActual.productos.findIndex(
      (producto) => producto.id === cuentaOrigenId
        && producto.clienteId === clienteId
        && (producto.tipo === "ahorros" || producto.tipo === "corriente"),
    );
    if (indiceCuenta < 0) {
      throw new Error("La cuenta de origen no pertenece al cliente o no es una cuenta de depósito.");
    }

    const transaccion = new TransaccionTarjeta(datosTransaccion);
    const siguienteCuota = transaccion.obtenerSiguienteCuotaPendiente();
    if (!siguienteCuota) {
      throw new Error("La compra no tiene cuotas pendientes.");
    }
    if (numeroCuota !== siguienteCuota.numeroCuota) {
      throw new Error("Solo se puede pagar la siguiente cuota pendiente.");
    }

    const cuenta = crearCuentaParaPago(estadoActual.productos[indiceCuenta]);
    const saldoCuentaCentavos = cuenta.debitarPagoTarjeta(siguienteCuota.montoCentavos);
    const tarjeta = new TarjetaCredito(estadoActual.productos[indiceTarjeta]);
    const creditoDisponibleCentavos = tarjeta.aplicarPagoCapital(
      siguienteCuota.montoCapitalCentavos,
    );
    const marcaDeTiempo = crearMarcaDeTiempo(this.reloj());
    const pago = {
      id: this.generadorId(),
      numeroCuota: siguienteCuota.numeroCuota,
      montoCentavos: siguienteCuota.montoCentavos,
      montoCapitalCentavos: siguienteCuota.montoCapitalCentavos,
      cuentaOrigenId,
      ...marcaDeTiempo,
    };
    transaccion.registrarPago(pago);

    const estadoCandidato = clonarEstado(estadoActual);
    estadoCandidato.productos[indiceCuenta] = cuenta;
    estadoCandidato.productos[indiceTarjeta] = tarjeta;
    estadoCandidato.transaccionesTarjeta[indiceTransaccion] = transaccion;
    estadoCandidato.movimientos.push(
      new Movimiento({
        id: this.generadorId(),
        ...marcaDeTiempo,
        tipo: "pago_tarjeta",
        montoCentavos: siguienteCuota.montoCentavos,
        productoOrigenId: cuentaOrigenId,
        productoDestinoId: tarjeta.id,
        transaccionTarjetaId,
        numeroCuota: siguienteCuota.numeroCuota,
      }),
    );

    this.almacenamiento.guardar(estadoCandidato);
    return {
      pago: { ...pago },
      saldoCuentaCentavos,
      creditoUtilizadoCentavos: tarjeta.creditoUtilizadoCentavos,
      creditoDisponibleCentavos,
      deudaPendienteCentavos: transaccion.obtenerDeudaPendienteCentavos(),
    };
  }
}
