# UI Contract: Pago de Cuotas de Tarjeta de Crédito

## Consulta de compras y cuotas

- El panel de tarjeta muestra el plan de cuotas por compra, sus valores y un estado comprensible de pendiente o pagada.
- Se identifica la siguiente cuota pendiente de cada compra, en el orden del plan.
- La interfaz conserva sin cambios el monto original, interés de compra, cuotas programadas y total de la compra.

## Flujo de pago

- El cliente elige una compra con cuota pendiente y una cuenta propia de ahorros o corriente.
- Antes de confirmar, se muestran la cuota que se pagará, su monto exacto y la cuenta de origen.
- El control de pago solo permite pagar la siguiente cuota completa; no se ofrecen pagos parciales, monto editable ni varias cuotas adelantadas.
- Se informa claramente que el pago no añade intereses, recargos ni comisiones; el interés de financiación ya incluido en la cuota permanece.
- Si no hay cuotas pendientes o los fondos son insuficientes, se explica el motivo y no se confirma el pago.
- Después de un pago correcto, se muestra el resultado, la cuota actualizada, la deuda pendiente y el cupo disponible actualizado; la reposición de cupo corresponde solo al capital pagado, no al interés de la cuota.

## Historial y accesibilidad

- Cada pago aparece como un tipo de movimiento identificable, con fecha, hora y valor, y puede relacionarse con la compra y la cuenta de origen.
- Los controles tienen etiquetas asociadas, estados accesibles y mensajes de éxito/error legibles.
- El flujo permanece legible y utilizable en escritorio, tableta y móvil sin solapamiento ni desplazamiento horizontal.