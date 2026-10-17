# Implementation Plan: Pago de Cuotas de Tarjeta de Crédito

**Branch**: `008-pagos-cuotas-tarjeta` | **Date**: 2026-10-17 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/008-pagos-cuotas-tarjeta/spec.md`

## Summary

Permitir que un cliente pague manualmente la siguiente cuota pendiente de una compra, debitando una cuenta propia de ahorros o corriente y aplicando el abono a la deuda de la tarjeta sin cobrar intereses o comisiones nuevos. Se ampliarán las transacciones y movimientos existentes, se procesará el cambio en un estado candidato y se conservarán los planes de cuotas ya calculados y las reglas actuales de compra.

## Technical Context

**Language/Version**: JavaScript con módulos ES nativos; HTML5 y CSS

**Primary Dependencies**: Ninguna dependencia adicional

**Storage**: `localStorage` existente; persistir pagos dentro de las transacciones de tarjeta existentes y pagos en `movimientos`; sin nueva colección de nivel superior ni migración de versión

**Testing**: Ejecutor integrado de Node.js (`node --test`); validaciones de servicio para pago aceptado, cuota repetida, fondos insuficientes, cuenta ajena y atomicidad; comprobación manual de interfaz

**Target Platform**: Navegadores modernos de escritorio, tableta y móvil

**Project Type**: Aplicación web estática de frontend

**Performance Goals**: Registrar una operación local en el mismo flujo de interacción, sin demoras perceptibles

**Constraints**: El cliente paga manualmente una cuota completa y en orden; solo puede usar una cuenta propia con saldo suficiente; no se cobran cargos adicionales; no se recalculan intereses de compra; no se activan intereses de retiro de efectivo por pagar desde ahorros; los rechazos no cambian estado

**Scale/Scope**: `src/models/TransaccionTarjeta.mjs`, `src/models/TarjetaCredito.mjs`, `src/models/Movimiento.mjs`, `src/services/ServicioTarjeta.mjs`, `src/ui/TarjetaCompra.mjs`, `src/main.mjs` y pruebas de servicio; sin servicios externos ni nuevos almacenes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Before Phase 0

- **Spec-First Development**: PASS. La SPEC define el flujo, las restricciones de pago, escenarios y resultados medibles.
- **Object-Oriented Domain Model**: PASS. El pago se implementará en modelos y servicios existentes; la interfaz solo presentará y solicitará datos.
- **Banking Rules First**: PASS. El cargo de una cuota no añade intereses nuevos ni cambia el cálculo de la compra. Pagar desde ahorros es un débito de pago, no un retiro en efectivo, por lo que no dispara el interés mensual asociado a retiros.
- **Local Storage Only**: PASS. Pagos y movimientos permanecen en almacenamiento local; no se integran pasarelas ni APIs externas.
- **Learning-Centered Simplicity**: PASS. Se reutilizan transacciones, movimientos, cuentas y el patrón de estado candidato, sin agregar una infraestructura de pagos externa.
- **User Experience**: PASS. El flujo presenta la próxima cuota, la cuenta de origen y el resultado con controles responsive y mensajes claros.

### Post-Design Re-check

- **Domain and financial integrity**: PASS. El pago usa el importe programado de la cuota, reduce la deuda y limita el cupo disponible al límite inicial.
- **Atomicity and ownership**: PASS. La cuenta y la compra deben pertenecer al cliente autenticado; el estado solo se guarda tras validar y preparar todos los cambios.
- **Persistence compatibility**: PASS. Las compras existentes sin registro de pagos se interpretan como cuotas aún no pagadas; no se requiere cambiar la versión del estado.
- **External services and governance**: PASS. No se añade integración externa ni se modifican las reglas fuera de esta feature.

## Project Structure

### Documentation (this feature)

```text
specs/008-pagos-cuotas-tarjeta/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui.md
└── tasks.md              # Se genera en la fase de tareas, no en esta fase
```

### Source Code (repository root)

```text
src/
├── models/
│   ├── Movimiento.mjs
│   ├── TarjetaCredito.mjs
│   └── TransaccionTarjeta.mjs
├── services/
│   └── ServicioTarjeta.mjs
├── ui/
│   └── TarjetaCompra.mjs
└── main.mjs
tests/
└── servicioTarjetaPagos.test.mjs
```

**Structure Decision**: Extender el flujo existente de compra en `ServicioTarjeta` y `TarjetaCompra`. Guardar el estado de cada cuota pagada dentro de su `TransaccionTarjeta` y registrar cada pago como `Movimiento` relacionado con la cuenta de cargo y la tarjeta. La construcción de un estado candidato seguirá el patrón de `ServicioCuentas` para evitar cambios parciales. No se agrega un servicio o una colección de almacenamiento independientes.
