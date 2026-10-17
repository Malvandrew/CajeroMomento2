# Data Model: Pago de Cuotas de Tarjeta de Crédito

## Resumen

La funcionalidad amplía las compras de tarjeta y los movimientos existentes. No crea una colección de nivel superior ni modifica la versión del estado. Los registros antiguos de compras sin información de pagos se interpretan como compras con todas sus cuotas pendientes.

## Compra con tarjeta (`TransaccionTarjeta`)

- **Identidad**: `id` existente de la compra.
- **Relación**: pertenece a `TarjetaCredito` mediante `tarjetaId`.
- **Datos existentes sin cambios**: monto original, tasa, número de cuotas, importes de cuotas, total, fecha y hora de compra.
- **Dato ampliado**: `pagos`, lista de cuotas pagadas. Para datos anteriores sin esta lista, el comportamiento equivale a una lista vacía.
- **Regla de estado**: una cuota está pendiente si su número no aparece en `pagos`; cada número de cuota puede aparecer como pagado una sola vez.
- **Orden**: las cuotas se pagan de menor a mayor número; el próximo pago corresponde a la primera cuota pendiente.

## Pago de cuota (`TransaccionTarjeta.pagos[]`)

- `id`: identificador del pago.
- `numeroCuota`: posición de la cuota en el plan, comenzando en 1.
- `montoCentavos`: igual al importe programado de esa cuota, incluido el posible ajuste de redondeo de la última.
- `montoCapitalCentavos`: parte del pago que corresponde al capital original y que repone el cupo utilizado.
- `cuentaOrigenId`: cuenta propia de ahorros o corriente usada para pagar.
- `fecha` y `hora`: momento en que se confirma el pago.
- **Restricciones**: la cuota debe estar pendiente; `montoCentavos` debe ser positivo y exactamente igual a su importe programado; `montoCapitalCentavos` no puede superar `montoCentavos`; la cuenta debe pertenecer al cliente, ser de depósito y tener fondos suficientes.
- **Distribución del capital**: dividir `montoOriginalCentavos` equitativamente entre el número de cuotas; asignar cualquier residuo de centavos a la última cuota.

## Movimiento (`Movimiento`)

- `tipo`: incorpora `pago_tarjeta` a los tipos existentes.
- `montoCentavos`: importe exacto aplicado a la cuota.
- `productoOrigenId`: ID de la cuenta debitada.
- `productoDestinoId`: ID de la tarjeta acreditada.
- `transaccionTarjetaId` y `numeroCuota`: referencias que identifican la compra y cuota pagada.
- `fecha` y `hora`: momento del movimiento.

## Efectos sobre productos

- **Cuenta de origen**: el saldo baja exactamente por el importe de la cuota; el pago exige fondos suficientes y no utiliza sobregiro.
- **Cuenta de ahorros**: pagar una cuota no es un retiro en efectivo y no activa el interés mensual por retiro.
- **Tarjeta de crédito**: la deuda pendiente baja por el importe total pagado; el crédito utilizado se reduce solo por `montoCapitalCentavos` y no queda negativo; el disponible nunca supera el límite inicial.
- **Atomicidad**: cuenta, pago, tarjeta y movimiento se guardan juntos o permanecen sin cambios.