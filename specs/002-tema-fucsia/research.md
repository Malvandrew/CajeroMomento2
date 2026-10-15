# Research: Tema Fucsia y Texto Blanco

## Current UI Findings

Verified in the existing `styles/styles.css`:

- Root tokens currently define dark ink/muted text, light page/surface backgrounds, teal brand buttons, semantic status colors, and a gold focus outline.
- Primary, secondary, navigation, and danger buttons currently use different backgrounds/text colors; inputs/selects are white with dark text; tables inherit dark text; status messages use semantic colored text on pale backgrounds.
- Existing desktop/tablet/mobile breakpoints, visible focus outline, and reduced-motion handling should be retained.
- UI modules use CSS classes and semantic markup; the color feature does not require changing HTML, banking services, or domain data.

## Decisions

### Fuchsia color and white contrast

- **Decision**: Use `#B400B4` as the shared fuchsia button/background token with `#FFFFFF` labels. Retain the same fuchsia family for hover/pressed states and use border/shape/outline changes, not text-color changes, for interaction feedback.
- **Rationale**: This is visibly fuchsia while providing more margin than a brighter magenta for white text.
- **Contrast**: WCAG sRGB relative-luminance calculation gives white on `#B400B4` as **5.83:1**, exceeding the 4.5:1 normal-text threshold. White on proposed dark surfaces `#16151A` and `#242329` is above 15:1. These values are reproducible with the standard sRGB gamma correction and `(Llighter + 0.05) / (Ldarker + 0.05)` formula.
- **Alternatives considered**: `#CC00CC` calculates to 4.73:1, a smaller margin; `#A0006B` calculates to 7.76:1 but is closer to a dark berry than the selected vivid fuchsia.

### White text across all components

- **Decision**: Set the root/default text token to white and explicitly keep links, labels, fields, placeholders, table headers/cells, numeric outputs, and message text white. Set page, panel, field, and message backgrounds to dark colors that pass the SPEC's contrast thresholds.
- **Rationale**: Merely changing the root text color while retaining white inputs and pale status backgrounds would make white text unreadable; component backgrounds must be coordinated with foregrounds.
- **Alternatives considered**: Keeping light surfaces with white text fails the SPEC and contrast acceptance criteria.

### Buttons and semantic states

- **Decision**: Apply the fuchsia fill/white label rule to primary, secondary, danger, navigation, and form buttons, including disabled buttons. Keep focus visible with the existing gold outline. Distinguish disabled and pressed states with non-color cues such as border style, cursor, inset/position treatment, or an explicit state label; keep success/error/warning text white and preserve their semantic borders/labels.
- **Rationale**: The requested uniform button palette must not erase keyboard focus, disabled state, or status meaning.
- **Alternatives considered**: Leaving secondary/danger buttons in their previous colors conflicts with "todos los botones fucsia"; fading disabled text can make it cease to be white or reduce contrast.

### Scope and testing

- **Decision**: Update CSS tokens/rules only in `styles/styles.css`; do not change markup, text, navigation, banking behavior, storage, or dependencies.
- **Rationale**: Current UI uses reusable global tokens and component classes, so the visual goal can be achieved in the existing stylesheet.
- **Alternatives considered**: Per-component markup changes create unnecessary duplication and increase behavior-regression risk.
- **Validation**: Inspect every view and interaction state in `quickstart.md`; measure representative text/background pairs and verify responsive overflow in browser.

## Data Model

No entities, fields, persistence, or banking state transitions change in this feature.
