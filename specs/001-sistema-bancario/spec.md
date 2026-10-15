# Feature Specification: Sistema Bancario Mi Plata

**Feature Branch**: Not specified (no branch hook ran)  
**Created**: 2026-10-15  
**Status**: Ready for planning
**Input**: User description: "SPEC-001 Sistema Bancario Mi Plata: application for customer registration and login, customer and product management, banking operations, transfers, movement history, profile management, and credit-card installments."

## Clarifications

### Session 2026-10-15

- Q: Cuando un cliente elimina su cuenta de Mi Plata, ¿qué debe ocurrir con sus productos y movimientos históricos? → A: Eliminar el perfil y sus productos, pero conservar los movimientos sin datos que identifiquen al cliente.
- Q: ¿Debe el sistema impedir que las contraseñas puedan leerse en los datos retenidos de los clientes? → A: No; al ser un ejercicio académico, se permite guardar contraseñas legibles.
- Q: ¿Debe el número de identificación ser único entre clientes, además del nombre de usuario? → A: Sí; tanto la identificación como el nombre de usuario deben ser únicos.
- Q: Si el cliente borra los datos locales de Mi Plata o cambia de dispositivo, ¿debe poder recuperar su cuenta y sus movimientos? → A: No; los datos solo están disponibles en el mismo dispositivo y navegador, y no se recuperan si se borran.

## User Scenarios & Testing

### User Story 1 - Register and Access an Account (Priority: P1)

A prospective customer registers with their identity and contact details, then signs in to access their banking profile. This gives customers a secure, personalized starting point for all banking tasks.

**Why this priority**: Registration and authentication establish customer identity and gate access to personal financial information.

**Independent Test**: Register a new customer, sign in with valid credentials, then verify that an incorrect password is rejected and the account is blocked after the third failed attempt.

**Acceptance Scenarios**:

1. **Given** all required registration details are valid and both the identification number and username are unused, **When** the customer submits registration with matching passwords, **Then** the customer is created and receives a clear success message.
2. **Given** an identification number or username is already registered, **When** another customer submits it, **Then** registration is rejected without creating a duplicate customer.
3. **Given** a registered, unlocked customer, **When** they submit the correct username and password, **Then** they access their banking panel.
4. **Given** a customer has failed login twice, **When** they submit an incorrect password again, **Then** the account is blocked and the interface reports that no attempts remain.
5. **Given** an authenticated customer, **When** they sign out, **Then** they return to the public landing page and cannot access the banking panel without signing in again.
6. **Given** a visitor opens registration or sign-in, **When** the credential fields are presented, **Then** the page identifies the application as an academic simulation and warns not to enter real banking credentials because saved passwords may be readable.

---

### User Story 2 - Manage Customer Details and Products (Priority: P2)

A customer reviews and updates their own profile and manages banking products associated with their account. Each customer can only view, edit, or delete their own customer record.

**Why this priority**: Customers need accurate profile information and access to their products to perform banking operations.

**Independent Test**: Update profile details, change a password using the current password, verify that another customer's record is inaccessible, and confirm own-record deletion.

**Acceptance Scenarios**:

1. **Given** an authenticated customer, **When** they save valid profile changes, **Then** the updated details appear in the profile.
2. **Given** an authenticated customer, **When** they submit the correct current password, a matching new password, and confirmation, **Then** the new password is accepted for subsequent sign-in.
3. **Given** an authenticated customer, **When** they view or edit customer data, **Then** only their own record is accessible.
4. **Given** an authenticated customer, **When** they confirm deletion of their own account, **Then** their profile and products are deleted, their transaction movements remain without identifying links, and they can no longer sign in.
5. **Given** an authenticated customer, **When** they request deletion of their own customer record but cancel, **Then** the record remains unchanged.

---

### User Story 3 - View Balances and Perform Account Operations (Priority: P1)

A customer selects a banking product, sees its current balance, and makes deposits or withdrawals under that product's rules.

**Why this priority**: Balance inquiry and basic account operations are the central value of the banking service.

**Independent Test**: On separate savings and checking products, perform valid deposits and withdrawals, then verify the displayed balances and reject invalid amounts or operations that exceed the permitted funds.

**Acceptance Scenarios**:

1. **Given** a customer owns a product, **When** they select it for balance inquiry, **Then** its current balance is displayed.
2. **Given** a positive numeric deposit amount, **When** the customer confirms the deposit, **Then** the product balance increases by that amount and the updated balance is shown.
3. **Given** a savings account, **When** the customer requests a withdrawal beyond its available balance, **Then** the withdrawal is rejected and the balance is unchanged.
4. **Given** a checking account, **When** the customer requests a withdrawal within the permitted overdraft limit, **Then** the withdrawal is completed and the resulting balance is shown.
5. **Given** a zero, negative, or non-numeric amount, **When** the customer submits a deposit or withdrawal, **Then** the operation is rejected with a clear explanation and no balance change.
6. **Given** a savings-account withdrawal is the first valid withdrawal in a calendar month, **When** the customer completes it, **Then** 1.5% of the balance immediately before interest is credited before the withdrawal and the credited interest is shown.
7. **Given** interest has already been credited to a savings account in the current calendar month, **When** the customer makes another valid withdrawal, **Then** no additional monthly interest is credited.

---

### User Story 4 - Transfer Funds and Review Movements (Priority: P1)

A customer transfers funds between their own products or to another customer's product and reviews a dated history of financial movements.

**Why this priority**: Transfers and an auditable movement history let customers move and verify their funds.

**Independent Test**: Transfer funds between two distinct owned products and to another customer's product; verify both balances, reject a transfer to the same product, and confirm the movement history is ordered newest first.

**Acceptance Scenarios**:

1. **Given** two distinct products exist and the source has sufficient permitted funds, **When** the customer confirms a transfer, **Then** the source and destination balances are updated and the transfer is recorded.
2. **Given** the source and destination refer to the same product, **When** the customer submits a transfer, **Then** the transfer is rejected and no balance changes.
3. **Given** the destination product does not exist or the source cannot cover the transfer under its product rules, **When** the customer confirms the transfer, **Then** the transfer is rejected without changing either balance.
4. **Given** multiple movements exist, **When** the customer opens history, **Then** movements appear in descending date and time order with their date, time, type, and value.

---

### User Story 5 - Review Credit-Card Installments and Use the Banking Site (Priority: P2)

A customer reviews a credit-card transaction's monthly installment amount and uses the banking experience across desktop, tablet, and mobile layouts.

**Why this priority**: Clear installment information supports informed credit use, while responsive layouts make core banking tasks available on common devices.

**Independent Test**: Check installment displays for terms in each interest tier and complete a primary banking journey at desktop, tablet, and mobile viewport sizes.

**Acceptance Scenarios**:

1. **Given** a credit-card transaction with 1 or 2 installments, **When** the customer requests its payment schedule, **Then** the 0% interest tier and monthly installment amount are displayed.
2. **Given** a credit-card transaction with 3 or 6 installments, **When** the customer requests its payment schedule, **Then** the 1.9% monthly interest tier and monthly installment amount are displayed.
3. **Given** a credit-card transaction with 7 or more installments, **When** the customer requests its payment schedule, **Then** the 2.3% monthly interest tier and monthly installment amount are displayed.
4. **Given** the customer opens the site on desktop, tablet, or mobile, **When** they navigate to a primary banking task, **Then** its controls and feedback remain readable and usable.
5. **Given** a user opens the landing page, **When** they select sign-in or registration, **Then** they reach the corresponding flow; institutional information, navigation, footer, and social links are available.

### Edge Cases

- A required registration field is blank, the username is duplicated, or the password confirmation differs.
- A required registration field is blank, the identification number or username is duplicated, or the password confirmation differs.
- Login is attempted for a nonexistent, locked, or already blocked customer.
- A deposit or withdrawal amount is zero, negative, non-numeric, or exceeds the applicable funds limit.
- A transfer destination is missing, does not exist, belongs to the source product, or is the same product as the source.
- A transfer amount exceeds the source product's permitted funds; neither side may be partially updated.
- A profile update attempts to use another customer's username.
- A profile update attempts to use another customer's username.
- A customer deletes their account; their products are removed while movement facts remain without links to the deleted customer or products.
- A password change has an incorrect current password or mismatched new-password confirmation.
- A credit-card installment count is less than one or the transaction amount is not positive.
- Two operations are submitted against the same product before the displayed balance is refreshed; the system must not allow an invalid resulting balance.
- Two operations are submitted against the same product before the displayed balance is refreshed; the system must not allow an invalid resulting balance.
- A customer clears locally retained application data or changes devices; customer and movement data cannot be restored or accessed from the new device.

## Requirements

### Functional Requirements

- **FR-001**: The landing page MUST provide navigation to sign-in and registration, institutional information, a footer, and social links.
- **FR-002**: The registration flow MUST collect identification number, full name, mobile number, username, password, and password confirmation.
- **FR-003**: The system MUST reject registration when a required field is missing, the identification number or username is already in use, or the password and confirmation do not match.
- **FR-004**: The sign-in flow MUST validate the submitted username and password, display the number of attempts remaining after a failed attempt, and reset the failed-attempt count after a successful sign-in.
- **FR-005**: The system MUST block sign-in for a customer after exactly three consecutive failed attempts and communicate the blocked state.
- **FR-006**: Registration MUST create a customer's own record; an authenticated customer MUST be able to view, edit, and delete only their own record. The system MUST require explicit confirmation before deletion, remove the customer's profile and products after confirmation, retain movement facts without links to identifying customer or product records, and prevent access to other customers' records.
- **FR-007**: An authenticated customer MUST be able to view the current balance of each product they are authorized to access.
- **FR-008**: The system MUST accept a deposit only when its amount is numeric and greater than zero, update the selected product balance, and show the updated balance.
- **FR-009**: At the first valid withdrawal in each calendar month, the system MUST calculate interest as 1.5% of the savings balance immediately before interest is credited, credit it before the withdrawal, and show the interest amount and resulting balance. It MUST NOT credit this monthly interest again on subsequent withdrawals in the same calendar month, and MUST reject any withdrawal that exceeds the post-credit available balance.
- **FR-010**: A checking-account withdrawal MUST apply no interest and MUST allow an overdraft up to 20% of the current balance.
- **FR-011**: The system MUST reject withdrawals with non-positive or non-numeric amounts and MUST leave balances unchanged when an operation is rejected.
- **FR-012**: The system MUST allow transfers between distinct products owned by the same customer and between products owned by different customers.
- **FR-013**: The system MUST reject a transfer to the same product, a nonexistent destination, or a transfer that exceeds the source product's permitted funds.
- **FR-014**: A completed transfer MUST update the source and destination balances together and MUST be recorded for history; a rejected transfer MUST NOT partially update either balance.
- **FR-015**: The system MUST record each deposit, withdrawal, and transfer with date, time, movement type, and amount, and MUST display movements newest first.
- **FR-016**: The system MUST let an authenticated customer edit their own registered profile details, subject to required-field and username-uniqueness validation.
- **FR-017**: The password-change flow MUST require the username, current password, new password, and matching confirmation; it MUST reject an incorrect current password or mismatched confirmation.
- **FR-018**: For credit-card transactions, the system MUST apply 0% interest for up to 2 installments, 1.9% monthly interest for 3 to 6 installments, and 2.3% monthly interest for 7 or more installments.
- **FR-019**: The system MUST calculate credit-card installments using simple interest on the original amount: total payable equals the transaction amount plus the transaction amount multiplied by the monthly rate and installment count; the monthly installment equals total payable divided by the installment count. For 0% interest, the amount is divided evenly by the installment count. Amounts MUST be rounded to two decimal places, with any rounding remainder added to the final installment, and the monthly installment MUST be displayed.
- **FR-020**: The system MUST reject a credit-card transaction when the amount is not positive or the installment count is less than one.
- **FR-021**: The banking experience MUST remain usable on desktop, tablet, and mobile screen sizes and MUST present clear success, error, and warning messages.
- **FR-022**: The main panel MUST provide access to balance inquiry, deposits, withdrawals, movement history, transfers, and profile.
- **FR-023**: When a customer signs out, the system MUST end access to the banking panel and return them to the public landing page; banking information MUST remain inaccessible until the customer signs in again.
- **FR-024**: For this academic simulation, the system MAY retain passwords in readable form; it MUST disclose that a person with access to retained customer data may read them and MUST warn users not to enter real banking credentials.
- **FR-025**: The system MUST make clear before registration that customer and movement data are available only on the same device and browser, and cannot be recovered if locally retained data is cleared or accessed from another device.

### Key Entities

- **Customer**: A person identified by registration details and sign-in credentials; owns one or more banking products.
- **Customer**: A person identified by a unique identification number and unique username, with sign-in credentials; owns one or more banking products.
- **Banking Product**: A customer's financial product with an identifiable owner, product type, and current balance or credit transaction details.
- **Savings Account**: A deposit product with a monthly interest rate and a no-negative-balance withdrawal rule.
- **Checking Account**: A deposit product with no interest and an overdraft limit.
- **Credit Card Transaction**: A purchase amount, installment count, applicable monthly interest tier, and monthly installment amount.
- **Movement**: A dated and timed deposit, withdrawal, or transfer with an amount and relevant source and destination products.

## Success Criteria

### Measurable Outcomes

- **SC-001**: In acceptance testing, 100% of valid registration cases create one customer, while missing fields, duplicate identification numbers or usernames, and mismatched passwords create none and produce actionable feedback.
- **SC-002**: In all login acceptance cases, the first two failed attempts show the correct remaining count and the third failed attempt blocks access.
- **SC-003**: In all valid deposit, withdrawal, and transfer acceptance cases, displayed balances match the resulting operations; in all rejected cases, balances remain unchanged.
- **SC-004**: Every completed movement in acceptance testing displays its date, time, type, and amount, and the complete history is ordered newest first.
- **SC-005**: Customers can complete registration, sign-in, a basic account operation, and review of its history in under five minutes in a usability test without assistance.
- **SC-006**: The primary banking journeys remain usable at desktop, tablet, and mobile viewport sizes with no blocking content overlap or inaccessible controls.
- **SC-007**: For installment counts of 1, 2, 3, 6, and 7, every credit-card scenario displays the specified interest tier and a monthly installment amount matching the simple-interest rule to two decimal places, including any final-installment rounding adjustment.
- **SC-008**: 100% of registration and sign-in entry points display the academic-simulation and no-real-credentials warning before a customer enters credentials.
- **SC-009**: 100% of registration entry points display the same-device data limitation and no-recovery warning before a customer creates an account.

## Assumptions

- Each customer may own one or more savings accounts, checking accounts, or credit-card products and may transfer only from products they own.
- Product management covers viewing, selecting, and using existing products; opening and closing products are out of scope because their rules were not provided.
- Transfer destinations are selected from existing products, and the customer reviews the amount and destination before confirming the transfer.
- The overdraft allowance is 20% of the positive current balance immediately before withdrawal; an account with a zero or negative balance has no additional overdraft allowance.
- Currency is Colombian pesos (COP), and monetary amounts are displayed to two decimal places where applicable.
- The third consecutive failed sign-in attempt blocks the account; account recovery or unlocking is outside this feature.
- The feature covers simulated customer, product, and movement management within Mi Plata; external payment processing, settlement with other financial institutions, and physical cash handling are out of scope.
- Deleting a customer removes their profile and products but retains movement facts (date, time, type, and amount) without links to the deleted customer or products; account recovery after deletion is not included.
- Project-wide technical constraints and the required object-oriented design remain governed by the project constitution and are not repeated as implementation instructions in this user-facing specification.
- This is an academic simulation, not a real banking service; users must not enter real credentials because passwords may be readable in retained customer data.
- Customer and movement data remain available only on the device and browser where the customer used Mi Plata; clearing locally retained data permanently removes access to those records, and no recovery process is provided.
- This is an academic simulation, not a real banking service; users must not enter real credentials because passwords may be readable in retained customer data.
