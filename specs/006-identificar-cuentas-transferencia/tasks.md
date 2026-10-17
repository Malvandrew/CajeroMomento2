---
description: "Task list for identifying account holders in transfers"
---

# Tasks: Identificar Titulares en Transferencias

**Input**: Design documents from `specs/006-identificar-cuentas-transferencia/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui.md](contracts/ui.md), [quickstart.md](quickstart.md)

**Tests**: No automated test-code tasks are added because the SPEC does not explicitly request them and the repository has no transfer-test or DOM harness. T003 runs the existing suite and browser scenarios.

**Organization**: The single P1 user story covers both account lists and preserves existing transfer behavior.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Tasks can run in parallel because they change different files and share a defined data contract.
- **[Story]**: Maps a task to the user story in `spec.md`.
- Every task description identifies the exact project file to change or validate.

## Phase 1: Setup

**Purpose**: Prepare project initialization and tooling.

No setup tasks are required. The existing application, local storage, and test runner are sufficient; this feature adds no dependencies or configuration.

---

## Phase 2: Foundational

**Purpose**: Complete shared infrastructure before user-story work.

No separate foundational tasks are required. Titular lookup is limited to the transfer-list service methods.

---

## Phase 3: User Story 1 - Identificar las cuentas antes de transferir (Priority: P1) MVP

**Goal**: Show the account type, existing account number, and full account-holder name for every eligible source and destination option without changing selection or transfer behavior.

**Independent Test**: In the transfer view, verify that both lists show type, the current account-number display, and the full name of the correct holder. Select source and destination options and confirm each still resolves to the original product ID and valid/invalid transfers retain their existing results.

### Implementation for User Story 1

- [X] T001 [P] [US1] Update `listarCuentasOrigen` and `listarCuentasDestino` in `src/services/ServicioTransferencias.mjs` to resolve and return `nombreCompleto` from the customer whose `id` matches each product's `clienteId`; preserve current filters, ordering, `id`, `tipo`, `nombre`, and source balance fields; show only `nombreCompleto` and do not return `usuario`, identification, cellphone, or password.
- [X] T002 [P] [US1] Update option labels in `src/ui/Transferencias.mjs` to show product type, the existing six-character account-ID suffix, and `nombreCompleto` in that order for both source and destination lists; preserve each option's full product ID as `value`, and retain the current destination refresh behavior when the source changes.

**Checkpoint**: Both lists distinguish account holders while selecting the same product IDs and leaving transfer rules unchanged.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Validate list contents, privacy scope, and transfer regressions.

- [X] T003 Run `node --test tests/*.test.mjs` and complete `specs/006-identificar-cuentas-transferencia/quickstart.md` in a test profile; verify source/destination names, duplicate names distinguished by account number, source-change refresh, valid transfer behavior, and readable labels at 1280, 768, and 375 pixels.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No tasks; no project initialization or dependency installation is needed.
- **Foundational (Phase 2)**: No tasks; no shared infrastructure blocks the story.
- **User Story 1 (Phase 3)**: Can start after design documents are available; it is the only story.
- **Polish (Phase 4)**: Depends on completion of T001 and T002.

### User Story Dependencies

- **User Story 1 (P1)**: Independent MVP; no other user stories exist in this feature.

### Within User Story 1

- T001 and T002 can run in parallel: T001 returns the documented `nombreCompleto` field; T002 consumes it in a separate file.
- T003 runs after both implementation tasks.

### Parallel Opportunities

- Parallel group 1: T001 (`src/services/ServicioTransferencias.mjs`) with T002 (`src/ui/Transferencias.mjs`).

## Parallel Example: User Story 1

```text
Parallel group 1:
Task: T001 - Return the titular full name for eligible products in src/services/ServicioTransferencias.mjs
Task: T002 - Display the titular name in source/destination options in src/ui/Transferencias.mjs
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001 and T002 in parallel.
2. Validate both account lists and unchanged selected IDs with the independent test for US1.
3. Run T003 to check existing regressions and the browser flow.

### Incremental Delivery

This feature contains one story. Deliver both account lists together so the source and destination use the same label information, then complete regression validation.

## Notes

- Task IDs are sequential, and each task follows the checklist format with a file path.
- `[P]` tasks use different files and do not depend on unfinished work in the other file.
- The complete account ID remains the option value; the visible number continues to be its existing six-character suffix.
- No model, persisted schema, transfer eligibility, balance rule, or movement record changes are included.