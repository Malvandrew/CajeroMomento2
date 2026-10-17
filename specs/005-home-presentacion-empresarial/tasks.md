---
description: "Task list for home presentation and carousel"
---

# Tasks: Presentación Empresarial e Historia de Mi Plata

**Input**: Design documents from `specs/005-home-presentacion-empresarial/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui.md](contracts/ui.md), [quickstart.md](quickstart.md)

**Tests**: No automated test-code tasks are added because the SPEC does not request them and the repository has no DOM test environment. Validate the interactive UI using the browser scenarios in `quickstart.md`.

**Organization**: Tasks are grouped by the two user stories in priority order. US1 delivers the P1 presentation and carousel; US2 adds the P2 academic credit.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Tasks use separate files and have no unfinished dependencies.
- **[Story]**: Maps a task to its user story in `spec.md`.
- Every task identifies the exact project file to create or change.

## Phase 1: Setup

**Purpose**: Prepare project initialization and tooling.

No setup tasks are required. The existing web application, responsive styles, and browser module structure are sufficient; no dependencies or configuration are added.

---

## Phase 2: Foundational

**Purpose**: Complete shared blocking infrastructure before user stories.

No separate foundational tasks are required. The carousel state is local to the home view, and the footer uses existing markup and styles.

---

## Phase 3: User Story 1 - Conocer la identidad y trayectoria de Mi Plata (Priority: P1) MVP

**Goal**: Present Mi Plata as an academic digital bank focused on user satisfaction and let visitors browse the three historical milestones in a manually controlled circular carousel.

**Independent Test**: Open the public home, verify the presentation and three milestones, advance from the last slide to the first and back from the first to the last, identify the current slide, and confirm the existing navigation and products remain available.

### Implementation for User Story 1

- [X] T001 [P] [US1] Update the carousel in `src/ui/PaginaInicio.mjs` to use `<` and `>` buttons with accessible names and autoplay every two seconds via one cancellable `setTimeout`; pause while the pointer is over the carousel or keyboard focus is inside, resume only when both have left after a fresh two-second delay, and make manual navigation immediate while restarting that delay. Preserve circular navigation, current-slide position, and existing `data-view`/`data-navegar` behavior without creating overlapping timers.
- [X] T002 [P] [US1] Add responsive styles for `.business-presentation`, `.story-carousel`, `.story-slide`, and `.story-carousel__controls` in `styles/styles.css`; use existing breakpoints and verify 1280, 768, and 375 CSS-pixel layouts have no clipping, overlap, or horizontal overflow and do not rely on animation to convey slide content.

**Checkpoint**: Visitors can read the presentation and use the accessible three-slide carousel without signing in, while existing home actions and products remain intact.

---

## Phase 4: User Story 2 - Consultar los créditos académicos (Priority: P2)

**Goal**: Show the requested CESDE, FrontEnd1, and teacher credit in the existing footer while preserving the academic-simulation notice and social links.

**Independent Test**: Open the home and verify the exact credit text, the existing “Mi Plata · Simulación académica” notice, and working social links; confirm the credit wraps readably on mobile and desktop.

### Implementation for User Story 2

- [X] T003 [P] [US2] Add the exact text “Desarrollo para el segundo momento CESDE, materia FrontEnd1, Docente Beautyful Albeiro.” to the existing footer in `src/ui/PaginaInicio.mjs`; retain the simulation notice and social navigation.
- [X] T004 [P] [US2] Add footer-credit layout styles for `.site-footer__credits` in `styles/styles.css` so the full requested text wraps without clipping or horizontal overflow at desktop, tablet, and mobile widths while preserving the existing footer layout.

**Checkpoint**: The academic credits appear alongside, not instead of, the existing simulation notice and social links.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validate both stories together and guard existing home behavior.

- [X] T005 Run `node --test tests/*.test.mjs` and complete the browser scenarios in `specs/005-home-presentacion-empresarial/quickstart.md`; verify two-second autoplay, pointer/focus pauses, full-delay resume, manual timer reset, circular navigation, visible `<`/`>` controls and accessible names, current-slide identification, required copy, exact footer credit, 1280/768/375 pixel layouts, and unchanged navigation/products.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No tasks; no project initialization or new tooling is needed.
- **Foundational (Phase 2)**: No tasks; no shared infrastructure blocks either story.
- **User Story 1 (Phase 3)**: No dependency on other stories; this is the P1 MVP.
- **User Story 2 (Phase 4)**: Independent in behavior, but scheduled after US1 by priority. Its content and styles use the same two files as US1, so only separate-file tasks can run concurrently after their US1 edits are complete.
- **Polish (Phase 5)**: Depends on completion of both user stories.

### User Story Dependencies

- **User Story 1 (P1)**: Can start immediately; no dependencies on other stories.
- **User Story 2 (P2)**: Has no data dependency on US1; implement after the P1 phase to respect priority and avoid same-file conflicts.

### Within Each User Story

- T001 and T002 can run in parallel because they change separate files and the task specifies the shared CSS class names.
- T003 and T004 can run in parallel after Phase 3 because they change separate files.
- T005 runs after both stories are complete.

### Parallel Opportunities

- Parallel group 1: T001 (home markup and carousel interaction) with T002 (carousel responsive styles).
- Parallel group 2, after US1: T003 (footer text) with T004 (footer-credit styles).

## Parallel Example: User Story 1

```text
Parallel group 1:
Task: T001 - Add presentation and carousel in src/ui/PaginaInicio.mjs
Task: T002 - Style presentation and carousel in styles/styles.css
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001 and T002 in parallel.
2. Verify US1 using its independent test and the carousel scenarios in `quickstart.md`.
3. Stop at the US1 checkpoint if only the P1 presentation and history carousel are required.

### Incremental Delivery

1. Deliver US1 as the public presentation and circular carousel MVP.
2. Add US2 footer credits without replacing existing footer content.
3. Run T005 to validate both stories, responsive behavior, and unchanged navigation.

## Notes

- Task IDs are sequential; each task uses a checkbox, ID, applicable `[P]`/`[US#]` labels, and exact file paths.
- No model, service, storage, dependency, or automated DOM test tasks are needed for this static home feature.
- The carousel autoplays every two seconds and remains circular; pause/resume must use one timer without overlapping callbacks. Never derive the editorial customer milestone from local data.