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

function crearMapaNombresTitulares(clientes) {
  return new Map(clientes.map((cliente) => [cliente.id, cliente.nombreCompleto]));
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

function crearCuenta(producto) {
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

  throw new Error("Las transferencias solo se realizan entre cuentas de ahorros o corrientes.");
}

const nombresTipo = {
  ahorros: "Cuenta de ahorros",
  corriente: "Cuenta corriente",
};

export class ServicioTransferencias {
  constructor({ almacenamiento, generadorId = () => globalThis.crypto.randomUUID(), reloj = () => new Date() }) {
    if (!almacenamiento) {
      throw new TypeError("Se requiere un almacenamiento local.");
    }

    this.almacenamiento = almacenamiento;
    this.generadorId = generadorId;
    this.reloj = reloj;
  }

  listarCuentasOrigen(clienteId) {
    const estado = this.almacenamiento.cargar();
    const nombresTitulares = crearMapaNombresTitulares(estado.clientes);
    return estado.productos
      .filter((producto) => producto.clienteId === clienteId && nombresTipo[producto.tipo])
      .map((producto) => ({
        id: producto.id,
        tipo: producto.tipo,
        nombre: nombresTipo[producto.tipo],
        nombreCompleto: nombresTitulares.get(producto.clienteId) ?? "Titular no disponible",
        saldoCentavos: producto.saldoCentavos,
      }));
  }

  listarCuentasDestino(productoOrigenId) {
    const estado = this.almacenamiento.cargar();
    const nombresTitulares = crearMapaNombresTitulares(estado.clientes);
    return estado.productos
      .filter((producto) => producto.id !== productoOrigenId && nombresTipo[producto.tipo])
      .map((producto) => ({
        id: producto.id,
        tipo: producto.tipo,
        nombre: nombresTipo[producto.tipo],
        nombreCompleto: nombresTitulares.get(producto.clienteId) ?? "Titular no disponible",
      }));
  }

  transferir(clienteId, productoOrigenId, productoDestinoId, valor) {
    const montoCentavos = parsearCentavosPositivos(valor);
    if (productoOrigenId === productoDestinoId) {
      throw new Error("Selecciona una cuenta de destino diferente.");
    }

    const estadoActual = this.almacenamiento.cargar();
    const indiceOrigen = estadoActual.productos.findIndex(
      (producto) => producto.id === productoOrigenId && producto.clienteId === clienteId,
    );
    const indiceDestino = estadoActual.productos.findIndex(
      (producto) => producto.id === productoDestinoId,
    );

    if (indiceOrigen < 0 || indiceDestino < 0) {
      throw new Error("No se encontró la cuenta de origen o destino.");
    }

    const cuentaOrigen = crearCuenta(estadoActual.productos[indiceOrigen]);
    const cuentaDestino = crearCuenta(estadoActual.productos[indiceDestino]);
    let saldoOrigenCentavos;

    if (cuentaOrigen.tipo === "ahorros") {
      if (montoCentavos > cuentaOrigen.saldoCentavos) {
        throw new RangeError("La transferencia supera el saldo disponible de ahorros.");
      }

      cuentaOrigen.saldoCentavos -= montoCentavos;
      saldoOrigenCentavos = cuentaOrigen.saldoCentavos;
    } else {
      saldoOrigenCentavos = cuentaOrigen.retirarEfectivo(montoCentavos);
    }

    const saldoDestinoCentavos = cuentaDestino.consignar(montoCentavos);
    const estadoCandidato = clonarEstado(estadoActual);
    estadoCandidato.productos[indiceOrigen] = cuentaOrigen;
    estadoCandidato.productos[indiceDestino] = cuentaDestino;
    estadoCandidato.movimientos.push(
      new Movimiento({
        id: this.generadorId(),
        ...crearMarcaDeTiempo(this.reloj()),
        tipo: "transferencia",
        montoCentavos,
        productoOrigenId,
        productoDestinoId,
      }),
    );

    this.almacenamiento.guardar(estadoCandidato);
    return { saldoOrigenCentavos, saldoDestinoCentavos, montoCentavos };
  }
}
