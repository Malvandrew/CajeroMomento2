# Tasks: Tema Fucsia y Texto Blanco

**Input**: Design documents from `specs/002-tema-fucsia/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [contracts/ui.md](contracts/ui.md), [quickstart.md](quickstart.md)

**Tests**: Automated test tasks are omitted because this is a CSS-only change and the SPEC requests manual browser/contrast validation.

**Organization**: Tasks are grouped by user story. All implementation work modifies the same stylesheet and must run sequentially.

## Format: `[ID] [P?] [Story] Description`

- `[P]` marks work that can run in parallel on different files with no dependency.
- `[USn]` maps work to a story in `spec.md`.
- Every task names the exact file path to change or validate.

## Phase 1: Setup

**Purpose**: Confirm current color ownership before changing the shared palette.

- [X] T001 Inventory the root color tokens and component selectors covered by the visual contract in `styles/styles.css`.

---

## Phase 2: Foundational Theme Tokens

**Purpose**: Define accessible shared foreground, surface, fuchsia, status, border, and focus tokens.

- [X] T002 Add the theme tokens in `styles/styles.css`, including fuchsia `#B400B4`, white text, dark page/surface/field/message backgrounds, semantic status surfaces, borders, and focus color; preserve the WCAG 4.5:1 normal-text and 3:1 large-text/control-indicator thresholds.

**Checkpoint**: Shared tokens are available before applying them to stories.

---

## Phase 3: User Story 1 - Read and Use the New Palette (Priority: P1)

**Goal**: All Mi Plata views show fuchsia buttons and white text/numbers while preserving layout and existing operations.

**Independent Test**: Inspect landing, registration, sign-in, account panel, transfer, profile, card, movement history, forms, and dialogs; confirm every button is fuchsia with a white label and all visible text/numeric values are white and readable.

- [X] T003 [US1] Apply the shared fuchsia fill and white label to every button selector, including primary, secondary, danger, navigation, form, and dialog buttons, without changing button actions in `styles/styles.css`.
- [X] T004 [US1] Apply white text and contrast-checked dark backgrounds to page, panel, form, input/select, link, heading, label, table, numeric output, and status-message selectors in `styles/styles.css`.

**Checkpoint**: Every view and component uses the requested palette and existing navigation/operations still work.

---

## Phase 4: User Story 2 - Distinguish Interaction States (Priority: P2)

**Goal**: Customers can still recognize keyboard focus, disabled controls, and success/error/warning states with the uniform palette.

**Independent Test**: Tab through all buttons and fields, inspect hover/pressed/disabled states, and trigger success, error, and warning messages; verify white text and at least one non-color cue for each state.

- [X] T005 [US2] Preserve visible keyboard focus and add non-color distinctions for hover, pressed, and disabled buttons while retaining fuchsia backgrounds and white labels in `styles/styles.css`.
- [X] T006 [US2] Restyle info/success/error/warning message backgrounds and borders so text remains white and status type remains distinguishable beyond color in `styles/styles.css`.

---

## Phase 5: Polish & Cross-Cutting Validation

**Purpose**: Verify responsive behavior and objective contrast requirements without changing business behavior.

- [X] T007 Check white/fuchsia and white/surface contrast ratios, desktop/tablet/mobile overflow, readable tables, and all interaction states by following `specs/002-tema-fucsia/quickstart.md`; make any necessary visual-only correction in `styles/styles.css`.
- [X] T008 Confirm registration, sign-in, account operations, and navigation still behave identically before and after the theme update using the scenarios in `specs/002-tema-fucsia/quickstart.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on T001 and provides tokens for all user-story tasks.
- **US1 (Phase 3)**: Depends on T002.
- **US2 (Phase 4)**: Depends on US1 because its interaction/message states extend the shared palette.
- **Polish (Phase 5)**: Depends on both user stories.

### User Story Dependencies

- **US1 (P1)**: Begins after theme tokens; no dependency on another story.
- **US2 (P2)**: Follows US1; it preserves the new palette while adding accessible interaction and status distinctions.

### Parallel Opportunities

- None for implementation tasks: all changes touch `styles/styles.css`. Keep them sequential to avoid conflicting selector/token edits.

## Implementation Strategy

### MVP First

1. Complete T001 and T002.
2. Complete US1 tasks T003-T004 and validate the primary palette across all views.
3. Complete US2 tasks T005-T006 before considering the theme ready, so disabled/focus/status states remain accessible.

### Incremental Delivery

1. Apply the fuchsia/white palette and dark contrast-safe surfaces.
2. Add state distinctions and semantic message treatments.
3. Run the full visual and regression checklist in `quickstart.md`.
