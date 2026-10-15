import { Cliente } from "../models/Cliente.mjs";
import { CuentaAhorros } from "../models/CuentaAhorros.mjs";
import { CuentaCorriente } from "../models/CuentaCorriente.mjs";
import { TarjetaCredito } from "../models/TarjetaCredito.mjs";
import { Movimiento } from "../models/Movimiento.mjs";
import { parsearCentavosNoNegativos } from "../utils/Dinero.mjs";

function normalizarUsuario(usuario) {
  return usuario.trim().toLocaleLowerCase("es-CO");
}

function crearMarcaDeTiempo(fecha) {
  const fechaTexto = [
    fecha.getFullYear(),
    String(fecha.getMonth() + 1).padStart(2, "0"),
    String(fecha.getDate()).padStart(2, "0"),
  ].join("-");
  const horaTexto = [
    String(fecha.getHours()).padStart(2, "0"),
    String(fecha.getMinutes()).padStart(2, "0"),
    String(fecha.getSeconds()).padStart(2, "0"),
  ].join(":");

  return { fecha: fechaTexto, hora: horaTexto };
}

function crearEstadoCandidato(estado) {
  return {
    ...estado,
    clientes: [...estado.clientes],
    productos: [...estado.productos],
    movimientos: [...estado.movimientos],
    transaccionesTarjeta: [...estado.transaccionesTarjeta],
  };
}

export class ServicioAutenticacion {
  constructor({ almacenamiento, generadorId = () => globalThis.crypto.randomUUID(), reloj = () => new Date() }) {
    if (!almacenamiento) {
      throw new TypeError("Se requiere un almacenamiento local.");
    }

    this.almacenamiento = almacenamiento;
    this.generadorId = generadorId;
    this.reloj = reloj;
    this.clienteAutenticadoId = null;
  }

  registrar(datos) {
    const identificacion = String(datos.numeroIdentificacion ?? "").trim();
    const nombreCompleto = String(datos.nombreCompleto ?? "").trim();
    const celular = String(datos.celular ?? "").trim();
    const usuario = String(datos.usuario ?? "").trim();
    const contrasena = String(datos.contrasena ?? "");
    const confirmacion = String(datos.confirmacionContrasena ?? "");

    if (!identificacion || !nombreCompleto || !celular || !usuario || !contrasena || !confirmacion) {
      throw new TypeError("Completa todos los datos obligatorios.");
    }

    if (contrasena !== confirmacion) {
      throw new Error("La contraseña y su confirmación no coinciden.");
    }

    const saldoAhorrosCentavos = parsearCentavosNoNegativos(datos.saldoAhorros);
    const saldoCorrienteCentavos = parsearCentavosNoNegativos(datos.saldoCorriente);
    const limiteCreditoCentavos = parsearCentavosNoNegativos(datos.limiteCredito);
    const estadoActual = this.almacenamiento.cargar();
    const usuarioNormalizado = normalizarUsuario(usuario);

    const identificacionExiste = estadoActual.clientes.some(
      (cliente) => cliente.numeroIdentificacion === identificacion,
    );
    const usuarioExiste = estadoActual.clientes.some(
      (cliente) => normalizarUsuario(cliente.usuario) === usuarioNormalizado,
    );

    if (identificacionExiste || usuarioExiste) {
      throw new Error("La identificación o el nombre de usuario ya están registrados.");
    }

    const estadoCandidato = crearEstadoCandidato(estadoActual);
    const cliente = new Cliente({
      id: this.generadorId(),
      numeroIdentificacion: identificacion,
      nombreCompleto,
      celular,
      usuario,
      contrasena,
    });
    const cuentaAhorros = new CuentaAhorros({
      id: this.generadorId(),
      clienteId: cliente.id,
      saldoInicialCentavos: saldoAhorrosCentavos,
    });
    const cuentaCorriente = new CuentaCorriente({
      id: this.generadorId(),
      clienteId: cliente.id,
      saldoInicialCentavos: saldoCorrienteCentavos,
    });
    const tarjetaCredito = new TarjetaCredito({
      id: this.generadorId(),
      clienteId: cliente.id,
      limiteCreditoCentavos,
    });

    cliente.agregarProducto(cuentaAhorros.id);
    cliente.agregarProducto(cuentaCorriente.id);
    cliente.agregarProducto(tarjetaCredito.id);
    estadoCandidato.clientes.push(cliente);
    estadoCandidato.productos.push(cuentaAhorros, cuentaCorriente, tarjetaCredito);

    const marcaDeTiempo = crearMarcaDeTiempo(this.reloj());
    for (const cuenta of [cuentaAhorros, cuentaCorriente]) {
      if (cuenta.saldoCentavos > 0) {
        estadoCandidato.movimientos.push(
          new Movimiento({
            id: this.generadorId(),
            ...marcaDeTiempo,
            tipo: "consignacion",
            montoCentavos: cuenta.saldoCentavos,
            productoDestinoId: cuenta.id,
          }),
        );
      }
    }

    this.almacenamiento.guardar(estadoCandidato);
    return {
      clienteId: cliente.id,
      productoIds: [...cliente.productoIds],
    };
  }

  iniciarSesion({ usuario, contrasena }) {
    const usuarioNormalizado = normalizarUsuario(String(usuario ?? "").trim());
    const estado = this.almacenamiento.cargar();
    const indiceCliente = estado.clientes.findIndex(
      (cliente) => normalizarUsuario(cliente.usuario) === usuarioNormalizado,
    );

    if (indiceCliente < 0) {
      throw new Error("Usuario o contraseña incorrectos.");
    }

    const cliente = new Cliente(estado.clientes[indiceCliente]);
    if (cliente.bloqueado) {
      throw new Error("La cuenta está bloqueada después de tres intentos fallidos.");
    }

    if (cliente.contrasena !== String(contrasena ?? "")) {
      const intentosRestantes = cliente.registrarIntentoFallido();
      const estadoCandidato = crearEstadoCandidato(estado);
      estadoCandidato.clientes[indiceCliente] = cliente;
      this.almacenamiento.guardar(estadoCandidato);

      if (cliente.bloqueado) {
        throw new Error("La cuenta está bloqueada después de tres intentos fallidos.");
      }

      throw new Error(`Usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes}.`);
    }

    cliente.registrarAccesoCorrecto();
    const estadoCandidato = crearEstadoCandidato(estado);
    estadoCandidato.clientes[indiceCliente] = cliente;
    this.almacenamiento.guardar(estadoCandidato);
    this.clienteAutenticadoId = cliente.id;

    return {
      clienteId: cliente.id,
      nombreCompleto: cliente.nombreCompleto,
    };
  }

  cerrarSesion() {
    this.clienteAutenticadoId = null;
  }
}
