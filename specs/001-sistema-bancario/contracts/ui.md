# User Interface Contract

## Entry and Navigation

- The public landing page presents institutional information, navigation, registration, sign-in, footer, and social links.
- A visitor can enter registration or sign-in from the landing page.
- A signed-in customer can access the banking panel; signing out returns to the public landing page and blocks panel access until another successful sign-in.
- A customer can reach balance inquiry, deposits, withdrawals, transfers, movement history, profile, and password change from the panel.

## Registration and Sign-In

- Registration requests identification number, full name, mobile number, username, password, and password confirmation.
- The interface reports missing fields, duplicate identification/username, and password mismatch without creating a customer.
- Registration asks for a numeric, non-negative opening balance for savings, a numeric, non-negative opening balance for checking, and a numeric, non-negative initial credit-card limit. Zero is valid.
- Successful registration creates one savings account and one checking account at their entered opening balances and one credit card at its entered limit. Positive opening balances appear in history as consignation movements; zero balances create no opening movement.
- Before credentials are entered, registration and sign-in disclose that this is an academic simulation, passwords may be readable in retained data, and real banking credentials must not be used.
- Registration discloses that data is limited to the same device/browser and cannot be recovered after local data is cleared.
- Sign-in displays attempts remaining after failure; the third consecutive failed attempt presents a blocked state. Successful sign-in resets the consecutive failure count.

## Banking Operations

- Balance inquiry identifies the selected product and displays its current balance.
- Deposit and withdrawal forms accept only positive numeric amounts; rejected operations show an error and leave displayed balances unchanged.
- Savings shows the monthly interest amount on the first accepted cash withdrawal of the calendar month; a transfer from savings does not trigger that credit.
- Checking explains rejection when the withdrawal exceeds the balance plus the 20% overdraft allowance.
- Transfer confirmation identifies distinct source and destination products and amount. Success displays updated balances and a recorded movement; failure displays an error without partial balance changes.
- Credit-card transaction entry displays the interest tier and calculated monthly installment for the selected term. A purchase greater than available credit is rejected without creating a transaction or changing available credit.

## History, Profile, and Deletion

- Movement history displays date, time, type, and amount in descending date/time order.
- Profile editing validates required fields and username uniqueness. Password change requires username, current password, new password, and matching confirmation.
- Customer deletion requires explicit confirmation. After confirmation, the profile and products are removed; retained movements no longer link to the deleted customer or products.
- Success, error, and warning feedback is visible, understandable, and usable on desktop, tablet, and mobile.

## Persistence and Failure Feedback

- Customer, product, movement, and card-transaction information is local to the current browser/device. The interface does not promise synchronization, backup, or recovery.
- If an operation is rejected or local persistence fails, the UI does not show success or publish candidate balances; it presents a recoverable error message where the page remains usable.
