# Implementation Plan: Validaciones de Datos en el Registro

**Branch**: `004-validaciones-registro` | **Date**: 2026-10-16 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/004-validaciones-registro/spec.md`

## Summary

Validar los caracteres de nombre, identificación y celular durante el registro,
mostrar errores al salir de cada campo y al enviar, y evitar que datos inválidos
creen o persistan un cliente. Una utilidad pura compartirá las reglas entre la
interfaz y `ServicioAutenticacion`; el servicio repetirá la validación antes de
normalizar o guardar los datos para proteger el flujo ante llamadas que no provengan
del formulario.

## Technical Context

**Language/Version**: JavaScript con módulos ES; sintaxis moderna compatible con el navegador del proyecto.

**Primary Dependencies**: APIs estándar del navegador y Node.js; no se agregan dependencias.

**Storage**: `localStorage` existente; no cambia el esquema ni se agrega persistencia.

**Testing**: `node:test` integrado, ejecutado con `node --test`; actualmente `tests/` no contiene pruebas.

**Target Platform**: Navegadores web de escritorio y móviles compatibles con los módulos ES usados por la aplicación.

**Project Type**: Aplicación web cliente con HTML, CSS y JavaScript.

**Performance Goals**: Validaciones síncronas locales que actualizan el feedback al salir del campo o al enviar, sin solicitudes externas.

**Constraints**: Respetar las reglas de caracteres de la SPEC, los campos obligatorios y la unicidad existentes. Validar los valores originales antes de cualquier `trim()` que pudiera ocultar espacios inválidos en identificación o celular. No agregar límites de longitud, dependencias, endpoints ni cambios de modelo.

**Scale/Scope**: Un formulario y tres campos personales; sin cambios a otros flujos de edición de perfil ni a productos bancarios.

**Unknowns**: Ninguno que requiera aclaración antes de la implementación.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Gate

| Principle | Result | Evidence |
|-----------|--------|----------|
| Spec-First Development | PASS | SPEC y aclaración de interacción existen antes del plan. |
| Object-Oriented Domain Model | PASS | El servicio conserva la creación de clientes; una utilidad pura valida sin mover lógica bancaria a eventos HTML. |
| Banking Rules First | PASS | No se alteran saldos, productos, transacciones ni reglas financieras. |
| Local Storage Only | PASS | Se mantiene el almacenamiento existente y no se añaden servicios externos. |
| Learning-Centered Simplicity | PASS | Una función compartida, mensajes por campo y pruebas con `node:test`; sin dependencias nuevas. |
| Separation of concerns and quality | PASS | La UI muestra feedback, el servicio impide persistir datos inválidos y las reglas compartidas evitan divergencia. |

**Gate result**: PASS. No hay conflictos con la constitución ni excepciones que justificar.

## Project Structure

### Documentation (this feature)

```text
specs/004-validaciones-registro/
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
src/
├── services/
│   └── ServicioAutenticacion.mjs
├── ui/
│   └── Registro.mjs
└── utils/
    └── ValidacionRegistro.mjs

tests/
├── validacionRegistro.test.mjs
└── servicioAutenticacionRegistro.test.mjs
```

**Structure Decision**: Mantener la aplicación cliente y sus límites existentes.
La validación de caracteres vivirá en una utilidad pura compartida; la UI la
consultará para mensajes y el servicio la aplicará antes de crear o persistir el
cliente. Las pruebas usarán el runner integrado de Node porque no existe un
framework ni manifiesto de dependencias en el repositorio.

### Post-Design Gate

| Principle | Result | Evidence |
|-----------|--------|----------|
| Spec-First Development | PASS | El diseño cubre FR-001 a FR-007 y los escenarios aclarados. |
| Object-Oriented Domain Model | PASS | `ServicioAutenticacion` conserva las decisiones de registro; no se introduce lógica de negocio compleja en la UI. |
| Banking Rules First | PASS | El diseño no cambia productos ni reglas de dinero. |
| Local Storage Only | PASS | No hay persistencia nueva ni integración externa. |
| Learning-Centered Simplicity | PASS | Una utilidad, dos puntos de consumo y pruebas enfocadas. |
| Separation of concerns and quality | PASS | UI, validación y persistencia permanecen diferenciadas y el servicio rechaza datos inválidos antes de guardar. |

**Gate result**: PASS. El diseño no crea violaciones constitucionales ni requiere seguimiento de excepciones.
