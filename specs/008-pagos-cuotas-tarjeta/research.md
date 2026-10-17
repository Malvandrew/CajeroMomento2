# Research: Pago de Cuotas de Tarjeta de Crédito

## Decisiones

### Asociar el estado de pago a la compra existente

- **Decision**: Guardar cada pago confirmado dentro de la transacción de tarjeta correspondiente, identificado por número de cuota, monto, fecha, hora y cuenta de origen. Interpretar como no pagadas las transacciones antiguas que aún no tengan una lista de pagos.
- **Rationale**: `TransaccionTarjeta` ya contiene los importes y el orden de las cuotas; vincular el pago directamente a esa compra permite impedir duplicados y calcular cuotas pendientes sin migrar todo el estado.
- **Alternatives considered**: Crear una colección global de pagos requeriría modificar `EstadoAplicacion` y su validación. Guardar solo un contador de cuotas no conservaría qué cuenta pagó cada cuota ni permitiría auditar el pago.

### Registrar el pago como movimiento con dos productos relacionados

- **Decision**: Extender el tipo de movimiento admitido para incluir pago de tarjeta y registrar la cuenta propia como origen, la tarjeta como destino y la compra/cuota asociada.
- **Rationale**: `ServicioMovimientos.listarPorCliente` ya incluye movimientos cuando origen o destino pertenece al cliente. Esta representación hace visible el pago en el historial bancario y conserva su trazabilidad.
- **Alternatives considered**: No registrar un movimiento dejaría los débitos fuera del historial común. Usar una transferencia genérica ocultaría que el destino es un pago de deuda.

### Preparar el pago en un estado candidato y guardar una sola vez

- **Decision**: Validar autenticación, propiedad de tarjeta y cuenta, siguiente cuota pendiente y saldo suficiente; preparar débito, pago, cupo y movimiento en una copia candidata; persistirla solo cuando todo sea válido.
- **Rationale**: `ServicioCuentas` ya clona las colecciones y guarda después de validar una operación. Reutilizar ese patrón evita que un rechazo deje actualizada solo una parte.
- **Alternatives considered**: Mutar los productos y transacciones cargados antes de validar todo podría dejar datos parciales si un paso falla.

### Separar un pago de un retiro de efectivo

- **Decision**: Debitar de ahorros o corriente usando la regla de fondos suficientes para pagos, sin invocar `retirarEfectivo` de `CuentaAhorros` ni aplicar sobregiro de cuenta corriente.
- **Rationale**: La SPEC permite pagar solo desde una cuenta con fondos suficientes. El interés mensual de ahorros se activa en retiros de efectivo, no en pagos de tarjeta; un pago tampoco debe usar sobregiro.
- **Alternatives considered**: Reutilizar retiros de efectivo podría acreditar interés de ahorros como efecto secundario del pago. Reutilizar el sobregiro permitiría pagar sin fondos suficientes, en contra del alcance.

### Mantener inalterado el importe de la compra

- **Decision**: Conservar `cuotasCentavos`, el total y la tasa de la compra como fueron calculados; el pago cambia el estado pendiente/pagado y la deuda/cupo, no vuelve a cotizar la compra.
- **Rationale**: El interés ya integrado en una cuota pertenece al plan original; la operación de pago no agrega intereses, recargos ni comisiones.
- **Alternatives considered**: Recalcular el plan al pagar podría cambiar el valor de cuotas ya presentado al cliente y confundir el interés de financiación con cargos del pago.

### Separar el valor pagado de la parte que repone cupo

- **Decision**: Aplicar el importe completo de la cuota a la deuda pendiente, pero reducir el crédito utilizado solo por la parte de capital de esa cuota. Distribuir el capital original de forma equitativa entre cuotas y asignar el residuo de centavos a la última.
- **Rationale**: El límite de crédito se consume por el monto original de las compras; los intereses aumentan la deuda a pagar, pero no representan capital de compra que deba reponer cupo.
- **Alternatives considered**: Reponer el cupo por el valor total pagado trataría los intereses como capital restituido; no reponer cupo impediría que los pagos liberaran el crédito usado.

## Hallazgos locales

- `ServicioTarjeta.registrarCompra` crea la transacción y actualiza el cupo utilizado.
- `TransaccionTarjeta` conserva importes por cuota, incluido el ajuste de redondeo en la última.
- `ServicioCuentas` usa reconstrucción de modelos y guardado de estado candidato.
- `Movimiento` hoy admite consignación, retiro y transferencia; el servicio de movimientos filtra por IDs de producto del titular.
- `EstadoAplicacion` usa una colección existente `transaccionesTarjeta`; guardar pagos en la transacción evita agregar una colección de nivel superior.

No quedan decisiones de tecnología o integraciones externas por investigar.