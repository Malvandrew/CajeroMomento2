---
description: "Task list template for feature implementation"
---

# Tasks: Renombrar Banco a Plata First

**Input**: Design documents from `specs/007-renombrar-plata-first/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`, `quickstart.md`

**Tests**: No se agregan pruebas nuevas; la especificación no solicita TDD. Se ejecutan las pruebas existentes y las verificaciones automatizadas y manuales del quickstart.

**Organization**: Las tareas de implementación y validación están agrupadas en la única historia P1 para entregar el cambio de marca como incremento independiente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: La tarea puede ejecutarse en paralelo con otras tareas marcadas `[P]` una vez cumplidas sus dependencias.
- **[Story]**: Historia de usuario de `spec.md` a la que pertenece la tarea.
- Todas las descripciones indican archivos o rutas concretas del proyecto.

## Phase 1: Setup

**Purpose**: Preparar el proyecto y las dependencias.

La aplicación y sus herramientas de prueba ya están configuradas. Esta funcionalidad no agrega dependencias ni estructura de proyecto, por lo que no requiere tareas de setup.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Actualizar la referencia de identidad gobernada antes de cambiar el contenido de la aplicación.

- [X] T001 Actualizar la descripción de la aplicación bancaria a Plata First y registrar la fecha de enmienda en `.specify/memory/constitution.md`, sin modificar los principios ni reglas bancarias.

**Checkpoint**: La descripción vigente del producto en la constitución refleja el nombre autorizado; las tareas de interfaz pueden comenzar.

---

## Phase 3: User Story 1 - Reconocer la nueva identidad del banco (Priority: P1) MVP

**Goal**: Presentar Plata First de forma coherente en los puntos de contacto vigentes, conservando el comportamiento y los datos bancarios.

**Independent Test**: Confirmar que las pantallas públicas y autenticadas, los mensajes, el título de la página y los nombres accesibles usan Plata First; que el monograma es PF; que no quedan referencias actuales a Mi Plata; y que registro, autenticación y operaciones mantienen su funcionamiento.

### Implementation for User Story 1

- [X] T002 [P] [US1] Cambiar el título de la pestaña a `Plata First | Sistema Bancario` en `index.html`.
- [X] T003 [P] [US1] Sustituir las referencias actuales de marca en encabezado, presentación, historia, panel, pie de página y nombres accesibles, y cambiar el monograma de MP a PF en `src/ui/PaginaInicio.mjs`.
- [X] T004 [P] [US1] Actualizar el encabezado de registro para que identifique la aplicación como Plata First en `src/ui/Registro.mjs`.
- [X] T005 [P] [US1] Actualizar el mensaje de error de inicialización para que identifique la aplicación como Plata First en `src/main.mjs`.

### Validation for User Story 1

- [X] T006 [P] [US1] Buscar `Mi Plata` y `mi plata` en `index.html`, `src/` y `.specify/memory/constitution.md`; confirmar cero referencias actuales y no modificar las especificaciones históricas `specs/001-sistema-bancario/` a `specs/006-identificar-cuentas-transferencia/`.
- [X] T007 [P] [US1] Ejecutar `node --test` sobre `tests/` y confirmar que las pruebas existentes de registro y validación pasan sin cambios en los flujos bancarios.
- [ ] T008 [P] [US1] Servir `index.html`, comprobar la identidad visible y accesible en portada, registro y panel, y validar navegación, registro, inicio de sesión y operaciones a 1280, 768 y 375 píxeles; confirmar legibilidad y ausencia de solapamientos en `src/ui/PaginaInicio.mjs`, `src/ui/Registro.mjs` y `styles/styles.css`.

**Checkpoint**: La identidad Plata First está completa y la historia se valida de forma independiente sin alterar el comportamiento bancario.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Verificar que la entrega se mantenga dentro del alcance aprobado.

- [ ] T009 Revisar los cambios de `.specify/memory/constitution.md`, `index.html`, `src/main.mjs`, `src/ui/PaginaInicio.mjs` y `src/ui/Registro.mjs`; confirmar que no hay cambios en `src/models/`, `src/services/`, `src/storage/` ni en las especificaciones históricas `specs/001-sistema-bancario/` a `specs/006-identificar-cuentas-transferencia/`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No requiere tareas; la estructura y las herramientas ya existen.
- **Foundational (Phase 2)**: T001 debe completarse antes de modificar las referencias de marca en el código, de acuerdo con el plan constitucional.
- **User Story 1 (Phase 3)**: T002-T005 dependen de T001. Tras completar esos cambios, T006-T008 pueden ejecutarse en paralelo.
- **Polish (Phase 4)**: T009 depende de completar T001-T008.

### User Story Dependencies

- **User Story 1 (P1)**: Depende de T001; no depende de otras historias.

### Parallel Opportunities

- **Después de T001**: T002, T003, T004 y T005 pueden realizarse en paralelo porque modifican archivos distintos.
- **Después de T002-T005**: T006, T007 y T008 son validaciones independientes y pueden ejecutarse en paralelo.
- **T009** se realiza al final, una vez completados los cambios y sus validaciones.

## Parallel Example: User Story 1

```text
# Después de T001, distribuir los cambios independientes:
T002: actualizar el título en index.html
T003: actualizar marca, monograma y contenido en src/ui/PaginaInicio.mjs
T004: actualizar el encabezado en src/ui/Registro.mjs
T005: actualizar el error de inicialización en src/main.mjs

# Después de T002-T005, validar en paralelo:
T006: buscar referencias activas al nombre anterior
T007: ejecutar node --test
T008: revisar los flujos y la presentación responsive en navegador
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar T001 para registrar la identidad autorizada en la constitución.
2. Completar T002-T005 para actualizar los puntos de contacto vigentes.
3. Completar T006-T008 y detenerse si alguna verificación falla.
4. Completar T009 para confirmar que los datos bancarios y los artefactos históricos no cambiaron.

La única historia P1 representa el MVP completo; dividirla dejaría referencias de marca inconsistentes.

### Incremental Delivery

1. Actualizar la constitución y, después, los cuatro archivos de aplicación independientes.
2. Validar que no queden referencias activas al nombre anterior y ejecutar las pruebas existentes.
3. Comprobar visualmente los flujos principales en escritorio, tableta y móvil.
4. Revisar que el alcance no haya alcanzado servicios, modelos, almacenamiento ni especificaciones históricas.

## Notes

- Cada tarea usa el formato requerido: checkbox, ID secuencial, etiquetas aplicables y ruta concreta.
- `[P]` indica tareas sin dependencia pendiente que trabajan en archivos distintos o validaciones independientes.
- Las historias futuras no aplican: la especificación contiene una sola historia de usuario.