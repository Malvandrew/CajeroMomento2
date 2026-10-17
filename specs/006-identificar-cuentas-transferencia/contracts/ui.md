# UI Contract: Identificar Titulares en Transferencias

## Account Selection Lists

- La lista de origen conserva únicamente las cuentas elegibles del cliente
  autenticado.
- La lista de destino conserva las cuentas elegibles actuales, excepto la cuenta
  de origen seleccionada.
- Cada opción de ambas listas presenta tipo de producto, el número mostrado
  actualmente y nombre completo del titular.
- El valor asociado a cada opción continúa identificando el producto seleccionado;
  el nombre es solo informativo y no reemplaza el identificador.
- Al cambiar el origen, los destinos se actualizan como antes y muestran también
  el nombre de su titular.
- Titulares con el mismo nombre y cuentas del mismo tipo se distinguen por el
  número de cuenta.
- Solo se muestra el nombre completo; no se añade username, identificación,
  celular ni contraseña.

## Existing Transfer Behavior

- La lista de destino vacía o deshabilitada conserva su comportamiento actual.
- Confirmar o rechazar una transferencia conserva las reglas, mensajes, saldos y
  registro de movimientos existentes.
- Los nombres largos deben permanecer legibles sin ocultar tipo o número ni causar
  desbordamiento horizontal en móvil.