# Research: Fichas de Productos en el Landing

## Current UI Findings

- `src/ui/PaginaInicio.mjs` renders the three product names as a plain list inside `.landing-aside`.
- `.landing-view` places `.landing-aside` in a narrow secondary column on desktop and changes to one column below 760 CSS px.
- `styles/styles.css` already defines the active palette: fuchsia `--brand: #b400b4`, page background `--paper: #16151a`, card/surface background `--surface: #242329`, white foreground `--ink`, and separator `--line: #77727d`.
- The existing fuchsia has 3.11:1 contrast against `--paper`; white has 15.59:1 against `--surface`. The separator has 3.33:1 against `--surface`.
- The product cards are static informational content; no product-selection or navigation action is required.

## Decisions

### Product section and frame

- Decision: Reuse `.landing-aside` as a clearly labeled product section with a 2px fuchsia frame using the existing `--brand` token. Use the darker page background `--paper` inside the outer section so the fuchsia frame remains visually distinct; retain rounded corners consistent with the current UI.
- Rationale: This satisfies the requested grouping and fuchsia outline while reusing the established theme. The measured frame/background contrast is 3.11:1.
- Alternatives considered: A new full-width page section would disturb the existing hero composition; a new color token would duplicate the existing fuchsia palette.

### Product cards and layout

- Decision: Represent the products as a semantic list of three static, individually framed items, each with a product heading and one short description. Keep the list vertical in the existing narrow secondary column and allow text to wrap naturally.
- Rationale: A list communicates a set of related products, while non-interactive items avoid implying an action that the SPEC does not request. Vertical layout fits the existing column and preserves the hero layout on desktop; the existing mobile breakpoint stacks the landing content.
- Alternatives considered: A three-column card grid was rejected because the current secondary column is only about 240px wide. Clickable buttons/links were rejected because cards are informational and must not add navigation. Line clamping was rejected because it could hide required descriptions.

### Descriptions and visual hierarchy

- Decision: Use the three descriptions recorded in `spec.md`; render names as headings and descriptions as body text. Use dark `--surface` cards, white text, and the existing visible `--line` border to distinguish cards from the fuchsia-framed group.
- Rationale: This keeps copy consistent with the approved SPEC and current banking rules. The measured white/surface contrast is 15.59:1 and `--line`/surface contrast is 3.33:1.
- Alternatives considered: Adding rates, eligibility, or product actions would expand scope and risk contradicting banking rules; relying only on spacing or color would weaken card separation.

### Scope and validation

- Decision: Limit implementation to `src/ui/PaginaInicio.mjs` and `styles/styles.css`; validate manually at desktop, tablet, and mobile sizes and check that landing navigation remains unchanged.
- Rationale: The change is presentational and uses the current renderer, CSS tokens, and static site workflow; no dependencies, assets, stored data, or domain behavior are needed.
- Alternatives considered: Adding a component framework, product model, or automated test tooling would add complexity for three static descriptions without improving the feature's validation.
