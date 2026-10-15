# Quickstart: Sistema Bancario Mi Plata

This guide describes how to validate the feature after implementation. The application source and tests do not exist yet.

## Prerequisites

- Node.js with the built-in test runner; Node.js v24.19.0 is available in the planning environment.
- Python 3 for serving the static app over HTTP.
- A current desktop browser; repeat responsive checks at tablet and mobile viewport sizes.

## Run Domain and Service Tests

From the repository root, after tests have been added:

```sh
node --test
```

Expected result: all tests pass for registration uniqueness, login lockout/reset, savings interest timing, checking overdraft boundaries, rejected-operation immutability, all-or-nothing transfers, movement anonymization after deletion, credit-card interest tiers, and cent-level installment rounding.

## Serve the Application

From the repository root, after `index.html` and the app modules have been added:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000` in the browser. Stop the server with Ctrl+C.

## End-to-End Acceptance Scenarios

1. Open registration. Confirm the academic-demo/plaintext-password warning and same-device/no-recovery warning appear before credential entry.
2. Register with unique identification and username and non-negative starting values. Confirm the chosen savings/checking balances and card credit limit are applied; positive starting balances appear in history as consignations.
3. Attempt registration with negative or non-numeric initial values, then with a duplicate identification or username. Confirm each invalid registration is rejected without creating a customer or products.
4. Sign in with an incorrect password twice and verify the remaining-attempt counter. Fail a third time and confirm access is blocked; use a separate customer to verify successful sign-in resets consecutive failures.
5. Make a positive deposit. Confirm the displayed balance increases by exactly the deposit amount. Submit zero, negative, and non-numeric values and confirm no state changes.
6. On savings, perform the first accepted cash withdrawal in a calendar month. Confirm 1.5% of the pre-credit balance is credited first. Transfer from savings before a cash withdrawal and confirm the transfer itself does not trigger or consume the monthly interest credit.
7. On checking, test withdrawals at and beyond the 20% overdraft boundary. Confirm no interest is applied and rejected withdrawals leave the balance unchanged.
8. Transfer between two distinct products and to another customer's product. Confirm both sides and history update on success; try same-product, nonexistent-destination, and insufficient-funds cases and confirm no partial update.
9. Check credit-card installment counts 1, 2, 3, 6, and 7. Confirm the specified rate tier, simple-interest total, two-decimal display, and final-installment remainder.
10. Edit profile and change password with correct and incorrect current-password cases. Confirm the username and identification uniqueness rules remain enforced.
11. Delete a customer after confirmation. Confirm the profile/products disappear, retained movement facts have no customer/product links, and the deleted credentials cannot sign in.
12. Resize to desktop, tablet, and mobile widths. Confirm primary controls, feedback, and history remain readable and usable without blocking overlap.
13. Clear local site data or open the application in another browser/device. Confirm the application does not claim that prior customer data can be recovered.

The registration/sign-in, one banking operation, and history journey should be completable in under five minutes in the usability acceptance check.
