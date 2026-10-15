# Tasks: Sistema Bancario Mi Plata

**Input**: Design documents from `specs/001-sistema-bancario/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui.md](contracts/ui.md), [quickstart.md](quickstart.md)

**Tests**: Automated test tasks are omitted because neither the SPEC nor the user requested TDD or test-authoring tasks. Run the manual acceptance guide in `specs/001-sistema-bancario/quickstart.md` during the final phase.

**Organization**: Tasks are grouped by user story for incremental delivery and independent acceptance.

## Format

- `[P]` marks tasks that can proceed in parallel without editing the same file or depending on unfinished work.
- `[USn]` maps a task to user story n in `specs/001-sistema-bancario/spec.md`.
- Every task includes the concrete source or documentation path to change.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the static browser application structure and module entrypoint.

- [X] T001 Create `src/models/`, `src/services/`, `src/storage/`, `src/ui/`, `src/utils/`, `styles/`, and `tests/` directories per `specs/001-sistema-bancario/plan.md`.
- [X] T002 [P] Create the semantic application shell and ES-module script reference in `index.html`.
- [X] T003 [P] Create the responsive baseline stylesheet and design tokens in `styles/styles.css`.
- [X] T004 [P] Create the native-module entrypoint and initial route bootstrap in `src/main.mjs`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement shared money handling, application state, persistence, base models, and UI feedback before user stories.

- [X] T005 [P] Implement non-negative amount parsing, centavo conversion, rounding, and COP formatting in `src/utils/Dinero.mjs`.
- [X] T006 [P] Define the versioned application state shape and state validation in `src/models/EstadoAplicacion.mjs`.
- [X] T007 Implement load, serialize, single-write save, and persistence-error handling for the shared application state in `src/storage/AlmacenamientoLocal.mjs`.
- [X] T008 Implement shared financial-product/account base classes and movement value constraints in `src/models/ProductoFinanciero.mjs`, `src/models/Cuenta.mjs`, and `src/models/Movimiento.mjs`.
- [X] T009 [P] Implement shared success/error/warning rendering and page navigation behavior in `src/ui/Renderizado.mjs` and `src/ui/Navegacion.mjs`.

**Checkpoint**: State, money, storage, base domain behavior, and shared UI feedback are ready for the first independently demonstrable story.

---

## Phase 3: User Story 1 - Register and Access an Account (Priority: P1)

**Goal**: A visitor can register with unique identity/username and customer-selected opening values, then sign in, encounter the three-attempt lockout, and sign out.

**Independent Test**: Register with distinct non-negative savings/checking balances and card limit; verify products and positive opening consignations; reject invalid/duplicate registration; sign in, verify attempts/lockout/reset, and sign out.

- [X] T010 [P] [US1] Implement required customer fields, unique identity/username values, and login state in `src/models/Cliente.mjs`.
- [X] T011 [P] [US1] Implement savings/checking initial-balance fields and card initial-limit state in `src/models/CuentaAhorros.mjs`, `src/models/CuentaCorriente.mjs`, and `src/models/TarjetaCredito.mjs`.
- [X] T012 [US1] Implement registration validation for required fields, unique identification/username, matching passwords, and numeric non-negative initial values; provision one savings account, one checking account, one card, and positive opening consignation movements in `src/services/ServicioAutenticacion.mjs`.
- [X] T013 [US1] Implement sign-in validation, consecutive failed-attempt counting, third-attempt blocking, successful-login reset, and sign-out state changes in `src/services/ServicioAutenticacion.mjs`.
- [X] T014 [US1] Build the registration form for customer fields, separate savings/checking initial balances, card initial limit, validation feedback, academic-credential warning, and same-device/no-recovery warning in `src/ui/Registro.mjs`.
- [X] T015 [US1] Build the sign-in form, attempts-remaining display, blocked feedback, and sign-out command in `src/ui/InicioSesion.mjs`.
- [X] T016 [US1] Build the public landing page with institutional content, navigation, footer, social links, registration/sign-in entry points, and screen wiring in `src/ui/PaginaInicio.mjs`, `index.html`, and `src/main.mjs`.

**Checkpoint**: Registration and sign-in work independently; each customer has three products using the entered non-negative starting values and any positive opening account balance is recorded.

---

## Phase 4: User Story 3 - View Balances and Perform Account Operations (Priority: P1)

**Goal**: A signed-in customer can view balances, deposit funds, and withdraw from savings/current accounts under their distinct rules.

**Independent Test**: View all provisioned balances; deposit positive values; reject invalid amounts; exercise savings interest on the first accepted cash withdrawal only and test the current-account overdraft boundary.

- [X] T017 [P] [US3] Implement the savings-account 1.5% interest credit on the first accepted cash withdrawal per calendar month and the no-negative-balance rule in `src/models/CuentaAhorros.mjs`.
- [X] T018 [P] [US3] Implement current-account no-interest withdrawals and the 20% overdraft limit based on positive pre-withdrawal balance in `src/models/CuentaCorriente.mjs`.
- [X] T019 [US3] Implement balance inquiry, positive deposit validation, candidate-state cash withdrawals, consignation/withdrawal movements, and persist-once success behavior in `src/services/ServicioCuentas.mjs`.
- [X] T020 [US3] Build product selection, balance display, deposit/withdrawal forms, and rejected-operation feedback in `src/ui/PanelCuentas.mjs` and wire the view in `src/main.mjs`.

**Checkpoint**: Account operations show updated values; invalid or over-limit operations do not persist a balance or movement change.

---

## Phase 5: User Story 4 - Transfer Funds and Review Movements (Priority: P1)

**Goal**: A customer transfers between distinct owned or customer-to-customer products and reviews movements newest first.

**Independent Test**: Complete own-product and inter-customer transfers; reject same-product, missing destination, and insufficient-funds transfers; verify no partial changes and verify savings transfers do not trigger monthly cash-withdrawal interest.

- [X] T021 [US4] Implement source/destination ownership and existence checks, distinct-product and positive-amount validation, savings-transfer interest exclusion, all-or-nothing candidate-state balance updates, and transfer movement creation in `src/services/ServicioTransferencias.mjs`.
- [X] T022 [P] [US4] Build source/destination selection, amount confirmation, success/error feedback, and same-product rejection in `src/ui/Transferencias.mjs`.
- [X] T023 [P] [US4] Implement customer-scoped movement-history querying and render date, time, type, amount, and descending date/time order in `src/services/ServicioMovimientos.mjs` and `src/ui/Historial.mjs`.

**Checkpoint**: Successful transfers update both products and one history movement together; rejected transfers leave both products and history unchanged.

---

## Phase 6: User Story 2 - Manage Customer Details and Products (Priority: P2)

**Goal**: A signed-in customer can edit their own profile, change their password, and confirm deletion while retained movements are anonymized.

**Independent Test**: Edit valid own details, reject duplicate identity/username, change password with valid/invalid current credentials, cancel deletion, then confirm deletion and verify products disappear, movement facts remain without customer/product links, and sign-in is no longer possible.

- [X] T024 [US2] Implement own-customer profile editing and required/unique identity and username validation in `src/services/ServicioPerfil.mjs`.
- [X] T025 [US2] Implement password change requiring username, current password, new password, and matching confirmation in `src/services/ServicioPerfil.mjs`.
- [X] T026 [US2] Implement confirmed customer deletion, owned-product removal, and movement anonymization that retains only date/time/type/value in `src/services/ServicioPerfil.mjs`.
- [X] T027 [US2] Build profile editing, password-change forms, deletion confirmation/cancel flow, and feedback in `src/ui/Perfil.mjs`.

**Checkpoint**: Customers can access and change only their own profile; confirmed deletion removes identifying records without deleting retained movement facts.

---

## Phase 7: User Story 5 - Review Credit-Card Installments and Use the Banking Site (Priority: P2)

**Goal**: A customer can submit a card purchase within available credit and see its tiered simple-interest installment amount on responsive screens.

**Independent Test**: Try purchases below, equal to, and above available credit; verify approval/rejection and used credit; calculate installments at 1, 2, 3, 6, and 7 terms and inspect desktop/tablet/mobile layouts.

- [X] T028 [US5] Implement card transaction fields, tiered monthly rate selection, simple-interest total, two-decimal rounding, and final-installment remainder in `src/models/TransaccionTarjeta.mjs`.
- [X] T029 [US5] Implement available-credit calculation from initial limit minus accepted original purchase amounts; reject purchases above the limit and persist accepted transactions in `src/services/ServicioTarjeta.mjs`.
- [X] T030 [US5] Build purchase input, available-credit display, tier/term selection, monthly installment display, and limit-exceeded feedback in `src/ui/TarjetaCompra.mjs`.

**Checkpoint**: Card transactions above the available limit create no transaction; accepted purchases show the correct interest tier and installment schedule.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Validate the integrated browser experience, responsive layout, and documented limitations.

- [X] T031 [P] Complete responsive breakpoints, visible focus states, and desktop/tablet/mobile layout rules in `styles/styles.css`.
- [X] T032 Verify that every monetary field uses centavos internally and COP/two-decimal presentation at input/output boundaries in `src/utils/Dinero.mjs` and all operation services in `src/services/`.
- [X] T033 Run every scenario in `specs/001-sistema-bancario/quickstart.md` against the integrated application; fix any resulting behavior in the referenced `src/`, `styles/styles.css`, or `index.html` files.
- [X] T034 Confirm the warnings for readable academic-demo passwords and same-device/no-recovery behavior appear before credentials or initial-value entry in `src/ui/Registro.mjs`, `src/ui/InicioSesion.mjs`, and `src/ui/PaginaInicio.mjs`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; creates the static app structure and entrypoint.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories because all stories require money handling, shared state/storage, domain bases, and UI feedback.
- **User Stories (Phase 3+)**: Depend on Foundational. US1 must be completed first because it provisions customers and products used by later operations.
- **Polish (Phase 8)**: Depends on all five user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2; provisions the customer and products required by all other stories.
- **US3 (P1)**: Starts after US1; operates on provisioned accounts and defines withdrawal behavior used by transfers.
- **US4 (P1)**: Starts after US3; reuses account-fund rules and adds transfer/history behavior.
- **US2 (P2)**: Starts after US1; profile, password, and deletion flows can be implemented independently of account operations.
- **US5 (P2)**: Starts after US1; card purchases use the provisioned card and shared money utility.

### Parallel Opportunities

- **Setup**: T002, T003, and T004 can proceed in parallel after T001 because they edit separate files.
- **Foundational**: T005, T006, and T008 can proceed in parallel after T001; T007 follows the state shape; T009 uses separate UI files.
- **US1**: T010 and T011 can proceed in parallel; service and UI tasks follow those model contracts.
- **US3**: T017 and T018 can proceed in parallel after US1; T019 follows both account-rule implementations.
- **US4**: T022 and T023 can proceed in parallel after T021 because they edit separate UI files.
- **US2**: No safe implementation pair; T024-T026 edit the same profile service, followed by T027.
- **US5**: No safe implementation pair; T028 -> T029 -> T030 follows model, service, and UI dependencies.
- **Polish**: T031 can proceed in parallel with T034 because they edit CSS and UI files respectively; T033 requires all story functionality to be integrated.

---

## Parallel Example: User Story 1

```text
Task: T010 Customer model in src/models/Cliente.mjs
Task: T011 Account and card product models in src/models/CuentaAhorros.mjs, src/models/CuentaCorriente.mjs, and src/models/TarjetaCredito.mjs
```

These model tasks edit separate files and can begin after the foundational product/account classes are complete. Registration, sign-in, and UI tasks follow their interfaces.

## Parallel Examples by User Story

### US1

```text
Task: T010 Customer model in src/models/Cliente.mjs
Task: T011 Account and card product models in src/models/CuentaAhorros.mjs, src/models/CuentaCorriente.mjs, and src/models/TarjetaCredito.mjs
```

### US3

```text
Task: T017 Savings-account behavior in src/models/CuentaAhorros.mjs
Task: T018 Checking-account behavior in src/models/CuentaCorriente.mjs
```

### US4

```text
Task: T022 Transfer form in src/ui/Transferencias.mjs
Task: T023 Movement history in src/ui/Historial.mjs
```

### US2

No safe parallel pair: T024, T025, and T026 edit `src/services/ServicioPerfil.mjs`; complete them sequentially before T027.

### US5

No safe parallel pair: T028, T029, and T030 follow the model-service-UI dependency chain.

## Implementation Strategy

### MVP First

1. Complete Phase 1 Setup.
2. Complete Phase 2 Foundational work.
3. Complete Phase 3 User Story 1, including selected initial balances/limit and registration disclosures.
4. Stop and validate registration, sign-in, lockout, and sign-out using that story's independent criteria.
5. Continue with User Story 3, then User Story 4 to deliver the first banking operations increment.

### Incremental Delivery

1. Setup and Foundation establish a runnable static app.
2. US1 provides registration and authenticated access with initial products.
3. US3 adds balances, deposits, and product-specific withdrawals.
4. US4 adds transfers and movement history.
5. US2 adds profile/security/deletion lifecycle.
6. US5 adds card purchases and installment display.
7. Polish validates the full quickstart end-to-end.
