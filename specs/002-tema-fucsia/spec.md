# Feature Specification: Tema Fucsia y Texto Blanco

**Feature Branch**: Not specified (no branch hook ran)  
**Created**: 2026-10-15  
**Status**: Draft  
**Input**: User description: "Ajustar los colores: botones fucsia y letras y números blancos."

## User Scenarios & Testing

### User Story 1 - Leer y usar la interfaz con la nueva paleta (Priority: P1)

Como cliente, quiero que los botones destaquen en fucsia y que el texto y las cifras se vean en blanco para reconocer acciones y leer los datos de Mi Plata en todas las vistas.

**Why this priority**: Los botones indican las acciones disponibles y el texto incluye datos necesarios para operar cuentas, transferencias y tarjeta.

**Independent Test**: Revisar landing, registro, inicio de sesión, panel, cuentas, transferencias, perfil, tarjeta, movimientos y mensajes de estado en escritorio, tablet y móvil; comprobar colores, contraste y que las acciones principales siguen utilizables.

**Acceptance Scenarios**:

1. **Given** una vista de Mi Plata con botones habilitados, **When** el cliente la abre, **Then** todos los botones tienen fondo fucsia y sus etiquetas son blancas.
2. **Given** cualquier vista con títulos, etiquetas, enlaces, campos, tablas, saldos, cupos, cuotas o contadores, **When** el contenido se muestra, **Then** todas las letras y cifras visibles son blancas.
3. **Given** texto blanco sobre un fondo de contenido o botón, **When** se mide el contraste, **Then** el texto normal alcanza al menos 4.5:1 y el texto grande y los indicadores de controles alcanzan al menos 3:1.
4. **Given** botones normales, deshabilitados, enfocados o con el puntero encima, **When** cambia su estado, **Then** se conservan el fondo fucsia y la etiqueta blanca, y el estado puede distinguirse sin depender solo del color.
5. **Given** mensajes de éxito, error o advertencia, **When** aparecen, **Then** su texto permanece blanco, conserva contraste legible y el tipo de mensaje sigue identificándose mediante etiqueta, icono o borde.
6. **Given** una pantalla de escritorio, tablet o móvil, **When** se aplica la paleta, **Then** el texto y las cifras no se recortan, no se solapan y las acciones siguen siendo utilizables.

### User Story 2 - Distinguir estados de interacción (Priority: P2)

Como cliente, quiero seguir identificando foco, deshabilitación, éxito, error y advertencia aunque todos los botones y textos usen los colores solicitados.

**Why this priority**: La consistencia de color no debe ocultar si una acción está disponible o si una operación terminó correctamente.

**Independent Test**: Recorrer con teclado y puntero los botones y formularios de las vistas principales y provocar mensajes de éxito, error y advertencia; verificar que cada estado se reconoce sin cambiar las reglas de negocio.

**Acceptance Scenarios**:

1. **Given** un botón recibe foco de teclado, **When** el foco aparece, **Then** se distingue claramente del fondo fucsia y mantiene texto blanco.
2. **Given** una operación produce éxito, error o advertencia, **When** aparece su mensaje, **Then** texto, etiqueta y señal visual permiten distinguir el estado con contraste suficiente.

### Edge Cases

- Un botón está deshabilitado, enfocado, presionado o bajo el puntero; mantiene su identidad fucsia y texto blanco sin confundirse con un botón habilitado.
- Un formulario muestra un valor numérico, un placeholder o un error de validación; el contenido permanece blanco y legible sobre su fondo.
- Una tabla tiene muchas cifras o se desplaza horizontalmente en móvil; los valores mantienen contraste y no quedan ocultos por el contenedor.
- Un mensaje de éxito, error o advertencia necesita distinguirse; el color blanco del texto no elimina su etiqueta, icono o borde semántico.
- El fucsia exacto elegido no ofrece suficiente contraste con texto blanco; se selecciona un tono fucsia más oscuro sin dejar de percibirse como fucsia.

## Requirements

### Functional Requirements

- **FR-001**: La interfaz MUST mostrar todos los botones habilitados y deshabilitados con fondo fucsia y etiquetas blancas en landing, formularios, panel, navegación, tablas y diálogos.
- **FR-002**: Todo texto y cifra visible MUST ser de color blanco, incluidos títulos, etiquetas, enlaces, valores de campos, saldos, cupos, cuotas, tablas, mensajes y contadores.
- **FR-003**: Los fondos detrás de texto blanco MUST mantener una relación de contraste mínima de 4.5:1 para texto normal y 3:1 para texto grande e indicadores de controles.
- **FR-004**: Los estados normal, hover, focus, pressed y disabled MUST conservar la identidad fucsia del botón y texto blanco; focus y disabled MUST seguir siendo distinguibles mediante señales visuales adicionales a color.
- **FR-005**: Los mensajes de éxito, error y advertencia MUST conservar texto blanco legible y señales no basadas únicamente en color para comunicar su tipo.
- **FR-006**: El cambio de paleta MUST conservar el contenido, la navegación y las operaciones existentes, y MUST permanecer legible y utilizable en escritorio, tablet y móvil sin recorte ni solapamiento.

### Key Entities

Esta actualización visual no introduce ni modifica entidades bancarias.

## Success Criteria

### Measurable Outcomes

- **SC-001**: En una revisión de todas las vistas y estados de interacción, el 100% de los botones usa fondo fucsia con etiquetas blancas y el 100% del texto y cifras visibles aparece en blanco.
- **SC-002**: Todas las combinaciones de texto normal/fondo alcanzan contraste 4.5:1 o superior; texto grande e indicadores de controles alcanzan 3:1 o superior.
- **SC-003**: El 100% de los botones enfocados o deshabilitados y de los mensajes de éxito/error/advertencia puede distinguirse mediante al menos una señal además del color.
- **SC-004**: En las vistas de landing, registro, inicio de sesión, panel, cuentas, transferencias, perfil, tarjeta e historial, no hay texto ni cifras recortados o solapados en los tamaños de escritorio, tablet y móvil revisados.
- **SC-005**: Las acciones de registro, inicio de sesión, navegación del panel y operaciones bancarias existentes siguen completándose sin cambiar su resultado funcional.

## Assumptions

- "Fucsia" se interpreta como un tono fucsia suficientemente oscuro para que las etiquetas blancas cumplan el contraste mínimo indicado; no se exige un código hexadecimal específico.
- Para que todo el texto y las cifras sean blancos, los fondos de página, superficies, campos y mensajes se ajustarán cuando sea necesario a tonos oscuros o coloreados que mantengan el contraste; los botones seguirán siendo fucsia.
- La solicitud abarca todas las vistas y estados actuales de Mi Plata, incluidos formularios, tablas, enlaces, datos numéricos y mensajes de estado.
- No se modificarán estructura, textos, navegación, reglas bancarias ni comportamiento de las operaciones, salvo los cambios visuales necesarios para aplicar y sostener la paleta.
