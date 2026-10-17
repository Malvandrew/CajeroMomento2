# Feature Specification: Fichas de Productos en el Landing

**Feature Branch**: Not specified

**Created**: 2026-10-15

**Status**: Draft

**Input**: User description: "Necesito que los productos que se muestran en el landing, como Cuenta de ahorros, Cuenta corriente y Tarjeta de crédito, aparezcan en un contenedor o sección enmarcada con borde fucsia; que cada producto sea una galleta y tenga una breve descripción."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consultar productos desde el landing (Priority: P1)

Como cliente potencial, quiero reconocer los productos bancarios y entender brevemente para qué sirve cada uno desde la página de inicio, para compararlos sin iniciar sesión ni navegar a otra sección.

**Why this priority**: La sección de productos es el primer resumen visible de la oferta de Mi Plata y debe permitir identificarla rápidamente.

**Independent Test**: Abrir la página de inicio y confirmar que aparece una sección destacada con los tres productos actuales, cada uno en una ficha visual compacta con nombre y descripción breve, legible en escritorio, tablet y móvil.

**Acceptance Scenarios**:

1. **Given** que una persona visita la página de inicio, **When** consulta la sección de productos disponibles, **Then** encuentra Cuenta de ahorros, Cuenta corriente y Tarjeta de crédito dentro de una sección enmarcada con borde fucsia.
2. **Given** que se muestra cualquiera de los tres productos, **When** la persona lo lee, **Then** identifica su nombre y una descripción breve en una ficha individual claramente diferenciada.
3. **Given** que la página se consulta en escritorio, tablet o móvil, **When** aparece la sección de productos, **Then** los nombres y descripciones siguen legibles, no se solapan ni quedan recortados y la página no presenta desbordamiento horizontal.
4. **Given** que la persona usa la sección de productos, **When** continúa navegando por el landing, **Then** la navegación y las acciones existentes conservan su comportamiento.

### Edge Cases

- En una pantalla móvil estrecha, las fichas pueden reorganizarse, pero los tres productos deben seguir visibles y legibles sin desbordar la página.
- Una descripción más larga que las demás no debe causar solapamiento, recorte ni impedir distinguir una ficha de otra.
- El borde fucsia de la sección debe seguir siendo perceptible sobre el fondo actual, sin reducir la legibilidad del texto.
- Si los productos actuales cambian en el futuro, esta sección no debe presentar nombres, beneficios o condiciones financieras que contradigan los productos disponibles.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La página de inicio MUST presentar los productos disponibles en una sección visualmente agrupada y enmarcada con un borde fucsia.
- **FR-002**: La sección MUST mostrar los tres productos actuales: Cuenta de ahorros, Cuenta corriente y Tarjeta de crédito.
- **FR-003**: Cada producto MUST aparecer en una ficha individual compacta y visualmente diferenciada, con su nombre y una descripción breve.
- **FR-004**: Las descripciones MUST explicar el propósito general de cada producto sin añadir condiciones, beneficios o reglas financieras que contradigan las vigentes.
- **FR-005**: La expresión "galleta" se interpreta como una ficha visual compacta para cada producto; las fichas son informativas y no añaden acciones ni navegación propias.
- **FR-006**: La sección MUST permanecer legible y utilizable en escritorio, tablet y móvil, sin recorte, solapamiento ni desbordamiento horizontal de la página.
- **FR-007**: El cambio MUST conservar la navegación, el contenido ajeno a los productos y el comportamiento existente de Mi Plata.

### Descripciones de referencia

- **Cuenta de ahorros**: "Ahorra, consigna y retira dinero; genera interés según las condiciones del producto."
- **Cuenta corriente**: "Administra tus movimientos cotidianos con sobregiro sujeto a las condiciones de la cuenta."
- **Tarjeta de crédito**: "Realiza compras con tu cupo disponible y paga en cuotas, con intereses según el plazo."

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de los tres productos disponibles aparece en la sección del landing con nombre y descripción breve.
- **SC-002**: En una revisión de escritorio, tablet y móvil, el 100% de los nombres y descripciones se lee sin recorte ni solapamiento y la página no requiere desplazamiento horizontal.
- **SC-003**: Las personas pueden identificar visualmente la sección de productos por su borde fucsia y distinguir sus tres fichas individuales.
- **SC-004**: La navegación y las acciones existentes del landing completan los mismos recorridos que antes del cambio.

## Assumptions

- "Galleta" se refiere a una ficha compacta de producto, no a una imagen de una galleta ni a un elemento de navegación.
- El borde fucsia enmarca la sección que agrupa los productos; cada ficha se distingue individualmente dentro de esa sección.
- Las descripciones serán de una oración, informativas y compatibles con las reglas actuales de ahorro, cuenta corriente y tarjeta de crédito.
- El cambio se limita a la presentación de productos en el landing; no introduce datos bancarios, nuevas operaciones ni cambios de comportamiento.
