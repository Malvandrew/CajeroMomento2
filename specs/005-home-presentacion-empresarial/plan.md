# Implementation Plan: Presentación Empresarial e Historia de Mi Plata

**Branch**: `005-home-presentacion-empresarial` | **Date**: 2026-10-16 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/005-home-presentacion-empresarial/spec.md`

## Summary

Agregar al home una presentación empresarial de Mi Plata, un carrusel circular de
tres hitos que avanza automáticamente cada dos segundos, los controles simbólicos
`<` y `>` y el crédito académico solicitado en el footer. La implementación se
limita al renderer de la página de inicio y sus estilos; el contenido es estático,
se muestra dentro de la simulación académica y no consulta ni persiste datos de
clientes.

## Technical Context

**Language/Version**: JavaScript con módulos ES, HTML y CSS existentes.

**Primary Dependencies**: APIs estándar del navegador; no se agregan dependencias.

**Storage**: No aplica; el índice actual del carrusel es estado temporal de la vista.

**Testing**: Pruebas existentes con `node:test` mediante `node --test tests/*.test.mjs`; recorrido funcional, temporización, pausas, teclado y responsive manual en navegador.

**Target Platform**: Navegadores actuales de escritorio y móvil que soportan módulos ES.

**Project Type**: Aplicación web cliente.

**Performance Goals**: Cambios de lámina locales; un único temporizador de dos segundos activo cuando el carrusel no está pausado. No hay solicitudes de red ni carga diferida.

**Constraints**: Mantener la navegación y los productos existentes. El carrusel tiene tres láminas, avanza automáticamente cada dos segundos, pausa mientras el puntero o el foco estén dentro, reanuda con un intervalo completo de dos segundos y permite navegación manual circular con `<` y `>` y nombres accesibles. El contenido y la afirmación de importancia se presentan como parte del proyecto académico, no como datos verificados o dinámicos.

**Scale/Scope**: Una sección del home, tres hitos estáticos y una línea de créditos en el footer. Sin cambios a modelos, servicios, almacenamiento, autenticación u operaciones bancarias.

**Unknowns**: Ninguno que requiera aclaración antes de implementar.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Gate

| Principle | Result | Evidence |
|-----------|--------|----------|
| Spec-First Development | PASS | SPEC y aclaración de navegación circular preceden al plan. |
| Object-Oriented Domain Model | PASS | No hay lógica bancaria ni entidades nuevas; la interacción pertenece a la vista del home. |
| Banking Rules First | PASS | No se modifican productos, saldos ni operaciones. |
| Local Storage Only | PASS | No se añade persistencia ni servicio externo. |
| Learning-Centered Simplicity | PASS | HTML/CSS/JavaScript existentes, tres hitos estáticos y estado local sencillo. |
| Separation of concerns and quality | PASS | El renderer presenta contenido, el CSS resuelve disposición visual, y la navegación global sigue sin cambios. |

**Gate result**: PASS. No hay violaciones ni excepciones por justificar.

## Project Structure

### Documentation (this feature)

```text
specs/005-home-presentacion-empresarial/
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
src/ui/PaginaInicio.mjs  # Presentación, slides, controles y crédito del footer
styles/styles.css        # Disposición y estados responsive del home
```

**Structure Decision**: Integrar el contenido y el estado temporal en la vista de
inicio existente. Los controles del carrusel usan atributos propios, distintos de
`data-navegar`, y listeners locales al renderer; así no activan ni cambian el
enrutamiento global de `Navegacion`. Mantener un solo `setTimeout` reemplazable
para que los clics y las pausas cancelen/reinicien el intervalo sin timers
superpuestos. Mantener el CSS responsive existente y limitar las modificaciones a
las reglas del home y el footer.

### Post-Design Gate

| Principle | Result | Evidence |
|-----------|--------|----------|
| Spec-First Development | PASS | Presentación, autoplay, pausas, controles simbólicos, circulación y atribución trazan a FR-001–FR-009. |
| Object-Oriented Domain Model | PASS | No hay reglas del dominio bancario ni modelos nuevos. |
| Banking Rules First | PASS | El contenido es académico y no altera reglas financieras. |
| Local Storage Only | PASS | No se persisten hitos ni se consultan cuentas. |
| Learning-Centered Simplicity | PASS | Una vista y estilos existentes; sin frameworks ni complejidad innecesaria. |
| Separation of concerns and quality | PASS | La vista maneja su interacción local; navegación, productos y footer existente se conservan. |

**Gate result**: PASS. El diseño cumple la constitución sin excepciones.
