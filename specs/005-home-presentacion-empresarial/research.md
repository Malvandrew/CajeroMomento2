# Research: Presentación Empresarial e Historia de Mi Plata

## Decision 1: Extender el home existente

**Decision**: Renderizar la sección empresarial y el crédito dentro de la plantilla
que ya produce `src/ui/PaginaInicio.mjs`; no crear otra vista ni modificar el
enrutamiento.

**Rationale**: El home, sus productos y el footer ya se construyen juntos en esta
función. `src/main.mjs` la llama durante el arranque y `src/ui/Navegacion.mjs`
controla las vistas mediante `data-view` y los botones `data-navegar`. Mantener los
nuevos controles fuera de esos atributos preserva el comportamiento existente.

**Alternatives considered**:
- Crear una vista adicional: descartado porque la presentación debe pertenecer al
  home y no requiere navegación ni autenticación.
- Modificar `Navegacion.mjs`: descartado porque los controles del carrusel solo
  cambian contenido dentro de una vista activa.

## Decision 2: Carrusel automático con navegación circular

**Decision**: Mantener tres hitos editoriales con un índice temporal. Avanzar
automáticamente cada dos segundos, ciclar en ambos extremos y ofrecer botones
visibles `<` y `>` con nombres accesibles para anterior/siguiente. Una interacción
manual cambia la lámina inmediatamente y reinicia la espera de dos segundos.

**Rationale**: La SPEC define la periodicidad, el ciclo y los símbolos. El contenido
es fijo y no depende de clientes locales, por lo que no requiere servicios ni
almacenamiento. Los botones nativos ofrecen interacción por teclado y conservan el
foco durante el cambio.

**Alternatives considered**:
- Navegación lineal con controles bloqueados en los extremos: descartada por la
  aclaración aceptada.
- Leer el conteo de clientes desde `localStorage`: descartado porque contradice la
  SPEC, que define los hitos como contenido editorial de la simulación.

## Decision 3: Accesibilidad con HTML nativo

**Decision**: Presentar el carrusel como una región identificada; proporcionar
botones `<` y `>` con nombres accesibles, identificación del número de lámina
actual y contenido legible para tecnologías de asistencia. Pausar la rotación
durante hover o foco, reanudar con dos segundos completos cuando ambos terminen, y
no trasladar el foco al contenido al navegar.

**Rationale**: El stack no tiene dependencia de carrusel. Los botones nativos
soportan teclado y conservan la navegación predecible; la posición permite
reconocer el estado. Pausar mientras se lee o se interactúa evita que el cambio
automático compita con esas acciones. El CSS existente ya contempla
`prefers-reduced-motion` para animaciones visuales.

**Alternatives considered**:
- Añadir una librería de carrusel: descartado por el tamaño fijo de tres láminas y
  la simplicidad del comportamiento solicitado.
- Actualizar el foco en cada cambio: descartado porque interrumpe el uso continuo
  de los botones de navegación.

## Decision 4: Temporizador único y pausas coordinadas

**Decision**: Usar un único `setTimeout` de dos segundos, cancelándolo al pausar o
al navegar manualmente y programando uno nuevo al avanzar, al hacer clic o al salir
de hover/foco. Reanudar solo cuando puntero y foco estén ambos fuera del carrusel.

**Rationale**: Un timeout reemplazable reinicia de forma explícita los dos segundos
completos solicitados y evita que un `setInterval` activo compita con clics o
estados de pausa. El renderer actual se ejecuta una vez durante el inicio, por lo
que un temporizador y listeners locales no requieren infraestructura adicional.

**Alternatives considered**:
- Dejar un intervalo permanente y solo cambiar una bandera de pausa: descartado
  porque complica reiniciar exactamente el intervalo después de cada interacción.
- Crear intervalos nuevos al salir de cada evento sin cancelar el anterior:
  descartado porque puede causar avances duplicados.

## Decision 5: Reutilizar responsive y estilos del proyecto

**Decision**: Añadir reglas de presentación y créditos dentro de los breakpoints
existentes del home; verificar 1280, 768 y 375 píxeles y evitar desbordamiento
horizontal.

**Rationale**: `styles/styles.css` ya define una composición de escritorio y cortes
en 760 px y 480 px, incluyendo un home apilado para móvil. Extender esas reglas
mantiene consistencia visual y evita rediseñar otras secciones.

**Alternatives considered**:
- Crear breakpoints o tokens globales nuevos: descartado porque los breakpoints
  actuales cubren los tamaños de aceptación de la SPEC.
- Rediseñar el footer o la sección de productos: descartado porque deben conservar
  su comportamiento.

## Repository Evidence

- `src/ui/PaginaInicio.mjs` produce el header, home, productos, vistas y footer en
  una misma plantilla.
- `src/main.mjs` llama `renderizarPaginaInicio` una vez y luego configura el
  enrutamiento global.
- `src/ui/Navegacion.mjs` responde a `data-navegar` y `data-panel-navegar`; los
  controles del carrusel pueden usar atributos separados.
- `styles/styles.css` contiene layout del home, footer, breakpoints de 760 px y
  480 px, y soporte para movimiento reducido.
- `src/ui/PaginaInicio.mjs` instala actualmente listeners locales de clic en los
  controles del carrusel; el autoplay debe compartir la misma función de cambio y
  coordinar pausa/reanudación para no duplicar el estado.
- Node.js `node:test` está disponible para la suite existente; no hay un entorno
  DOM de pruebas en el proyecto, por lo que la interacción visual se valida en
  navegador.