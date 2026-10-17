# Visual UI Contract: Fichas de Productos en el Landing

## Product Section

- The landing view contains one clearly titled section grouping the three available products.
- The section has a visible fuchsia frame using the existing `#B400B4` theme token.
- The section uses a dark page surface so the fuchsia frame remains distinguishable; product text remains white.

## Product Cards

- The section contains exactly three individually distinguishable, informational cards: Cuenta de ahorros, Cuenta corriente, and Tarjeta de crédito.
- Each card displays its product name as a heading and one brief description from `spec.md`.
- Cards are not buttons or links and do not add navigation or actions.
- Descriptions wrap naturally; text is not clipped or line-clamped.
- Dark card surfaces, white text, and visible separators match the existing fuchsia theme and maintain readable contrast.

## Responsive Behavior and Invariants

- The existing landing composition is preserved; cards remain stacked within its narrow secondary column and the landing itself continues to stack at the existing mobile breakpoint.
- All three cards remain visible and readable at desktop (1280 CSS px), tablet (768 CSS px), and mobile (375 CSS px) widths, without overlap, clipping, or page-level horizontal overflow.
- Existing navigation, calls to action, banking behavior, and persistence are unchanged.
