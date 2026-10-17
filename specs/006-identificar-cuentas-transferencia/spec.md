# Feature Specification: Identificar Titulares en Transferencias

**Feature Branch**: `[006-identificar-cuentas-transferencia]`

**Created**: 2026-10-16

**Status**: Draft

**Input**: User description: "Necesito que en la sección transferir, donde se muestra la lista de los productos, esta lista no solo muestre el tipo y número de cuenta sino también el nombre del usuario, para identificarlas más fácil."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identificar las cuentas antes de transferir (Priority: P1)

Una persona que realiza una transferencia quiere distinguir las cuentas de origen y destino mediante el tipo de producto, el número de cuenta y el nombre completo de su titular, para seleccionar correctamente cada cuenta.

**Why this priority**: La información del titular ayuda a diferenciar cuentas y reduce el riesgo de escoger un destino equivocado.

**Independent Test**: Abrir la sección de transferencias y comprobar que cada opción de origen y destino muestra tipo de producto, número de cuenta y nombre completo del titular. Seleccionar opciones y verificar que se mantiene la cuenta correspondiente y que la transferencia conserva su comportamiento actual.

**Acceptance Scenarios**:

1. **Given** una persona autenticada con cuentas elegibles para transferir, **When** consulta la lista de cuentas de origen, **Then** cada opción muestra el tipo de producto, el número de cuenta y el nombre completo de su titular.
2. **Given** que existen cuentas elegibles de destino, **When** la persona consulta los destinos disponibles, **Then** cada opción muestra el tipo de producto, el número de cuenta y el nombre completo del titular de esa cuenta.
3. **Given** dos opciones con el mismo tipo de producto o titulares con el mismo nombre, **When** la persona compara las opciones, **Then** el número de cuenta permite distinguirlas.
4. **Given** una persona que selecciona una cuenta de origen y otra de destino, **When** confirma una transferencia válida, **Then** se mantienen las reglas y el resultado actuales de la transferencia y cada selección corresponde a la cuenta elegida.

### Edge Cases

- Dos titulares pueden tener el mismo nombre completo; el número de cuenta debe seguir distinguiendo sus opciones.
- Un titular puede tener varias cuentas del mismo tipo; cada opción debe mostrar el número correspondiente.
- Un nombre completo largo debe permanecer legible en los controles de origen y destino sin ocultar tipo ni número de cuenta.
- Al cambiar la cuenta de origen, la lista actualizada de destinos debe seguir mostrando la información identificadora completa.
- Si no hay cuentas elegibles de destino, se conserva el comportamiento existente para la lista vacía o deshabilitada.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La sección de transferencias MUST mostrar, en cada opción de cuenta de origen y destino, el tipo de producto, el número de cuenta y el nombre completo del titular.
- **FR-002**: El nombre mostrado MUST ser el nombre completo registrado del titular, no su nombre de usuario de inicio de sesión.
- **FR-003**: Al cambiar la cuenta de origen y actualizar los destinos disponibles, cada opción de destino MUST conservar sus tres datos identificadores.
- **FR-004**: Agregar el nombre del titular MUST NOT cambiar la elegibilidad de las cuentas de origen o destino, la cuenta asociada a cada opción ni las reglas, confirmación o resultado de la transferencia.
- **FR-005**: Las listas MUST permitir distinguir cuentas del mismo tipo y titulares con nombres iguales mediante el número de cuenta.
- **FR-006**: El tipo de producto, el número de cuenta y el nombre completo MUST permanecer legibles en escritorio, tablet y móvil.
- **FR-007**: La información adicional MUST limitarse al nombre completo del titular; no se mostrarán contraseña, celular, identificación ni otros datos personales.

### Key Entities *(include if feature involves data)*

- **Cuenta**: Producto elegible que se presenta como opción de origen o destino; se identifica por tipo y número de cuenta y pertenece a un titular.
- **Titular**: Cliente propietario de la cuenta; aporta el nombre completo que se muestra junto a cada opción.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de las opciones elegibles de origen y destino muestran tipo de producto, número de cuenta y nombre completo del titular.
- **SC-002**: En el 100% de los casos de prueba con titulares duplicados o varias cuentas del mismo tipo, el número de cuenta permite distinguir la opción seleccionada.
- **SC-003**: El 100% de las pruebas de transferencia válidas y rechazadas conserva el mismo resultado y las mismas reglas que antes del cambio de presentación.
- **SC-004**: En el 100% de las revisiones a 1280, 768 y 375 píxeles de ancho, los tres datos identificadores permanecen legibles y no causan solapamiento ni desbordamiento horizontal.
- **SC-005**: Al menos 9 de cada 10 participantes de una prueba pueden identificar el titular y seleccionar la cuenta solicitada desde las listas de origen y destino sin ayuda.

## Assumptions

- “Nombre del usuario” se interpreta como el nombre completo registrado del titular, no como el identificador usado para iniciar sesión.
- La información del titular se muestra tanto para las cuentas propias como para las cuentas disponibles de otros titulares en los destinos.
- El número de cuenta conserva la presentación que ya existe en las listas; esta funcionalidad solo agrega el nombre del titular.
- Las reglas sobre cuentas elegibles, selección, validaciones, saldos e historial de transferencias permanecen sin cambios.
- El nombre completo se considera necesario para identificar la cuenta en la simulación; no se expondrán otros datos personales.