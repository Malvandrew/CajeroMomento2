# Visual UI Contract: Tema Fucsia y Texto Blanco

## Palette

- Every enabled and disabled button uses the shared fuchsia `#B400B4` background and white `#FFFFFF` label.
- All visible text and numeric values are white, including headings, labels, links, fields, placeholders, balances, limits, installments, counters, tables, and feedback.
- Page, panel, field, and message surfaces use dark backgrounds as needed to maintain white-text contrast.
- Normal text/background pairs meet at least 4.5:1 contrast. Large text and control indicators meet at least 3:1.

## Components and States

- Primary, secondary, danger, navigation, form, and dialog buttons follow the same fuchsia/white rule.
- Hover/pressed states remain in the fuchsia family and preserve white labels.
- Keyboard focus remains visible with a distinct outline; it is not communicated by color alone.
- Disabled buttons retain the fuchsia fill and white label and use an additional non-color cue such as a distinct border style and disabled cursor; no opacity reduction may make the label appear non-white or fail contrast.
- Success, error, warning, and informational messages use white text on dark, contrast-checked surfaces; their meaning remains distinct through a semantic label, icon, or border treatment in addition to color.
- Form placeholders and validation feedback remain white and distinguishable from entered values through typography, labels, and field borders.
- Tables retain visible row/column structure, readable white header/cell text, and horizontal scrolling where needed on narrow screens.

## Scope Invariants

- Preserve existing content, component order, navigation, responsive behavior, form behavior, banking rules, and persistence.
- Do not add data, application logic, markup dependencies, assets, fonts, or packages.
- Apply the theme consistently to landing, registration, sign-in, account, transfer, profile, card, movement, and dialog states.
