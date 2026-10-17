# Implementation Plan: Identificar Titulares en Transferencias

**Branch**: `006-identificar-cuentas-transferencia` | **Date**: 2026-10-16 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/006-identificar-cuentas-transferencia/spec.md`

## Summary

Mostrar el nombre completo del titular junto al tipo y al número de cuenta en las
listas de origen y destino de transferencias. `ServicioTransferencias` compondrá
el dato desde el cliente asociado a cada producto; `Transferencias.mjs` conservará
el ID del producto como valor de selección y agregará el nombre a la etiqueta
visible, sin cambiar filtros ni reglas financieras.

## Technical Context

**Language/Version**: JavaScript con módulos ES, HTML y CSS existentes.

**Primary Dependencies**: APIs estándar del navegador y Node.js; no se agregan dependencias.

**Storage**: `localStorage` existente; se leen clientes y productos sin modificar el esquema ni persistir datos nuevos.

**Testing**: Runner integrado `node:test` mediante `node --test tests/*.test.mjs`; validación de etiquetas, selección y transferencia en navegador.

**Target Platform**: Navegadores actuales de escritorio y móvil que soportan módulos ES.

**Project Type**: Aplicación web cliente.

**Performance Goals**: Enriquecer las listas desde el estado local ya cargado; el conjunto de datos académico no requiere índices ni servicios nuevos.

**Constraints**: Mantener elegibilidad, orden y valor seleccionado de cada opción. El número visible conserva la presentación existente, correspondiente al sufijo de seis caracteres del ID. Mostrar solamente el nombre completo del titular; no exponer username, identificación, celular o contraseña. Los nombres completos de titulares de destinos son visibles a usuarios autenticados conforme al alcance explícito de la SPEC.

**Scale/Scope**: Una historia, dos listas dentro de la vista de transferencias y los datos de titularidad ya presentes en el estado local. Sin cambios a entidades persistidas, saldos, validaciones, movimientos ni historial.

**Unknowns**: Ninguno que requiera aclaración antes de implementar.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Gate

| Principle | Result | Evidence |
|-----------|--------|----------|
| Spec-First Development | PASS | La SPEC define listas, nombre completo, privacidad acotada y preservación del flujo. |
| Object-Oriented Domain Model | PASS | El servicio compone el nombre de Cliente y Producto; la UI solo presenta la opción. |
| Banking Rules First | PASS | No se cambian cuentas elegibles, importes, saldos ni reglas de transferencia. |
| Local Storage Only | PASS | Se consulta el estado local existente; no se agrega persistencia ni servicio externo. |
| Learning-Centered Simplicity | PASS | Se agrega un campo a los objetos de lista existentes, sin clases o dependencias nuevas. |
| Separation of concerns and quality | PASS | Servicio resuelve titularidad, UI representa la etiqueta y el ID continúa identificando la selección. |

**Gate result**: PASS. La visibilidad del nombre del titular para opciones de destino está autorizada explícitamente por la SPEC; no se expondrán otros datos personales.

## Project Structure

### Documentation (this feature)

```text
specs/006-identificar-cuentas-transferencia/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui.md
└── tasks.md             # Fase posterior: /speckit-tasks
```

### Source Code (repository root)

```text
src/services/ServicioTransferencias.mjs  # Resuelve nombreCompleto para cada producto
src/ui/Transferencias.mjs                # Presenta etiquetas conservando el ID como value
```

**Structure Decision**: Enriquecer las listas en `ServicioTransferencias` con
`nombreCompleto` obtenido al buscar el titular del producto por `clienteId` dentro
del estado ya cargado. En la UI, agregar ese nombre al texto visible de cada opción
y conservar `opcion.value = cuenta.id`. No cambiar modelos, validación de estado,
persistencia ni `transferir()`.

### Post-Design Gate

| Principle | Result | Evidence |
|-----------|--------|----------|
| Spec-First Development | PASS | El diseño cubre FR-001–FR-007 y el único flujo US1. |
| Object-Oriented Domain Model | PASS | Se reutilizan Cliente y Producto sin trasladar lógica financiera a la UI. |
| Banking Rules First | PASS | Las reglas y resultados de transferencias permanecen intactos. |
| Local Storage Only | PASS | No hay escritura nueva ni integración externa. |
| Learning-Centered Simplicity | PASS | Se añade solo un dato de presentación obtenido del estado existente. |
| Separation of concerns and quality | PASS | Servicio resuelve el titular; UI compone la etiqueta y conserva el ID. |

**Gate result**: PASS. No hay violaciones constitucionales ni excepciones.
