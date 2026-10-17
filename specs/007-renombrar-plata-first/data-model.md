# Data Model: Renombrar Banco a Plata First

## Resumen

Esta funcionalidad no cambia el modelo de datos bancario ni persiste una entidad nueva. El nombre de marca es contenido estático de presentación y documentación, no un dato de cliente o de cuenta.

## Identidad del banco

- **Representación**: Nombre y monograma de marca mostrados en la aplicación vigente.
- **Nombre**: `Plata First`.
- **Monograma**: `PF`.
- **Relaciones**: Se presenta en la página, navegación, registro, panel, contenido de identidad y comunicaciones de error que identifican a la aplicación.
- **Validación**: Las referencias vigentes deben usar el nombre exacto y no presentar `Mi Plata` como nombre actual. Los artefactos históricos se mantienen sin reescritura.

## Datos no afectados

- Clientes, credenciales y perfiles.
- Cuentas, tarjetas, productos y saldos.
- Movimientos, transferencias y transacciones.
- Claves, formato y contenido existente de `localStorage`.

No se requiere migración de datos ni transición de estado.