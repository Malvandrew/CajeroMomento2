# Tasks: Fichas de Productos en el Landing

**Input**: Design documents from `specs/003-fichas-productos/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui.md](contracts/ui.md), [quickstart.md](quickstart.md)

**Tests**: No automated test tasks are included because the SPEC does not request TDD or an automated test suite; validation is manual as described in `quickstart.md`.

**Organization**: One P1 user story; markup and styling use separate files and share the explicit product-card class names below.

## Format: `[ID] [P?] [Story] Description`

- `[P]` means tasks touch different files and can proceed independently.
- `[US1]` maps implementation tasks to the user story in `spec.md`.
- Every task names the exact file paths to change or validate.

## Phase 1: Setup

**Purpose**: Confirm the existing landing renderer and theme selectors before making the scoped UI change.

- [X] T001 Inventory the product section markup and landing theme selectors in `src/ui/PaginaInicio.mjs` and `styles/styles.css` against `specs/003-fichas-productos/contracts/ui.md`.

---

## Phase 2: Foundational

**Purpose**: Confirm shared prerequisites for the story.

No blocking foundational implementation is needed: the existing landing renderer, fuchsia theme tokens, static content, and responsive breakpoints are reused.

---

## Phase 3: User Story 1 - Consultar productos desde el landing (Priority: P1) - MVP

**Goal**: Visitors can identify the three current banking products and understand each product's purpose from a fuchsia-framed section of compact, non-interactive cards.

**Independent Test**: Open the landing and confirm the titled section shows exactly three individually distinguishable product cards, each with the approved name and short description, legible at desktop, tablet, and mobile widths, while existing navigation remains unchanged.

### Implementation for User Story 1

- [X] T002 [P] [US1] Replace the plain product list with a semantic titled section and three static list items in `src/ui/PaginaInicio.mjs`; use `.product-list`, `.product-card`, `.product-card__title`, and `.product-card__description` for the agreed selectors, and use the descriptions in `specs/003-fichas-productos/spec.md`.
- [X] T003 [P] [US1] Style `.landing-aside`, `.product-list`, `.product-card`, `.product-card__title`, and `.product-card__description` in `styles/styles.css` with the existing fuchsia frame and dark/white theme; keep cards stacked in the narrow secondary column and preserve the existing mobile breakpoint.

**Checkpoint**: The product section displays the three accurate descriptions as static cards without changing the surrounding landing composition.

---

## Phase 4: Polish & Cross-Cutting Validation

**Purpose**: Verify responsive usability, visual contract, and unchanged landing behavior.

- [X] T004 Validate the product section and cards at 1280, 768, and 375 CSS px using `specs/003-fichas-productos/quickstart.md`; confirm the fuchsia frame is distinguishable, descriptions wrap without clipping, card borders remain visible, and the page has no horizontal overflow in `styles/styles.css`.
- [X] T005 Verify the three cards are not interactive and header navigation plus landing calls to action retain their existing destinations in `src/ui/PaginaInicio.mjs`, following `specs/003-fichas-productos/quickstart.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001 has no dependencies.
- **Foundational (Phase 2)**: No tasks; existing shared infrastructure is sufficient.
- **User Story 1 (Phase 3)**: T002 and T003 depend on T001 and can run in parallel because they touch different files and share the class names specified in both task descriptions.
- **Polish (Phase 4)**: T004 and T005 run after T002 and T003; keep validation sequential so any necessary correction is verified before the next check.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after T001; it is the only story and has no dependency on another story.

### Parallel Opportunities

- T002 (markup in `src/ui/PaginaInicio.mjs`) and T003 (styles in `styles/styles.css`) can run in parallel after T001 because the shared selectors are explicit.
- No parallel opportunities are identified for the final browser validation tasks.

## Parallel Example: User Story 1

```text
Task: T002 Replace the product list with the semantic product section and cards in src/ui/PaginaInicio.mjs using the agreed product-card selectors.
Task: T003 Style the product section and agreed product-card selectors in styles/styles.css.
```

## Implementation Strategy

### MVP First

1. Complete T001.
2. Complete T002 and T003; these can proceed in parallel.
3. Validate the P1 story independently with T004 and T005.

### Incremental Delivery

1. Deliver the three static product cards and fuchsia-framed section as the single MVP story.
2. Complete responsive and navigation regression checks before considering the feature ready.
