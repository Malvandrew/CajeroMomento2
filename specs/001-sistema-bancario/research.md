# Research: Sistema Bancario Mi Plata

## Project State

- The repository has Spec Kit configuration and feature documents, but no application source, package manifest, or tests.
- Node.js v24.19.0 is available. There are no existing app dependencies or code conventions beyond the constitution.
- The active feature uses browser-native HTML, CSS, JavaScript, and localStorage only.

## Decisions

### Native browser modules and no packages

- **Decision**: Use native JavaScript ES modules (`.mjs`) with semantic HTML and plain CSS. Use no runtime package dependencies.
- **Rationale**: This satisfies the mandated stack, keeps the project legible for second-semester students, and works in current browsers without adding setup or build steps.
- **Alternatives considered**: A UI framework or bundler would add concepts and dependencies without a server/API requirement or existing code to integrate.

### One serialized local state and validate-before-write

- **Decision**: Persist customers, products, movements, and card transactions in one serialized state value in localStorage. For every operation, load current state, validate all inputs and product rules, compute a complete candidate state, and write once only after validation succeeds. Update the visible state only after persistence succeeds.
- **Rationale**: A single write avoids partial transfer records within one page flow and supports the spec's unchanged-balance requirement for rejected operations.
- **Alternatives considered**: Separate keys or writes for each balance and movement could leave a debit without a credit or history entry if a later write fails.

### Monetary representation

- **Decision**: Convert validated amounts to integer centavos at input boundaries; use integer arithmetic for balances and round only at explicitly defined financial calculation boundaries. For card installments, round payable amounts to cents, round the first installments to cents, and place any remainder in the final installment.
- **Rationale**: Binary floating-point arithmetic can create fractional-cent drift; the spec requires two-decimal display and a final-installment rounding adjustment.
- **Alternatives considered**: Repeated floating-point balance arithmetic would make exact equality and repeated operations less predictable.

### Savings interest trigger

- **Decision**: Credit 1.5% of the pre-credit savings balance before the first accepted cash withdrawal in a calendar month. A transfer from savings neither triggers nor consumes this monthly interest credit. Persist the credited month per savings account only with a successful withdrawal.
- **Rationale**: This directly applies the user clarifications and prevents rejected withdrawals from changing account state.
- **Alternatives considered**: Treating any debit as a withdrawal conflicts with the explicit decision that transfers do not trigger interest.

### Transfer consistency

- **Decision**: Resolve both products, validate amount and source funds, compute debit/credit/movement as one candidate state, then persist once. Rejected transfers leave all balances and history unchanged.
- **Rationale**: This is the simplest local approach consistent with all-or-nothing acceptance behavior.
- **Alternatives considered**: Persisting debit, credit, and history in separate writes exposes partial states.
- **Limit**: localStorage has no multi-tab transaction primitive. This feature guarantees serialized operations in one active page; simultaneous writes from multiple tabs are unsupported and must not be represented as atomic.

### Password and data-loss warnings

- **Decision**: Follow the spec's explicit academic-demo choice to retain readable passwords, and show the no-real-credentials warning before credentials are entered. State that data is available only on the same device/browser and cannot be recovered if local data is cleared.
- **Rationale**: The user's answer intentionally accepts readable credentials for this school exercise; making the risk visible is part of the functional contract.
- **Alternatives considered**: Protected password verification is safer, but it conflicts with the accepted requirement that readable passwords are permitted. No remote recovery or backup is allowed by the local-only constraint and the user's decision.

### Initial products and deletion

- **Decision**: At successful registration, create one savings account and one checking account with customer-selected, numeric, non-negative opening balances, plus one card with a customer-selected, non-negative initial limit. Record positive opening balances as consignation movements; zero balances create no opening movement. On confirmed customer deletion, remove the customer and products, then retain only movement date, time, type, and amount without customer/product links.
- **Rationale**: This makes the provisioned products usable from registration, records simulated opening funds in the movement history, and honors the explicit deletion/privacy decision without invoking an external settlement service.
- **Alternatives considered**: Requiring product opening is outside the feature; deleting all movement facts conflicts with the accepted retention choice.

### Credit-limit enforcement
- The customer-selected card value is an initial credit limit, not a deposit-account balance.

- **Decision**: Reject a card purchase when its original amount exceeds available credit. Available credit starts at the customer-selected initial limit and is reduced by the original principal of each accepted purchase. No card repayment or credit restoration flow is included.
- **Rationale**: A customer-selected limit must affect approval behavior to be meaningful; this implements the user's explicit rejection rule while keeping payment processing out of scope.
- **Alternatives considered**: Displaying a limit without enforcing it would permit purchases above the approved amount. Adding repayments would expand scope beyond the defined card-installment feature.

### Testing

- **Decision**: Use Node's built-in `node:test` for domain/service tests and browser-based acceptance checks served as static files with Python's standard HTTP server.
- **Rationale**: Node is available and the repository has no test framework. The standard library avoids added dependencies.
- **Alternatives considered**: A browser automation framework would require dependencies and setup not justified by the current project scale; manual browser checks are sufficient for the initial acceptance guide.

## Unresolved Planning Risks

- No numerical performance, data-volume, browser-version, or availability target is specified. These are not blockers for the single-device academic simulation; retain them as non-goals unless implementation reveals a concrete need.
- Cross-tab concurrent write safety is not guaranteed by localStorage. Acceptance and implementation should operate in one active tab; broadening to reliable multi-tab transactions would require a separately approved design decision.
