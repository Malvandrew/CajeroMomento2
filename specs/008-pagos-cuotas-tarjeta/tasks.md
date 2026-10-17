---
description: "Task list for paying credit-card installments"
---

# Tasks: Pago de Cuotas de Tarjeta de Crédito

**Input**: Design documents from `specs/008-pagos-cuotas-tarjeta/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`, `quickstart.md`

**Tests**: No se crean pruebas nuevas porque la SPEC no solicita TDD. Se ejecuta la suite existente y se validan los escenarios de pago del quickstart.

**Organization**: Las tareas de implementación están agrupadas en la única historia P1 para entregar el pago de cuotas como incremento independiente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: La tarea puede ejecutarse en paralelo con otras tareas `[P]` una vez completadas sus dependencias.
- **[Story]**: Las tareas de la historia de usuario llevan la etiqueta `[US1]`.
- Cada tarea indica la ruta concreta del archivo que debe modificarse o validarse.

## Phase 1: Setup

**Purpose**: Preparar el proyecto y sus dependencias.

La estructura, el almacenamiento y el ejecutor de pruebas ya existen. Esta feature no incorpora dependencias ni requiere tareas de setup.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Permitir que el historial represente explícitamente un pago de tarjeta.

- [X] T001 Incorporar `pago_tarjeta` a los tipos válidos de movimiento y permitir registrar sus referencias de compra y número de cuota en `src/models/Movimiento.mjs`, conservando consignaciones, retiros y transferencias existentes.

**Checkpoint**: El modelo de movimiento puede representar pagos de tarjeta antes de implementar el flujo que los registra.

---

## Phase 3: User Story 1 - Pagar una cuota de tarjeta sin cargos adicionales (Priority: P1) MVP

**Goal**: Pagar manualmente la siguiente cuota completa desde una cuenta propia, sin cargos nuevos, y reponer cupo solo por el capital pagado.

**Independent Test**: Crear una compra en varias cuotas, pagar la primera desde una cuenta propia con fondos suficientes y verificar el débito por el valor total de la cuota, la reducción de deuda por ese total, la reposición de cupo solo por el componente de capital y el movimiento registrado. Rechazar el pago repetido y el pago sin fondos sin modificar ningún saldo.

### Implementation for User Story 1

- [X] T002 [P] [US1] Extender `TransaccionTarjeta` en `src/models/TransaccionTarjeta.mjs` para registrar pagos por número de cuota y calcular el componente de capital distribuyendo equitativamente `montoOriginalCentavos` entre las cuotas, con cualquier residuo de centavos asignado a la última; tratar transacciones antiguas sin lista de pagos como todas pendientes.
- [X] T003 [P] [US1] Agregar en `src/models/Cuenta.mjs` un débito para pago de tarjeta que exija monto entero positivo y saldo suficiente; no activar el interés de retiro en cuentas de ahorros ni permitir sobregiro en cuentas corrientes.
- [X] T004 [P] [US1] Agregar en `src/models/TarjetaCredito.mjs` la aplicación de capital pagado al crédito utilizado; reducirlo solo por `montoCapitalCentavos`, impedir valores negativos y asegurar que el disponible no supere el límite inicial.
- [X] T005 [US1] Implementar en `src/services/ServicioTarjeta.mjs` la consulta de cuentas de pago propias y el pago de la siguiente cuota completa; validar propiedad, estado pendiente, importe programado y fondos, preparar cuenta, deuda, cupo, pago y movimiento en un estado candidato, y guardar solo cuando todo sea válido.
- [X] T006 [US1] Actualizar `src/ui/TarjetaCompra.mjs` para mostrar las cuotas y su estado, permitir elegir la cuenta propia y confirmar el pago exacto de la siguiente cuota, e informar deuda y cupo actualizados sin añadir intereses ni comisiones; refrescar cuentas e historial desde `src/main.mjs` después del pago.
- [X] T007 [US1] Validar el recorrido independiente siguiendo `specs/008-pagos-cuotas-tarjeta/quickstart.md`: compra en cuotas, pago correcto, reposición de cupo solo por capital, pago duplicado, fondos insuficientes, movimiento registrado y presentación en escritorio/tableta/móvil; ejecutar también `node --test`.

**Checkpoint**: El cliente puede completar y verificar un pago de cuota; los rechazos no causan cambios parciales y el interés de compra no se recalcula.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Comprobar compatibilidad de datos y que el cambio permanezca dentro del alcance aprobado.

- [X] T008 Revisar `src/models/TransaccionTarjeta.mjs`, `src/models/Cuenta.mjs`, `src/models/TarjetaCredito.mjs`, `src/models/Movimiento.mjs` y `src/services/ServicioTarjeta.mjs`; confirmar que compras guardadas sin pagos siguen mostrando todas sus cuotas pendientes, que el estado no requiere una colección nueva y que las demás operaciones de cuenta y tarjeta conservan su comportamiento.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No requiere tareas; el proyecto ya está inicializado.
- **Foundational (Phase 2)**: T001 prepara el tipo de movimiento usado por el pago.
- **User Story 1 (Phase 3)**: T002, T003 y T004 dependen de T001 y pueden ejecutarse en paralelo por modificar modelos distintos. T005 depende de T001-T004. T006 depende de T005. T007 depende de T006.
- **Polish (Phase 4)**: T008 depende de completar T001-T007.

### User Story Dependencies

- **User Story 1 (P1)**: Depende de T001; no hay otras historias.

### Parallel Opportunities

- Tras T001, se pueden ejecutar en paralelo T002 (`src/models/TransaccionTarjeta.mjs`), T003 (`src/models/Cuenta.mjs`) y T004 (`src/models/TarjetaCredito.mjs`).
- T005, T006 y T007 son secuenciales porque el servicio sostiene la interfaz y la validación requiere el flujo integrado.

## Parallel Example: User Story 1

```text
# Después de T001, trabajar en modelos independientes:
T002: cuotas y pagos en src/models/TransaccionTarjeta.mjs
T003: débito suficiente para pago en src/models/Cuenta.mjs
T004: reposición de cupo por capital en src/models/TarjetaCredito.mjs

# Después de completar los tres modelos:
T005: pago atómico en src/services/ServicioTarjeta.mjs
T006: flujo visual en src/ui/TarjetaCompra.mjs
T007: validar quickstart y suite existente
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar T001 para registrar pagos de tarjeta como movimientos.
2. Completar T002-T004 para representar cuotas pagadas, debitar cuentas y reponer cupo solo por capital.
3. Completar T005-T006 para procesar e iniciar pagos desde la interfaz.
4. Completar T007 y detenerse si un escenario deja cambios parciales, cobra cargos nuevos o repone cupo por interés.
5. Completar T008 para revisar compatibilidad con compras existentes y preservar operaciones previas.

La historia única P1 es el MVP completo; dividirla impediría probar el ciclo de pago de extremo a extremo.

### Incremental Delivery

1. Añadir el tipo de movimiento y las representaciones de capital/pagos.
2. Implementar el servicio atómico y validar sus reglas de propiedad y fondos.
3. Integrar la consulta y pago desde el panel de tarjeta.
4. Validar los escenarios del quickstart y los flujos bancarios existentes.

## Notes

- Los pagos son manuales, completos y en orden; no se agregan vencimientos, mora, cobros automáticos ni pagos parciales.
- `montoCentavos` es el pago total de la cuota; `montoCapitalCentavos` es la parte que repone cupo.
- La especificación no solicita TDD, por lo que no se incluyen tareas para crear una suite nueva.