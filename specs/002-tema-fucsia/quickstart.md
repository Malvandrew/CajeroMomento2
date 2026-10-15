# Quickstart: Tema Fucsia y Texto Blanco

This visual change is validated in the existing static Mi Plata application after implementation.

## Prerequisites

- Serve the repository root over HTTP so native ES modules load, for example:

```sh
python3 -m http.server 8000
```

- Open `http://localhost:8000` in a browser with the existing local test profile. Do not enter real banking credentials; the current academic application may retain readable passwords.

## Visual Acceptance Checks

1. Inspect the landing page, registration, sign-in, account panel, transfer, profile, card, movement history, and success/error/warning messages.
2. Confirm every primary, secondary, danger, navigation, and form button has a fuchsia background with a white label, including hover, pressed, and disabled states.
3. Confirm every visible heading, paragraph, label, link, input value/placeholder, balance, credit limit, installment amount, table cell, counter, and status message is white.
4. Confirm normal text has at least 4.5:1 contrast against its actual background; large text and control indicators have at least 3:1. Verify white on `#B400B4` is at least 4.5:1 before retaining that token.
5. Tab through buttons and fields; confirm keyboard focus is visibly outlined and disabled controls remain identifiable without relying only on color.
6. Trigger success, validation error, warning, disabled, and pressed states; confirm message type and action state remain distinguishable while text stays white.
7. Check desktop (1280 CSS px), tablet (768 CSS px), and mobile (375 CSS px) widths. Confirm no text/button overlap, clipping, or horizontal page overflow; data tables may scroll inside their own container.
8. Repeat registration/sign-in and one account operation to confirm changing colors did not alter application behavior or stored values.

The contrast values in [research.md](research.md) document the selected fuchsia and dark-surface candidates; no runtime or data-model changes are expected.
