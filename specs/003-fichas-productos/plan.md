# Implementation Plan: Fichas de Productos en el Landing

**Branch**: `003-fichas-productos` | **Date**: 2026-10-15 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/003-fichas-productos/spec.md`

## Summary

Present the three existing banking products inside a fuchsia-framed landing section, with one compact, informative card per product and a brief description. Reuse the current fuchsia/white visual theme and responsive landing layout. The expected source changes are limited to `src/ui/PaginaInicio.mjs` and `styles/styles.css`; no banking logic, data, navigation, assets, or dependencies are added.

## Technical Context

**Language/Version**: HTML5 and CSS3; existing browser-native JavaScript ES modules render the landing view.

**Primary Dependencies**: None; reuse existing markup conventions and CSS custom properties.

**Storage**: N/A; product names and descriptions are static presentation content.

**Testing**: Manual browser validation using `quickstart.md`; inspect desktop, tablet, and mobile layouts plus existing landing navigation. No automated test framework is present or required for this presentation-only feature.

**Target Platform**: Existing desktop, tablet, and mobile browser views of Mi Plata.

**Project Type**: Existing static client-side web application.

**Performance Goals**: No measurable runtime change; three static product cards and no new assets or scripts.

**Constraints**: The section frame uses the existing fuchsia token `#B400B4`; product names and short descriptions remain white and readable on dark surfaces. Preserve all current product names, navigation, landing actions, responsive behavior, banking rules, data, and persistence. Product cards are informative and non-interactive.

**Scale/Scope**: One landing section containing three existing products; only `src/ui/PaginaInicio.mjs` and `styles/styles.css` are expected to change.

## Constitution Check

*Gate: Pass before Phase 0 research; re-check after Phase 1 design.*

- **Spec-First Development**: A dedicated SPEC and completed requirements checklist define scope, scenarios, requirements, and measurable outcomes.
- **Object-Oriented Domain Model**: No domain classes, services, or event behavior change; the work is limited to static presentation content and styles.
- **Banking Rules First**: Descriptions use qualified language and do not redefine rates, limits, eligibility, or operations.
- **Local Storage Only**: No persistence or stored data changes.
- **Learning-Centered Simplicity**: Reuse the existing landing component and CSS tokens; add no framework, package, or abstraction.
- **User Experience**: Keep the existing fuchsia/white theme, visible content, and navigation responsive and readable.

**Gate result before Phase 0**: PASS. No constitutional deviation or unresolved clarification is identified.

## Project Structure

### Documentation (this feature)

```text
specs/003-fichas-productos/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── contracts/
│   └── ui.md
└── quickstart.md
```

### Source Code

```text
src/ui/PaginaInicio.mjs   # Landing product names and descriptions
styles/styles.css         # Product section frame and card presentation
```

**Structure Decision**: Reuse the existing landing renderer and shared stylesheet. Keep the outer product section on the darker page surface so the fuchsia frame remains distinguishable; use dark surface backgrounds for the three individual product cards. Do not change the application shell, business services, or domain data.

## Complexity Tracking

No constitutional violations, new projects, dependencies, or domain entities are introduced.

## Post-Design Constitution Check

The Phase 1 artifacts preserve the no-domain-change boundary, static content scope, responsive usability, and existing navigation. **Gate result: PASS.**
