# Feature Specification: Pago de Cuotas de Tarjeta de Crédito

**Feature Branch**: `[008-pagos-cuotas-tarjeta]`

**Created**: 2026-10-17

**Status**: Draft

**Input**: User description: "si realizo una compra con la tarjeta de crédito, cómo puedo pagar la cuota? y que entre la plata sin intereses"

## Clarifications

### Session 2026-10-17

- Q: Cuando pagas una cuota que incluye intereses de la compra, ¿cuánto debe aumentar el cupo disponible de tu tarjeta? → A: Solo la parte de capital de la cuota; la parte de interés paga la financiación y no repone cupo. El capital se distribuye equitativamente entre cuotas y cualquier residuo se asigna a la última.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Pagar una cuota de tarjeta sin cargos adicionales (Priority: P1)

Un cliente quiere consultar las cuotas pendientes de una compra con tarjeta y pagar manualmente la siguiente cuota usando una cuenta propia, para abonar a su deuda sin que el pago genere intereses o comisiones adicionales.

**Why this priority**: Sin un flujo de pago, el cliente puede comprar con la tarjeta pero no reducir la deuda ni recuperar cupo disponible. Un pago claro y sin cargos inesperados permite completar el ciclo básico de uso del producto.

**Independent Test**: Crear una compra con varias cuotas y cupo disponible, pagar su siguiente cuota desde una cuenta propia de ahorros o corriente y comprobar que el dinero se descuenta de esa cuenta, se aplica una sola vez a la compra, actualiza la deuda y el cupo disponible, y no añade intereses ni comisiones al pago.

**Acceptance Scenarios**:

1. **Given** un cliente autenticado con una compra de tarjeta que tiene cuotas pendientes, **When** consulta el detalle de esa compra, **Then** puede ver el valor y el estado de las cuotas y reconocer cuál es la siguiente cuota pendiente.
2. **Given** una cuenta propia de ahorros o corriente con fondos suficientes y una cuota pendiente, **When** el cliente confirma el pago de esa cuota, **Then** se descuenta de la cuenta el valor exacto de la cuota y se aplica ese mismo valor a la deuda de la compra.
3. **Given** un pago de cuota válido, **When** el sistema lo procesa, **Then** no añade intereses, recargos ni comisiones al pago, y conserva sin cambios el valor de las cuotas calculado originalmente para la compra.
4. **Given** un pago de cuota completado, **When** el cliente vuelve a consultar la compra y la tarjeta, **Then** la cuota aparece pagada, la deuda pendiente disminuye por el valor aplicado y el cupo disponible se actualiza sin superar el límite inicial.
5. **Given** un cliente intenta pagar una cuota usando una cuenta ajena o sin fondos suficientes, **When** confirma la operación, **Then** se rechaza el pago y no cambian el saldo de la cuenta, la deuda, el cupo ni el estado de la cuota.
6. **Given** que el cliente ya pagó una cuota, **When** vuelve a consultar o intenta pagarla otra vez, **Then** no puede registrarse un segundo pago para esa misma cuota.
7. **Given** que se completa un pago, **When** el cliente consulta sus movimientos, **Then** encuentra el pago con fecha, hora y valor, asociado a la compra y a la cuenta usada como origen.

### Edge Cases

- La cuenta seleccionada tiene saldo igual al valor de la cuota; el pago debe aceptarse y dejar saldo cero.
- La cuenta seleccionada tiene saldo menor al valor de la cuota; el pago debe rechazarse sin cambios parciales.
- La compra no tiene cuotas pendientes; no debe permitirse un pago adicional.
- Se intenta seleccionar como origen una cuenta inexistente, de otro cliente o que no sea una cuenta de ahorros o corriente.
- Se envían dos solicitudes de pago para la misma cuota; solo una puede completarse.
- La compra tiene cuotas con valores diferentes por el ajuste de redondeo de la última cuota; cada una debe pagarse por su valor programado.
- La división del capital entre cuotas deja un residuo de centavos; este se asigna a la última cuota y solo el capital pagado repone cupo.
- El interés incluido en las cuotas de la compra no debe confundirse con un cargo por efectuar el pago: pagar no agrega un nuevo interés.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El cliente autenticado MUST poder consultar las compras de su tarjeta, sus cuotas, los valores programados, el estado de pago y la siguiente cuota pendiente de cada compra.
- **FR-002**: El cliente MUST poder elegir una de sus cuentas propias de ahorros o corriente como origen de fondos para pagar manualmente una cuota pendiente.
- **FR-003**: Cada pago MUST cubrir exactamente el valor de la siguiente cuota pendiente seleccionada; no se permiten pagos parciales ni pagos por encima del valor programado.
- **FR-004**: Un pago válido MUST debitar de forma atómica el valor exacto de la cuenta de origen y aplicar el mismo valor a la deuda pendiente de la compra; no se permiten saldos parciales si alguna parte falla.
- **FR-005**: El pago MUST NOT generar intereses, recargos ni comisiones adicionales. El interés que ya forma parte del valor programado de la cuota por las condiciones originales de la compra se mantiene y no se recalcula al pagar.
- **FR-006**: Después de un pago confirmado, el sistema MUST marcar la cuota como pagada y disminuir la deuda pendiente por el valor total pagado. El cupo utilizado MUST disminuir únicamente por el componente de capital de esa cuota, sin superar el límite inicial de la tarjeta.
- **FR-007**: El sistema MUST impedir pagos de cuotas ya pagadas, inexistentes o pertenecientes a una compra que no sea del cliente autenticado.
- **FR-008**: El sistema MUST rechazar pagos cuando la cuenta de origen no pertenezca al cliente, no sea de ahorros o corriente, no exista o no tenga fondos suficientes; en un rechazo, la cuenta, la deuda, el cupo y el estado de las cuotas MUST permanecer sin cambios.
- **FR-009**: Todo pago completado MUST quedar registrado con fecha, hora, valor y referencias a la cuenta de origen y a la compra o tarjeta correspondiente.
- **FR-010**: La interfaz MUST mostrar el resultado del pago y el estado actualizado de la cuota, la deuda pendiente y el cupo disponible.
- **FR-011**: El flujo MUST permanecer utilizable en escritorio, tableta y móvil, y no MUST modificar datos ni operaciones ajenos a los pagos de tarjeta.

### Key Entities *(include if feature involves data)*

- **Compra con tarjeta**: Compra aceptada con una tarjeta, con monto original, cuotas programadas, interés calculado al momento de la compra y deuda pendiente.
- **Cuota**: Parte programada de una compra, identificada por su posición dentro del plan, valor y estado pendiente o pagado. La última cuota puede diferir por redondeo.
- **Pago de cuota**: Abono manual, sin cargos adicionales, que relaciona una cuota pendiente, la cuenta propia de origen y la compra o tarjeta; incluye fecha, hora y valor aplicado.
- **Cuenta de origen**: Cuenta de ahorros o corriente del cliente desde la cual se debita el pago.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En el 100% de los pagos aceptados, se debita de la cuenta de origen exactamente el valor programado de la cuota y se aplica ese valor una sola vez a la deuda; el cupo utilizado disminuye solo por el componente de capital de la cuota pagada.
- **SC-002**: En el 100% de los pagos, el sistema añade cero intereses, recargos y comisiones al valor programado; el interés de compra previamente calculado permanece sin cambios.
- **SC-003**: En el 100% de los intentos rechazados por fondos insuficientes, cuenta no autorizada o cuota ya pagada, la cuenta, la deuda, el cupo y el estado de pago permanecen sin cambios.
- **SC-004**: El 100% de los pagos completados aparece en el historial con fecha, hora y valor, y permite identificar la compra y la cuenta de origen.
- **SC-005**: En el 100% de las pruebas, el cupo disponible actualizado no supera el límite inicial de la tarjeta.
- **SC-006**: En revisiones de escritorio, tableta y móvil, el cliente puede identificar el valor de la cuota pendiente, la cuenta de origen y el resultado del pago sin solapamientos ni controles inaccesibles.

## Assumptions

- El pago es iniciado manualmente por el cliente autenticado y se financia desde una cuenta de ahorros o corriente propia con fondos suficientes.
- Solo se permite pagar la siguiente cuota pendiente de una compra, por su valor completo; no se definen pagos parciales ni pagos adelantados de varias cuotas.
- Las cuotas se pagan en el orden en que aparecen en el plan de la compra. Esta feature no define fechas de vencimiento, intereses por mora, cobranza automática ni penalizaciones por retraso.
- “Sin intereses” significa que el pago no agrega intereses, recargos ni comisiones. Se conserva el interés ya calculado para la compra según su número de cuotas.
- El componente de capital de cada cuota se obtiene al distribuir equitativamente el monto original de la compra entre sus cuotas en centavos; cualquier residuo se asigna a la última cuota. El pago total de la cuota reduce la deuda, mientras solo su componente de capital recupera cupo disponible.
- Los pagos son movimientos internos de la simulación y no requieren pasarelas, transferencias externas ni integración con entidades financieras.
- Esta feature incorpora los pagos de tarjeta y la recuperación del cupo que la especificación del sistema bancario dejó fuera de su alcance original; no modifica las tasas ni el cálculo de cuotas de las compras existentes.