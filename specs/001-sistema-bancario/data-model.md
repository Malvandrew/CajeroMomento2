# Data Model: Sistema Bancario Mi Plata

## State Container

The application persists one serialized state value in localStorage. The state contains a schema version and collections for customers, products, movements, and credit-card transactions. A failed validation or failed storage write must not update the active in-memory state or report an operation as successful.

## Entities

### Cliente

- `id`: stable internal identifier.
- `numeroIdentificacion`: required and unique across customers.
- `nombreCompleto`: required display name.
- `celular`: required contact number.
- `usuario`: required and unique sign-in name.
- `contrasena`: readable value by explicit academic-demo decision; never use real banking credentials.
- `intentosFallidos`: consecutive failed sign-in count, from zero to three.
- `bloqueado`: account sign-in state; becomes true on the third consecutive failed attempt and is not reset by later attempts.
- **Relationships**: owns exactly one `CuentaAhorros`, one `CuentaCorriente`, and one `TarjetaCredito` at registration.
- **Deletion**: confirmed deletion removes the customer and all owned products. Any retained movement loses customer and product links and retains only date, time, type, and amount.

### ProductoFinanciero

- `id`: stable internal identifier.
- `clienteId`: owning customer identifier while the product exists.
- `tipo`: savings account, checking account, or credit card.
- **Relationships**: one customer owns three initial products. Transfers reference distinct source and destination products while those products exist.
- **Initial state**: the two account balances and card limit start at zero.
- **Initial state**: account balances and card limit equal the customer's non-negative values supplied at registration.

### Cuenta

- Abstract/simple base for deposit accounts.
- `saldoCentavos`: non-negative or overdraft-eligible integer-cent balance, according to the concrete account rule.
- **Relationships**: extends `ProductoFinanciero`.

### CuentaAhorros

- Extends `Cuenta`.
- `saldoInicialCentavos`: customer-selected, non-negative initial balance; a positive value is recorded as a consignation movement.
- `tasaInteresMensual`: 1.5%.
- `mesInteresAcreditado`: calendar month in which interest was last credited, or empty when none has been credited.
- **Rules**: interest is credited on the first accepted cash withdrawal in a calendar month, before the withdrawal, calculated on the pre-credit balance. A transfer does not trigger or consume the monthly interest credit. A rejected cash withdrawal changes neither balance nor month marker. The balance must not become negative.

### CuentaCorriente

- Extends `Cuenta`.
- `saldoInicialCentavos`: customer-selected, non-negative initial balance; a positive value is recorded as a consignation movement.
- `porcentajeSobregiro`: 20%.
- **Rules**: no interest; overdraft limit is 20% of the positive balance immediately before withdrawal. A zero or negative balance grants no additional overdraft allowance.

### TarjetaCredito

- Extends `ProductoFinanciero` as a separate financial product, not as a deposit account.
- `limiteCreditoCentavos`: customer-selected, non-negative initial credit limit.
- `creditoUtilizadoCentavos`: sum of original amounts of accepted card transactions; available credit is initial limit minus this amount.
- **Relationships**: owns zero or more `TransaccionTarjeta` records.

### TransaccionTarjeta

- `id`, `tarjetaId`, `montoOriginalCentavos`, `numeroCuotas`, `tasaMensual`, `totalAPagarCentavos`, and per-installment amounts in centavos.
- **Rules**: amount must be positive; installment count must be at least one. Rate is 0% for 1-2 installments, 1.9% monthly for 3-6, and 2.3% monthly for 7 or more. Interest is simple on the original amount: `total = principal + principal * monthlyRate * installmentCount`. Round payable to cents; divide into installments and apply any rounding remainder to the final installment.
- **Rules**: amount must be positive, installment count must be at least one, and the original purchase amount must not exceed available credit. An accepted purchase increases used credit by its original amount. Rate is 0% for 1-2 installments, 1.9% monthly for 3-6, and 2.3% monthly for 7 or more. Interest is simple on the original amount: `total = principal + principal * monthlyRate * installmentCount`. Round payable to cents; divide into installments and apply any rounding remainder to the final installment. Card repayments and credit-limit restoration are out of scope.
- **Scope note**: the spec defines installment calculation and display but no credit-limit authorization rule; do not infer one.

### Movimiento

- `id`, `fecha`, `hora`, `tipo`, `montoCentavos`, `productoOrigenId` (optional), and `productoDestinoId` (optional).
- **Types**: deposit, cash withdrawal, transfer.
- **Rules**: completed movements are shown newest first. Transfers have source and destination references while products exist. On customer deletion, erase all identifying customer/product links from that customer's retained movements, leaving date, time, type, and amount only.
- **Atomicity**: a completed transfer persists both balance changes and its movement together; a rejected operation persists none of them.

## State Transitions

- **Sign-in**: unlocked customer → failed attempt increments `intentosFallidos`; third consecutive failure sets `bloqueado`; successful sign-in resets the consecutive failure count to zero.
- **Savings interest**: no interest credited in current month → first accepted cash withdrawal credits interest and records the month; subsequent cash withdrawals in that month do not credit again; transfers do not alter this state.
- **Customer deletion**: active customer/products → confirmed deletion removes customer/products and anonymizes retained movements.
- **Banking operation**: current state → validate → compute candidate state → persist once → publish success; invalid operation or persistence failure leaves active state unchanged.
