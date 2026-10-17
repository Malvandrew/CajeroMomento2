---
description: "Task list for registration data validation"
---

# Tasks: Validaciones de Datos en el Registro

**Input**: Design documents from `specs/004-validaciones-registro/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui.md](contracts/ui.md), [quickstart.md](quickstart.md)

**Tests**: Included because the SPEC defines independent test criteria and acceptance scenarios; use the built-in `node:test` runner without adding dependencies.

**Organization**: Tasks are grouped by user story so the P1 registration journey can be implemented and validated as an MVP.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because tasks use different files and have no unfinished dependencies.
- **[Story]**: Maps each story task to its user story in `spec.md`.
- Every task description identifies the exact file path to create or change.

## Phase 1: Setup

**Purpose**: Prepare project initialization and tooling.

No setup tasks are required. The repository already has the JavaScript module structure and Node.js test runner; this feature adds no dependencies or project configuration.

---

## Phase 2: Foundational

**Purpose**: Complete blocking infrastructure before user-story work.

No separate foundational tasks are required. The shared validator is specific to the registration story and belongs in that story's implementation phase.

---

## Phase 3: User Story 1 - Validar datos personales durante el registro (Priority: P1) MVP

**Goal**: Accept names containing only letters and spaces, and identification/mobile values containing only digits; show field feedback on blur and submit; prevent invalid customer data from being persisted.

**Independent Test**: Complete registration using a name with accents, ñ and spaces plus digit-only identification and mobile values, including leading zeroes. Verify invalid characters are reported on blur and submit, correction clears the relevant error, and invalid data never creates a customer or products.

### Tests for User Story 1

- [X] T001 [P] [US1] Add validator tests in `tests/validacionRegistro.test.mjs` asserting `nombreCompleto`: "Solo letras Unicode y espacios; acepta tildes y ñ." and `numeroIdentificacion` and `celular`: "Solo dígitos del 0 al 9; conserva ceros iniciales."; cover rejected punctuation, digits in names, letters/separators in numeric fields, and accepted leading zeroes.
- [X] T002 [P] [US1] Add direct-service tests in `tests/servicioAutenticacionRegistro.test.mjs` asserting `nombreCompleto`: "Solo letras Unicode y espacios; acepta tildes y ñ." and `numeroIdentificacion` and `celular`: "Solo dígitos del 0 al 9; conserva ceros iniciales."; verify invalid raw values (including surrounding spaces in numeric fields) do not call storage save or create products.

### Implementation for User Story 1

- [X] T003 [US1] Implement the shared pure rules in `src/utils/ValidacionRegistro.mjs`: `nombreCompleto` must be "Solo letras Unicode y espacios; acepta tildes y ñ."; `numeroIdentificacion` and `celular` must each be "Solo dígitos del 0 al 9; conserva ceros iniciales."; empty values remain subject to existing required-field validation and no length limits are added.
- [X] T004 [US1] Update `src/services/ServicioAutenticacion.mjs` to validate original registration values before trimming, client/product creation, or persistence; enforce `nombreCompleto`: "Solo letras Unicode y espacios; acepta tildes y ñ." and `numeroIdentificacion` and `celular`: "Solo dígitos del 0 al 9; conserva ceros iniciales."; preserve existing required-field and uniqueness checks.
- [X] T005 [P] [US1] Update `src/ui/Registro.mjs` to use `src/utils/ValidacionRegistro.mjs` on blur and submit, show all applicable field-associated accessible errors, clear or update an error after correction and blur, and avoid calling registration when any character rule fails; enforce `nombreCompleto`: "Solo letras Unicode y espacios; acepta tildes y ñ." and `numeroIdentificacion` and `celular`: "Solo dígitos del 0 al 9; conserva ceros iniciales.".

**Checkpoint**: The registration journey accepts valid personal data, gives the specified feedback, and rejects invalid data before persistence.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Verify the completed story against its runnable guide and existing registration behavior.

- [X] T006 Run `node --test tests/validacionRegistro.test.mjs tests/servicioAutenticacionRegistro.test.mjs` and complete the browser scenarios in `specs/004-validaciones-registro/quickstart.md`; confirm valid registration, correction feedback, invalid-submit rejection, no persisted customer/products for invalid input, and unchanged required-field and duplicate checks.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No tasks; no project initialization or new tooling is needed.
- **Foundational (Phase 2)**: No separate tasks; no shared infrastructure blocks the story.
- **User Story 1 (Phase 3)**: Starts after the design artifacts are available; it is the only story and has no dependency on another story.
- **Polish (Phase 4)**: Depends on completion of all User Story 1 implementation tasks.

### User Story Dependencies

- **User Story 1 (P1)**: Independent MVP; no other user stories exist in this feature.

### Within User Story 1

- T001 and T002 create focused tests before implementation and can run in parallel.
- T003 implements the shared rules after T001 establishes their expected behavior.
- T004 depends on T002 and T003; it validates raw values before normalization and persistence.
- T005 depends on T003 and can run in parallel with T004 after T003 is complete.
- T006 runs after T004 and T005.

### Parallel Opportunities

- T001 and T002 can run concurrently because they create separate test files.
- After T002 and T003 are complete, T004 and T005 can run concurrently because they change separate service and UI files.

## Parallel Example: User Story 1

```text
Parallel group 1:
Task: T001 - Add validator tests in tests/validacionRegistro.test.mjs
Task: T002 - Add direct-service tests in tests/servicioAutenticacionRegistro.test.mjs

After T003 (and T002) complete:
Task: T004 - Validate before persistence in src/services/ServicioAutenticacion.mjs
Task: T005 - Add blur/submit feedback in src/ui/Registro.mjs
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete the focused validator and service tests (T001-T002).
2. Implement the shared validation rules (T003).
3. Integrate service-side rejection and UI feedback (T004-T005).
4. Run automated and browser validation (T006).

### Incremental Delivery

The feature has one user story. Deliver it as a single independently testable increment; do not expand into profile editing, new data fields, or other registration rules.

## Notes

- Task IDs are sequential and every task follows `- [ ] T### [P?] [US1] Description with file path` for story tasks; the final polish task intentionally has no story label.
- `[P]` marks only tasks on separate files with no unfinished dependencies.
- No test framework or dependency installation is required.