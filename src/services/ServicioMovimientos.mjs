export class ServicioMovimientos {
  constructor({ almacenamiento }) {
    if (!almacenamiento) {
      throw new TypeError("Se requiere un almacenamiento local.");
    }

    this.almacenamiento = almacenamiento;
  }

  listarPorCliente(clienteId) {
    const estado = this.almacenamiento.cargar();
    const clienteExiste = estado.clientes.some((cliente) => cliente.id === clienteId);
    if (!clienteExiste) {
      throw new Error("No se encontró el cliente autenticado.");
    }

    const productosDelCliente = new Set(
      estado.productos
        .filter((producto) => producto.clienteId === clienteId)
        .map((producto) => producto.id),
    );

    return estado.movimientos
      .filter((movimiento) =>
        productosDelCliente.has(movimiento.productoOrigenId)
        || productosDelCliente.has(movimiento.productoDestinoId),
      )
      .sort((primero, segundo) => {
        const fechaPrimero = `${primero.fecha}T${primero.hora}`;
        const fechaSegundo = `${segundo.fecha}T${segundo.hora}`;
        return fechaSegundo.localeCompare(fechaPrimero);
      })
      .map((movimiento) => ({ ...movimiento }));
  }
}
