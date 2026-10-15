# Implementation Plan: Sistema Bancario Mi Plata

**Branch**: `001-sistema-bancario` | **Date**: 2026-10-15 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-sistema-bancario/spec.md`

## Summary

Build a responsive banking simulation for registration and sign-in, three provisioned
products with customer-selected initial balances/limit, profile management, deposits,
withdrawals, transfers, movement history, and credit-card installment calculation. Use native browser JavaScript
modules and a small object-oriented domain model; persist one serialized application
state in `localStorage`. No server, database, or external storage service is in scope.

## Technical Context

**Language/Version**: JavaScript ES modules (`.mjs`); minimum browser version is not specified.

**Primary Dependencies**: None; use browser-native HTML, CSS, ES modules, `localStorage`, and Node built-ins for tests.

**Storage**: Browser `localStorage` only; one serialized state value. Readable passwords are explicitly accepted for this academic simulation.

**Testing**: Node.js `node:test` for domain/service tests and manual browser acceptance checks in [quickstart.md](quickstart.md). Node.js v24.19.0 is available in the planning environment.

**Target Platform**: Current desktop, tablet, and mobile browsers with ES module and `localStorage` support. Data is limited to the same device/browser and cannot be recovered if local data is cleared.

**Project Type**: Static client-side web application.

**Performance Goals**: No response-time or throughput target is specified. The measurable usability target is completion of registration, sign-in, a basic operation, and history review in under five minutes.

**Constraints**: HTML/CSS/JavaScript; OOP domain classes; separate UI and business logic; responsive layouts; no external persistence or payment integrations; no product opening/closing; warnings against real credentials; single active tab for banking mutations because `localStorage` lacks atomic cross-tab transactions.

**Scale/Scope**: One customer using one browser profile at a time; exact record volume is unspecified. Each successful registration creates one savings account, one checking account, and one credit card using the customer's numeric, non-negative starting balances and credit limit.

## Constitution Check

*Gate: Pass before Phase 0 research; re-evaluate after Phase 1 design.*

- **Spec First**: The active spec is clarified and checklist-validated. Implementation remains blocked until this plan is approved and tasks are generated.
- **Object-Oriented Design**: Use simple domain classes for `Cliente`, `ProductoFinanciero`, `Cuenta`, `CuentaAhorros`, `CuentaCorriente`, `TarjetaCredito`, `TransaccionTarjeta`, and `Movimiento`. Keep business rules out of DOM event handlers. `Cuenta` is the base for deposit-account types; the credit card is a distinct product under the shared financial-product abstraction.
- **Banking Rules First**: Enforce cash-withdrawal savings interest, checking overdraft boundaries, simple-interest card installments, and all-or-nothing transfers.
- **Banking Rules First**: Enforce cash-withdrawal savings interest, checking overdraft boundaries, simple-interest card installments, card-credit authorization, and all-or-nothing transfers.
- **Local Storage Only**: Persist application state exclusively in `localStorage`; add no network or external storage dependencies.
- **Simplicity for Learning**: Prefer explicit validation and short methods; no framework, package dependency, advanced pattern, or metaprogramming is needed.
- **Security and UX**: Apply own-customer access boundaries, three-failure lockout, deletion confirmation, readable-password warning, local-data-loss warning, and responsive feedback.
- **Quality and Definition of Done**: Define automated domain tests and browser acceptance checks for the primary banking flows.

**Gate result**: PASS. Readable passwords are an explicit academic-demo decision, not an unacknowledged deviation. Cross-tab concurrency is excluded and documented as a limitation; the design does not claim atomicity across tabs.

**Post-design gate**: PASS. Research, domain model, UI contract, and quickstart preserve the spec's banking rules and user decisions; they add no external storage or package dependencies. The single-tab concurrency limitation is documented as a localStorage platform constraint, not as a claim of transactional multi-tab guarantees.

## Project Structure

### Documentation (this feature)

```text
specs/001-sistema-bancario/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui.md
└── tasks.md              # Created by /speckit-tasks, not by /speckit-plan
```

### Source Code (repository root)

```text
index.html
styles/
└── styles.css
src/
├── models/
│   ├── Cliente.mjs
│   ├── ProductoFinanciero.mjs
│   ├── Cuenta.mjs
│   ├── CuentaAhorros.mjs
│   ├── CuentaCorriente.mjs
│   ├── TarjetaCredito.mjs
│   ├── TransaccionTarjeta.mjs
│   ├── Movimiento.mjs
│   └── EstadoAplicacion.mjs
├── services/
│   ├── ServicioAutenticacion.mjs
│   └── ServicioBancario.mjs
├── storage/
│   └── AlmacenamientoLocal.mjs
├── ui/
│   ├── Navegacion.mjs
│   ├── Formularios.mjs
│   └── Renderizado.mjs
└── utils/
    └── Dinero.mjs
tests/
├── models/
├── services/
└── integration/
```

**Structure Decision**: One static web application with native modules. The `models`,
`services`, `storage`, `ui`, and `utils` boundaries follow the constitution's
recommended separation. `tests` uses Node's built-in test runner without an added
package dependency. This is a proposed implementation layout; source directories do
not exist yet.

## Complexity Tracking

No constitutional violations or additional architectural projects are proposed.
