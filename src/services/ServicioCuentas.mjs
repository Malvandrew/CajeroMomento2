import { CuentaAhorros } from "../models/CuentaAhorros.mjs";
import { CuentaCorriente } from "../models/CuentaCorriente.mjs";
import { Movimiento } from "../models/Movimiento.mjs";
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

export class ServicioCuentas {
  constructor({ almacenamiento, generadorId = () => globalThis.crypto.randomUUID(), reloj = () => new Date() }) {
    if (!almacenamiento) {
      throw new TypeError("Se requiere un almacenamiento local.");
    }

    this.almacenamiento = almacenamiento;
    this.generadorId = generadorId;
    this.reloj = reloj;
  }

  listarProductos(clienteId) {
    const estado = this.almacenamiento.cargar();
    const clienteExiste = estado.clientes.some((cliente) => cliente.id === clienteId);
    if (!clienteExiste) {
      throw new Error("No se encontró el cliente autenticado.");
    }

    return estado.productos
      .filter((producto) => producto.clienteId === clienteId)
      .map((producto) => ({
        id: producto.id,
        tipo: producto.tipo,
        saldoCentavos: producto.saldoCentavos ?? null,
        limiteCreditoCentavos: producto.limiteCreditoCentavos ?? null,
        creditoUtilizadoCentavos: producto.creditoUtilizadoCentavos ?? null,
        creditoDisponibleCentavos:
          producto.tipo === "credito"
            ? producto.limiteCreditoCentavos - producto.creditoUtilizadoCentavos
            : null,
        mesInteresAcreditado: producto.mesInteresAcreditado ?? null,
      }));
  }

  consignar(clienteId, productoId, valor) {
    const montoCentavos = parsearCentavosPositivos(valor);
    const estadoActual = this.almacenamiento.cargar();
    const indiceProducto = estadoActual.productos.findIndex(
      (producto) => producto.id === productoId && producto.clienteId === clienteId,
    );

    if (indiceProducto < 0) {
      throw new Error("No se encontró una cuenta del cliente.");
    }

    const producto = estadoActual.productos[indiceProducto];
    if (producto.tipo === "credito") {
      throw new Error("No se pueden consignar fondos directamente a una tarjeta de crédito.");
    }

    const cuenta = this._crearCuenta(producto);
    const saldoCentavos = cuenta.consignar(montoCentavos);
    const estadoCandidato = clonarEstado(estadoActual);
    estadoCandidato.productos[indiceProducto] = cuenta;
    estadoCandidato.movimientos.push(
      new Movimiento({
        id: this.generadorId(),
        ...crearMarcaDeTiempo(this.reloj()),
        tipo: "consignacion",
        montoCentavos,
        productoDestinoId: productoId,
      }),
    );

    this.almacenamiento.guardar(estadoCandidato);
    return { saldoCentavos, interesCentavos: 0, montoCentavos };
  }

  retirar(clienteId, productoId, valor) {
    const montoCentavos = parsearCentavosPositivos(valor);
    const estadoActual = this.almacenamiento.cargar();
    const indiceProducto = estadoActual.productos.findIndex(
      (producto) => producto.id === productoId && producto.clienteId === clienteId,
    );

    if (indiceProducto < 0) {
      throw new Error("No se encontró una cuenta del cliente.");
    }

    const producto = estadoActual.productos[indiceProducto];
    const cuenta = this._crearCuenta(producto);
    const fechaOperacion = this.reloj();
    const saldoResultado = cuenta.retirarEfectivo(montoCentavos, fechaOperacion);
    const resultado = typeof saldoResultado === "number"
      ? { saldoCentavos: saldoResultado, interesCentavos: 0, montoRetiradoCentavos: montoCentavos }
      : saldoResultado;
    const estadoCandidato = clonarEstado(estadoActual);
    estadoCandidato.productos[indiceProducto] = cuenta;
    estadoCandidato.movimientos.push(
      new Movimiento({
        id: this.generadorId(),
        ...crearMarcaDeTiempo(fechaOperacion),
        tipo: "retiro",
        montoCentavos,
        productoOrigenId: productoId,
      }),
    );

    this.almacenamiento.guardar(estadoCandidato);
    return resultado;
  }

  _crearCuenta(producto) {
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
}
