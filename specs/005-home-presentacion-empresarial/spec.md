# Feature Specification: Presentación Empresarial e Historia de Mi Plata

**Feature Branch**: `[005-home-presentacion-empresarial]`

**Created**: 2026-10-16

**Status**: Draft

**Input**: User description: "Necesito adicionar en el home, una sección de presentación empresarial que indique que somos un banco digital, enfocado en la satisfacción de los usuarios, que empezamos como un proyecto académico y ahora somos el banco más importante del CESDE, que este tenga un carrusel en el que se muestre la historia: nacimos en el segundo semestres del 2026 y ahora tenemos más de 10 clientes. Adicional, adicionar en el footer: Desarrollo para el segundo momento CESDE, materia FrontEnd1, Docente Beautyful Albeiro."

## Clarifications

### Session 2026-10-16

- Q: ¿Qué debe hacer el carrusel al llegar a su primera o última lámina? → A: Volver a la primera después de la última y a la última antes de la primera.
- Q: Al salir el puntero o el foco del carrusel, ¿debe esperar dos segundos completos antes de cambiar de lámina? → A: Sí; al reanudar, esperar dos segundos completos antes del siguiente avance.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Conocer la identidad y trayectoria de Mi Plata (Priority: P1)

Una persona que visita el home quiere entender qué es Mi Plata y conocer sus hitos principales mediante una presentación empresarial y un carrusel, sin tener que iniciar sesión.

**Why this priority**: La presentación y la historia dan contexto al proyecto desde la página inicial y hacen visibles su propósito académico y su evolución.

**Independent Test**: Abrir el home y comprobar que la presentación comunica que Mi Plata es un banco digital enfocado en la satisfacción de sus usuarios; verificar que el carrusel cambia de lámina cada dos segundos mientras no está pausado y que muestra el origen académico en el segundo semestre de 2026 y los hitos de más de 10 clientes y mayor importancia en CESDE.

**Acceptance Scenarios**:

1. **Given** una persona que visita el home, **When** consulta la presentación empresarial, **Then** entiende que Mi Plata se presenta como un banco digital enfocado en la satisfacción de sus usuarios y que nació como proyecto académico.
2. **Given** que el carrusel muestra la historia de Mi Plata, **When** la persona avanza por sus láminas, **Then** puede consultar el origen en el segundo semestre de 2026 y el hito actual de más de 10 clientes y mayor importancia en CESDE.
3. **Given** una lámina del carrusel, **When** pasan dos segundos sin pausa o la persona activa los botones `<` o `>`, **Then** el carrusel avanza automáticamente o en la dirección indicada, mantiene la navegación circular y permite reconocer la lámina actual.
4. **Given** que la persona recorre la presentación, **When** continúa hacia el resto del home, **Then** la navegación, las acciones existentes y la sección de productos disponibles conservan su comportamiento.

### User Story 2 - Consultar los créditos académicos (Priority: P2)

Una persona que visita el home quiere saber el contexto académico del proyecto y quién lo acompaña, mediante los créditos visibles en el footer.

**Why this priority**: La atribución deja claro el marco académico de Mi Plata y reconoce el momento, la materia y el docente indicados.

**Independent Test**: Abrir el home y comprobar que el footer muestra el crédito solicitado, además del aviso de simulación académica y los enlaces que ya existían.

**Acceptance Scenarios**:

1. **Given** que se muestra el home, **When** la persona consulta el footer, **Then** encuentra el texto “Desarrollo para el segundo momento CESDE, materia FrontEnd1, Docente Beautyful Albeiro.”
2. **Given** el footer actualizado, **When** la persona consulta sus demás contenidos, **Then** el aviso “Mi Plata · Simulación académica” y los enlaces sociales existentes siguen visibles y funcionales.

### Edge Cases

- En pantallas estrechas, el carrusel y los créditos se adaptan al ancho disponible sin solaparse, recortarse ni causar desplazamiento horizontal.
- Al avanzar desde la última lámina, el carrusel muestra la primera; al retroceder desde la primera, muestra la última.
- La rotación automática se pausa mientras el puntero está sobre el carrusel o el foco de teclado permanece dentro de él, y se reanuda al retirar ambos.
- Al reanudar la rotación tras retirar el puntero y el foco, el siguiente cambio ocurre después de dos segundos completos.
- Cuando la persona usa `<` o `>`, el carrusel cambia de inmediato y el siguiente avance automático ocurre dos segundos después de esa acción.
- Los botones muestran `<` para anterior y `>` para siguiente, y sus nombres accesibles comunican la acción sin depender del símbolo visual.
- El texto largo del crédito docente se mantiene legible en móvil y escritorio.
- La presentación no oculta ni reemplaza la navegación principal, las acciones de acceso o registro, ni la sección de productos.
- Los hitos de clientes se presentan como contenido editorial de la simulación, no como una consulta dinámica de los clientes registrados.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El home MUST incluir una sección de presentación empresarial de Mi Plata, visible sin autenticación y diferenciada del contenido de productos.
- **FR-002**: La presentación MUST comunicar que Mi Plata es un banco digital enfocado en la satisfacción de sus usuarios y que nació como proyecto académico.
- **FR-003**: El home MUST incluir un carrusel con tres hitos: el origen académico en el segundo semestre de 2026; el hito actual de más de 10 clientes; y la afirmación solicitada de que Mi Plata es el banco más importante del CESDE. Los hitos podrán distribuirse entre las láminas siempre que todos sean consultables.
- **FR-004**: El carrusel MUST avanzar automáticamente cada dos segundos mientras no esté pausado; MUST mostrar controles manuales `<` para anterior y `>` para siguiente con nombres accesibles; MUST identificar la posición actual y MUST ser circular. Activar un control MUST cambiar la lámina inmediatamente y reiniciar el intervalo de dos segundos.
- **FR-009**: El carrusel MUST pausar el avance automático mientras el puntero esté sobre su región o el foco de teclado esté dentro de ella. Cuando ambos salgan de la región, MUST reanudar la rotación e iniciar un intervalo completo de dos segundos antes del siguiente avance.
- **FR-005**: La presentación MUST dejar claro que los mensajes y los hitos describen el proyecto académico Mi Plata; no MUST presentarlos como cifras verificadas de una entidad financiera real ni como datos dinámicos de las cuentas locales.
- **FR-006**: El footer MUST mostrar literalmente: “Desarrollo para el segundo momento CESDE, materia FrontEnd1, Docente Beautyful Albeiro.”
- **FR-007**: La actualización MUST conservar el aviso de simulación académica, los enlaces sociales, la navegación, las acciones existentes y la sección de productos disponibles.
- **FR-008**: La presentación, los controles del carrusel y los créditos MUST permanecer legibles y utilizables en escritorio, tablet y móvil, sin recorte, solapamiento ni desbordamiento horizontal.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En el 100% de las revisiones del home, se encuentran la presentación empresarial y los tres hitos requeridos sin iniciar sesión.
- **SC-002**: En el 100% de las pruebas de navegación, una lámina avanza automáticamente cada dos segundos sin pausa y, tras reanudar desde hover o foco, espera dos segundos completos; los controles `<` y `>` cambian la lámina inmediatamente, reinician el intervalo y recorren las tres láminas circularmente con la posición actual reconocible.
- **SC-003**: El 100% de las revisiones del footer encuentran el crédito académico con el texto solicitado y conservan visibles el aviso de simulación y los enlaces sociales existentes.
- **SC-004**: En pruebas a 1280, 768 y 375 píxeles de ancho, todo el contenido añadido permanece legible, sin recorte, solapamiento ni desplazamiento horizontal.
- **SC-005**: Al menos 9 de cada 10 participantes de una prueba pueden identificar que Mi Plata es un proyecto académico y encontrar sus hitos de origen y crecimiento en menos de un minuto.

## Assumptions

- La presentación se muestra como parte de la simulación académica descrita por el proyecto; la afirmación de importancia en CESDE es contenido institucional provisto por el usuario, no una clasificación independiente.
- Los hitos son contenido editorial fijo de esta versión: el proyecto nació en el segundo semestre de 2026 y actualmente supera los 10 clientes. No se calculan a partir de datos guardados en el navegador.
- El carrusel tiene tres láminas y avanza automáticamente cada dos segundos; se pausa durante hover o foco y espera dos segundos completos al reanudar. Los controles `<` y `>` permiten navegar manualmente, reinician el intervalo y tienen nombres accesibles.
- El texto de atribución se agrega al footer actual sin reemplazar el aviso de simulación académica ni los enlaces sociales.
- El alcance se limita al home y al footer; no modifica productos, autenticación ni operaciones bancarias.