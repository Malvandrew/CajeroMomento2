# Quickstart: Fichas de Productos en el Landing

This presentational feature is validated in the existing static Mi Plata application after implementation.

## Prerequisites

- Serve the repository root over HTTP, for example:

```sh
python3 -m http.server 8000
```

- Open `http://localhost:8000/` in a browser.

## Visual Acceptance Checks

1. Inspect the landing at desktop width (1280 CSS px) and confirm a titled product section is enclosed by a visible fuchsia border.
2. Confirm the section contains exactly three individually framed, non-interactive cards: Cuenta de ahorros, Cuenta corriente, and Tarjeta de crédito.
3. Confirm each card shows its matching short description from `spec.md`; descriptions wrap naturally and are not clipped or truncated.
4. Confirm the fuchsia frame and the card borders are distinguishable on their dark surfaces, with white text readable against each card background.
5. Repeat at tablet (768 CSS px) and mobile (375 CSS px); confirm all three cards remain visible, legible, and free of overlap or clipping, with no page-level horizontal overflow.
6. Use the existing header navigation and landing calls to action; confirm their destinations and behavior have not changed.
7. Verify the cards do not appear or behave like buttons or links and do not introduce new product operations.

The product descriptions and presentation expectations are defined in [contracts/ui.md](contracts/ui.md). No data-model or persistence changes are expected.
