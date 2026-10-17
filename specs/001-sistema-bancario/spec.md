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
- Q: Si el cliente nuevo no puede abrir productos, ¿cómo obtiene productos bancarios para usar la aplicación? → A: Crear automáticamente al registrarse una cuenta de ahorros, una corriente y una tarjeta demo, todas con saldo o cupo inicial cero.
- Q: ¿Una transferencia desde una cuenta de ahorros debe contar como el primer retiro del mes para acreditar el interés del 1.5%? → A: No; acreditar interés solo en retiros de efectivo, no en transferencias.
- Q: ¿Qué valores iniciales puede elegir el cliente al registrarse? → A: Un saldo inicial para ahorros, otro para corriente y un cupo inicial para la tarjeta.
- Q: ¿Debe rechazarse una compra de tarjeta cuando su valor supera el cupo disponible? → A: Sí; no se aprueba ni registra la compra si excede el cupo disponible.

## User Scenarios & Testing

### Historia de Usuario 1 - Registrarse e iniciar sesión (Prioridad: P1)

Una persona interesada en ser cliente se registra con sus datos de identidad y contacto, y luego inicia sesión para acceder a su perfil bancario. Esto le brinda un punto de partida personalizado para realizar sus operaciones bancarias.

**Por qué esta prioridad**: El registro y la autenticación establecen la identidad del cliente y controlan el acceso a su información financiera personal.

**Prueba independiente**: Registrar un cliente nuevo e iniciar sesión con credenciales válidas. Después, comprobar que se rechace una contraseña incorrecta y que la cuenta se bloquee tras el tercer intento fallido.

**Escenarios de aceptación**:

1. **Dado** que todos los datos obligatorios de registro y los valores iniciales numéricos no negativos son válidos, y que la identificación y el nombre de usuario aún no están registrados, **Cuando** la persona envía el formulario de registro, **Entonces** se crea el cliente con una cuenta de ahorros y una cuenta corriente con los saldos elegidos, una tarjeta de crédito con el cupo elegido y movimientos de consignación para los saldos iniciales positivos.
2. **Dado** que un saldo inicial o el cupo de la tarjeta es negativo o no numérico, **Cuando** la persona envía el formulario de registro, **Entonces** se rechaza el registro y no se crean el cliente ni sus productos.
3. **Dado** que una identificación o un nombre de usuario ya está registrado, **Cuando** otra persona intenta registrarlo, **Entonces** se rechaza el registro y no se crea un cliente duplicado.
4. **Dado** un cliente registrado y desbloqueado, **Cuando** ingresa su nombre de usuario y contraseña correctos, **Entonces** accede al panel bancario.
5. **Dado** que un cliente ya falló el inicio de sesión dos veces, **Cuando** vuelve a ingresar una contraseña incorrecta, **Entonces** se bloquea la cuenta y la interfaz informa que no quedan intentos.
6. **Dado** un cliente autenticado, **Cuando** cierra sesión, **Entonces** vuelve a la página pública de inicio y no puede acceder al panel bancario sin iniciar sesión nuevamente.
7. **Dado** que una persona visitante abre el registro o el inicio de sesión, **Cuando** se muestran los campos de credenciales, **Entonces** la página identifica la aplicación como una simulación académica y advierte que no se ingresen credenciales bancarias reales porque las contraseñas guardadas podrían ser legibles.

---

### Historia de Usuario 2 - Administrar los datos y productos del cliente (Prioridad: P2)

Un cliente consulta y actualiza su propio perfil, y administra los productos bancarios asociados a su cuenta. Cada cliente solo puede consultar, editar o eliminar su propio registro.

**Por qué esta prioridad**: Los clientes necesitan mantener sus datos correctos y acceder a sus productos para realizar operaciones bancarias.

**Prueba independiente**: Actualizar los datos del perfil, cambiar la contraseña usando la contraseña actual, comprobar que el registro de otro cliente no sea accesible y confirmar la eliminación del registro propio.

**Escenarios de aceptación**:

1. **Dado** un cliente autenticado, **Cuando** guarda cambios válidos en su perfil, **Entonces** los datos actualizados aparecen en el perfil.
2. **Dado** un cliente autenticado, **Cuando** ingresa la contraseña actual correcta, una nueva contraseña y su confirmación coincidentes, **Entonces** la nueva contraseña se acepta para los siguientes inicios de sesión.
3. **Dado** un cliente autenticado, **Cuando** consulta o edita datos de clientes, **Entonces** solo puede acceder a su propio registro.
4. **Dado** un cliente autenticado, **Cuando** confirma la eliminación de su propia cuenta, **Entonces** se eliminan su perfil y sus productos, se conservan sus movimientos sin vínculos que lo identifiquen y ya no puede iniciar sesión.
5. **Dado** un cliente autenticado, **Cuando** solicita eliminar su propio registro pero cancela la acción, **Entonces** el registro permanece sin cambios.

---

### Historia de Usuario 3 - Consultar saldos y realizar operaciones en las cuentas (Prioridad: P1)

Un cliente selecciona un producto bancario, consulta su saldo actual y realiza consignaciones o retiros de acuerdo con las reglas de ese producto.

**Por qué esta prioridad**: Consultar saldos y realizar operaciones básicas son el valor central del servicio bancario.

**Prueba independiente**: En cuentas de ahorros y corrientes distintas, realizar consignaciones y retiros válidos; después, comprobar los saldos mostrados y rechazar montos inválidos u operaciones que excedan los fondos permitidos.

**Escenarios de aceptación**:

1. **Dado** que un cliente es titular de un producto, **Cuando** lo selecciona para consultar el saldo, **Entonces** se muestra su saldo actual.
2. **Dado** un monto de consignación numérico y positivo, **Cuando** el cliente confirma la consignación, **Entonces** el saldo del producto aumenta en ese monto y se muestra el saldo actualizado.
3. **Dada** una cuenta de ahorros, **Cuando** el cliente solicita un retiro que supera el saldo disponible, **Entonces** se rechaza el retiro y el saldo permanece sin cambios.
4. **Dada** una cuenta corriente, **Cuando** el cliente solicita un retiro dentro del límite de sobregiro permitido, **Entonces** se completa el retiro y se muestra el saldo resultante.
5. **Dado** un monto igual a cero, negativo o no numérico, **Cuando** el cliente envía una consignación o un retiro, **Entonces** se rechaza la operación con una explicación clara y el saldo no cambia.
6. **Dado** que un retiro de una cuenta de ahorros es el primer retiro válido del mes calendario, **Cuando** el cliente lo completa, **Entonces** se acredita el 1,5 % del saldo inmediatamente antes de acreditar el interés, antes de realizar el retiro, y se muestra el interés acreditado.
7. **Dado** que ya se acreditó interés a una cuenta de ahorros durante el mes calendario actual, **Cuando** el cliente realiza otro retiro válido, **Entonces** no se acredita interés mensual adicional.

---

### Historia de Usuario 4 - Transferir fondos y consultar movimientos (Prioridad: P1)

Un cliente transfiere fondos entre sus propios productos o al producto de otro cliente, y consulta un historial fechado de sus movimientos financieros.

**Por qué esta prioridad**: Las transferencias y un historial verificable permiten a los clientes mover y revisar sus fondos.

**Prueba independiente**: Transferir fondos entre dos productos propios distintos y hacia un producto de otro cliente; comprobar ambos saldos, rechazar una transferencia al mismo producto y confirmar que el historial ordena los movimientos del más reciente al más antiguo.

**Escenarios de aceptación**:

1. **Dado** que existen dos productos distintos y el producto de origen tiene fondos permitidos suficientes, **Cuando** el cliente confirma una transferencia, **Entonces** se actualizan los saldos de origen y destino y se registra la transferencia.
2. **Dado** que el producto de origen y el de destino son el mismo, **Cuando** el cliente envía una transferencia, **Entonces** se rechaza la transferencia y ningún saldo cambia.
3. **Dado** que el producto de destino no existe o que el producto de origen no puede cubrir la transferencia según sus reglas, **Cuando** el cliente confirma la transferencia, **Entonces** se rechaza sin cambiar ninguno de los saldos.
4. **Dado** que existen varios movimientos, **Cuando** el cliente abre el historial, **Entonces** los movimientos aparecen ordenados por fecha y hora del más reciente al más antiguo, e incluyen fecha, hora, tipo y valor.
5. **Dado** que un cliente transfiere dinero desde una cuenta de ahorros antes de realizar su primer retiro en efectivo del mes, **Cuando** se completa la transferencia, **Entonces** se debita el saldo de origen sin acreditar el interés mensual, y el primer retiro posterior en efectivo sigue teniendo derecho a generar el interés de ese mes.

---

### Historia de Usuario 5 - Consultar cuotas de la tarjeta y usar el sitio bancario (Prioridad: P2)

Un cliente consulta el valor de la cuota mensual de una compra con tarjeta de crédito y utiliza la experiencia bancaria desde diseños de escritorio, tableta y móvil.

**Por qué esta prioridad**: La información clara sobre las cuotas ayuda a tomar decisiones informadas sobre el crédito, y los diseños adaptables permiten realizar las operaciones bancarias principales desde dispositivos comunes.

**Prueba independiente**: Comprobar los valores de las cuotas para plazos de cada rango de interés y completar un recorrido bancario principal en tamaños de pantalla de escritorio, tableta y móvil.

**Escenarios de aceptación**:

1. **Dada** una compra con tarjeta de crédito de 1 o 2 cuotas, **Cuando** el cliente consulta su plan de pagos, **Entonces** se muestran el rango de interés del 0 % y el valor de la cuota mensual.
2. **Dada** una compra con tarjeta de crédito de 3 o 6 cuotas, **Cuando** el cliente consulta su plan de pagos, **Entonces** se muestran el rango de interés mensual del 1,9 % y el valor de la cuota mensual.
3. **Dada** una compra con tarjeta de crédito de 7 cuotas o más, **Cuando** el cliente consulta su plan de pagos, **Entonces** se muestran el rango de interés mensual del 2,3 % y el valor de la cuota mensual.
4. **Dado** que el cliente abre el sitio desde un equipo de escritorio, una tableta o un móvil, **Cuando** navega a una operación bancaria principal, **Entonces** sus controles y mensajes siguen siendo legibles y utilizables.
5. **Dado** que una persona abre la página de inicio, **Cuando** selecciona iniciar sesión o registrarse, **Entonces** llega al flujo correspondiente y puede consultar la información institucional, la navegación, el pie de página y los enlaces a redes sociales.
6. **Dado** que una tarjeta de crédito tiene un cupo disponible igual o superior al valor de una compra, **Cuando** el cliente confirma la compra, **Entonces** se acepta la transacción y su valor original reduce el cupo disponible.
7. **Dado** que una compra supera el cupo disponible de la tarjeta, **Cuando** el cliente intenta realizarla, **Entonces** se rechaza sin crear una transacción ni cambiar el cupo disponible.

### Edge Cases

- A required registration field is blank, the identification number or username is duplicated, or the password confirmation differs.
- Login is attempted for a nonexistent, locked, or already blocked customer.
- A deposit or withdrawal amount is zero, negative, non-numeric, or exceeds the applicable funds limit.
- A transfer destination is missing, does not exist, belongs to the source product, or is the same product as the source.
- A transfer amount exceeds the source product's permitted funds; neither side may be partially updated.
- A profile update attempts to use another customer's username.
- A customer deletes their account; their products are removed while movement facts remain without links to the deleted customer or products.
- A password change has an incorrect current password or mismatched new-password confirmation.
- A credit-card installment count is less than one or the transaction amount is not positive.
- An initial account balance or credit limit is negative or non-numeric; registration creates no customer or products.
- A credit-card installment count is less than one, the transaction amount is not positive, or the purchase exceeds available credit.
- A transfer from savings occurs before the first cash withdrawal of the month; it does not trigger or consume monthly interest.
- Two operations are submitted against the same product before the displayed balance is refreshed; the system must not allow an invalid resulting balance.
- A customer clears locally retained application data or changes devices; customer and movement data cannot be restored or accessed from the new device.

## Requirements

### Functional Requirements

- **FR-001**: The landing page MUST provide navigation to sign-in and registration, institutional information, a footer, and social links.
- **FR-002**: The registration flow MUST collect identification number, full name, mobile number, username, password, password confirmation, a starting balance for savings, a starting balance for checking, and an initial credit-card limit.
- **FR-003**: The system MUST reject registration when a required field is missing, the identification number or username is already in use, or the password and confirmation do not match.
- **FR-004**: The sign-in flow MUST validate the submitted username and password, display the number of attempts remaining after a failed attempt, and reset the failed-attempt count after a successful sign-in.
- **FR-005**: The system MUST block sign-in for a customer after exactly three consecutive failed attempts and communicate the blocked state.
- **FR-006**: Registration MUST create a customer's own record; an authenticated customer MUST be able to view, edit, and delete only their own record. The system MUST require explicit confirmation before deletion, remove the customer's profile and products after confirmation, retain movement facts without links to identifying customer or product records, and prevent access to other customers' records.
- **FR-007**: An authenticated customer MUST be able to view the current balance of each product they are authorized to access.
- **FR-008**: The system MUST accept a deposit only when its amount is numeric and greater than zero, update the selected product balance, and show the updated balance.
- **FR-009**: At the first valid cash withdrawal from a savings account in each calendar month, the system MUST calculate interest as 1.5% of the savings balance immediately before interest is credited, credit it before the cash withdrawal, and show the interest amount and resulting balance. It MUST NOT credit this monthly interest again on subsequent cash withdrawals in the same calendar month. Transfers from savings MUST NOT trigger or count as this interest-crediting event. The system MUST reject any cash withdrawal that exceeds the post-credit available balance.
- **FR-010**: A checking-account withdrawal MUST apply no interest and MUST allow an overdraft up to 20% of the current balance.
- **FR-011**: The system MUST reject withdrawals with non-positive or non-numeric amounts and MUST leave balances unchanged when an operation is rejected.
- **FR-012**: The system MUST allow transfers between distinct products owned by the same customer and between products owned by different customers. A transfer from savings MUST NOT trigger monthly savings interest.
- **FR-013**: The system MUST reject a transfer to the same product, a nonexistent destination, or a transfer that exceeds the source product's permitted funds.
- **FR-014**: A completed transfer MUST update the source and destination balances together and MUST be recorded for history; a rejected transfer MUST NOT partially update either balance. A transfer from savings MUST validate available funds without crediting monthly interest.
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
- **FR-026**: After successful registration, the system MUST create one savings account, one checking account, and one credit-card product using the non-negative starting balances and credit limit supplied by the customer. Customers MUST NOT open or close products in this feature.
- **FR-027**: The system MUST accept only numeric, non-negative starting balances for savings and checking accounts and a numeric, non-negative initial credit-card limit. A zero value is valid; a negative or non-numeric value MUST reject registration without creating the customer or products.
- **FR-028**: Each positive initial account balance MUST be recorded as a consignation movement with date, time, type, and value. A zero initial balance MUST NOT create a movement. Initial balances are simulated funds and MUST NOT invoke an external payment or settlement service.
- **FR-029**: Before accepting a credit-card transaction, the system MUST reject the purchase if its original amount exceeds available credit. Available credit MUST equal the initial limit minus the original amounts of accepted card transactions; an accepted purchase reduces available credit by its original amount. Card payments and credit-limit restoration are outside this feature.

### Key Entities

- **Customer**: A person identified by a unique identification number and unique username, with sign-in credentials; owns one savings account, one checking account, and one credit card created at registration.
- **Banking Product**: A customer's financial product with an identifiable owner, product type, and current balance or credit transaction details.
- **Savings Account**: A deposit product with a monthly interest rate and a no-negative-balance withdrawal rule.
- **Checking Account**: A deposit product with no interest and an overdraft limit.
- **Credit Card Transaction**: A purchase amount, installment count, applicable monthly interest tier, and monthly installment amount.
- **Movement**: A dated and timed deposit, withdrawal, or transfer with an amount and relevant source and destination products.

## Success Criteria

### Measurable Outcomes

- **SC-001**: In acceptance testing, 100% of valid registration cases create one customer and three products whose balances and credit limit equal the submitted values, while missing fields, negative or non-numeric initial values, duplicate identification numbers or usernames, and mismatched passwords create none and produce actionable feedback.
- **SC-002**: In all login acceptance cases, the first two failed attempts show the correct remaining count and the third failed attempt blocks access.
- **SC-003**: In all valid deposit, withdrawal, and transfer acceptance cases, displayed balances match the resulting operations; in all rejected cases, balances remain unchanged.
- **SC-004**: Every completed movement in acceptance testing displays its date, time, type, and amount, and the complete history is ordered newest first.
- **SC-005**: Customers can complete registration, sign-in, a basic account operation, and review of its history in under five minutes in a usability test without assistance.
- **SC-006**: The primary banking journeys remain usable at desktop, tablet, and mobile viewport sizes with no blocking content overlap or inaccessible controls.
- **SC-007**: For installment counts of 1, 2, 3, 6, and 7, every credit-card scenario displays the specified interest tier and a monthly installment amount matching the simple-interest rule to two decimal places, including any final-installment rounding adjustment.
- **SC-008**: 100% of registration and sign-in entry points display the academic-simulation and no-real-credentials warning before a customer enters credentials.
- **SC-009**: 100% of registration entry points display the same-device data limitation and no-recovery warning before a customer creates an account.
- **SC-010**: In every accepted credit-card purchase scenario, the original purchase amount is less than or equal to available credit; every exceeding purchase is rejected without a transaction or available-credit change.
- **Savings Account**: A deposit product with a customer-selected non-negative initial balance, monthly interest rate, and a no-negative-balance withdrawal rule.
- **Checking Account**: A deposit product with a customer-selected non-negative initial balance, no interest, and an overdraft limit.
- **Credit Card Transaction**: A purchase amount, installment count, applicable monthly interest tier, monthly installment amount, and the reduction it applies to available credit.

## Assumptions

- Each customer receives one savings account, one checking account, and one credit-card product at registration; the customer supplies non-negative initial balances and credit limit. Positive initial account balances are simulated consignations; zero values create no opening movement.
- Transfer destinations are selected from existing products, and the customer reviews the amount and destination before confirming the transfer.
- The overdraft allowance is 20% of the positive current balance immediately before withdrawal; an account with a zero or negative balance has no additional overdraft allowance.
- Monthly savings interest is credited only at the first accepted cash withdrawal of each calendar month; transfers do not trigger or consume that monthly credit.
- Currency is Colombian pesos (COP), and monetary amounts are displayed to two decimal places where applicable.
- The third consecutive failed sign-in attempt blocks the account; account recovery or unlocking is outside this feature.
- The feature covers simulated customer, product, and movement management within Mi Plata; external payment processing, settlement with other financial institutions, and physical cash handling are out of scope.
- The feature covers simulated customer, product, and movement management within Mi Plata; external payment processing, settlement with other financial institutions, card payments, and physical cash handling are out of scope. Accepted card purchases consume available credit for the duration of this feature because no repayment flow is defined.
- Deleting a customer removes their profile and products but retains movement facts (date, time, type, and amount) without links to the deleted customer or products; account recovery after deletion is not included.
- Project-wide technical constraints and the required object-oriented design remain governed by the project constitution and are not repeated as implementation instructions in this user-facing specification.
- Customer and movement data remain available only on the device and browser where the customer used Mi Plata; clearing locally retained data permanently removes access to those records, and no recovery process is provided.
- This is an academic simulation, not a real banking service; users must not enter real credentials because passwords may be readable in retained customer data.
