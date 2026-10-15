function clonarEstado(estado) {
  return {
    ...estado,
    clientes: [...estado.clientes],
    productos: [...estado.productos],
    movimientos: [...estado.movimientos],
    transaccionesTarjeta: [...estado.transaccionesTarjeta],
  };
}

function normalizarUsuario(usuario) {
  return String(usuario ?? "").trim().toLocaleLowerCase("es-CO");
}

function validarPerfil(datos) {
  const perfil = {
    numeroIdentificacion: String(datos.numeroIdentificacion ?? "").trim(),
    nombreCompleto: String(datos.nombreCompleto ?? "").trim(),
    celular: String(datos.celular ?? "").trim(),
    usuario: String(datos.usuario ?? "").trim(),
  };

  if (!perfil.numeroIdentificacion || !perfil.nombreCompleto || !perfil.celular || !perfil.usuario) {
    throw new TypeError("Completa todos los datos obligatorios del perfil.");
  }

  return perfil;
}

export class ServicioPerfil {
  constructor({ almacenamiento }) {
    if (!almacenamiento) {
      throw new TypeError("Se requiere un almacenamiento local.");
    }

    this.almacenamiento = almacenamiento;
  }

  obtenerPerfil(clienteId) {
    const estado = this.almacenamiento.cargar();
    const cliente = estado.clientes.find((elemento) => elemento.id === clienteId);
    if (!cliente) {
      throw new Error("No se encontró el cliente autenticado.");
    }

    const { contrasena, ...perfil } = cliente;
    return { ...perfil };
  }

  editarPerfil(clienteId, datos) {
    const perfil = validarPerfil(datos);
    const estadoActual = this.almacenamiento.cargar();
    const indice = estadoActual.clientes.findIndex((cliente) => cliente.id === clienteId);
    if (indice < 0) {
      throw new Error("No se encontró el cliente autenticado.");
    }

    const duplicado = estadoActual.clientes.some((cliente) =>
      cliente.id !== clienteId
      && (
        cliente.numeroIdentificacion === perfil.numeroIdentificacion
        || normalizarUsuario(cliente.usuario) === normalizarUsuario(perfil.usuario)
      ),
    );
    if (duplicado) {
      throw new Error("La identificación o el nombre de usuario ya pertenecen a otro cliente.");
    }

    const estadoCandidato = clonarEstado(estadoActual);
    estadoCandidato.clientes[indice] = {
      ...estadoCandidato.clientes[indice],
      ...perfil,
    };
    this.almacenamiento.guardar(estadoCandidato);
    return this.obtenerPerfil(clienteId);
  }

  cambiarContrasena(clienteId, datos) {
    const nombreUsuario = String(datos.usuario ?? "").trim();
    const contrasenaActual = String(datos.contrasenaActual ?? "");
    const contrasenaNueva = String(datos.contrasenaNueva ?? "");
    const confirmacion = String(datos.confirmacionContrasena ?? "");
    const estadoActual = this.almacenamiento.cargar();
    const indice = estadoActual.clientes.findIndex((cliente) => cliente.id === clienteId);

    if (indice < 0) {
      throw new Error("No se encontró el cliente autenticado.");
    }

    const cliente = estadoActual.clientes[indice];
    if (normalizarUsuario(cliente.usuario) !== normalizarUsuario(nombreUsuario)
      || cliente.contrasena !== contrasenaActual) {
      throw new Error("El usuario o la contraseña actual no son correctos.");
    }

    if (!contrasenaNueva || contrasenaNueva !== confirmacion) {
      throw new Error("La nueva contraseña y su confirmación no coinciden.");
    }

    const estadoCandidato = clonarEstado(estadoActual);
    estadoCandidato.clientes[indice] = {
      ...cliente,
      contrasena: contrasenaNueva,
    };
    this.almacenamiento.guardar(estadoCandidato);
    return true;
  }

  eliminarCuenta(clienteId) {
    const estadoActual = this.almacenamiento.cargar();
    const cliente = estadoActual.clientes.find((elemento) => elemento.id === clienteId);
    if (!cliente) {
      throw new Error("No se encontró el cliente autenticado.");
    }

    const idsProductos = new Set(
      estadoActual.productos
        .filter((producto) => producto.clienteId === clienteId)
        .map((producto) => producto.id),
    );
    const idsTarjetas = new Set(
      estadoActual.productos
        .filter((producto) => producto.clienteId === clienteId && producto.tipo === "credito")
        .map((producto) => producto.id),
    );
    let movimientosAnonimizados = 0;
    const estadoCandidato = clonarEstado(estadoActual);

    estadoCandidato.clientes = estadoCandidato.clientes.filter((elemento) => elemento.id !== clienteId);
    estadoCandidato.productos = estadoCandidato.productos.filter((producto) => producto.clienteId !== clienteId);
    estadoCandidato.transaccionesTarjeta = estadoCandidato.transaccionesTarjeta.filter(
      (transaccion) => !idsTarjetas.has(transaccion.tarjetaId),
    );
    estadoCandidato.movimientos = estadoCandidato.movimientos.map((movimiento) => {
      const relacionado = idsProductos.has(movimiento.productoOrigenId)
        || idsProductos.has(movimiento.productoDestinoId);
      if (!relacionado) {
        return movimiento;
      }

      movimientosAnonimizados += 1;
      return {
        fecha: movimiento.fecha,
        hora: movimiento.hora,
        tipo: movimiento.tipo,
        montoCentavos: movimiento.montoCentavos,
      };
    });

    this.almacenamiento.guardar(estadoCandidato);
    return { movimientosAnonimizados };
  }
}
