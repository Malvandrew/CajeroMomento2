# Research: Validaciones de Datos en el Registro

## Decision 1: Compartir una validación pura

**Decision**: Definir las reglas de los tres campos en una utilidad pura de
`src/utils/ValidacionRegistro.mjs`. La interfaz la consultará para mostrar
feedback; `ServicioAutenticacion` la consultará de nuevo antes de crear o guardar
el cliente.

**Rationale**: La regla se mantiene en un solo lugar y el servicio protege la
integridad del registro aunque se invoque sin pasar por la interfaz. Esto sigue la
separación de responsabilidades existente y permite probar las reglas sin DOM ni
almacenamiento.

**Alternatives considered**:
- Validar solo en la interfaz: descartado porque una llamada directa al servicio
  podría guardar datos inválidos.
- Duplicar expresiones de validación en UI y servicio: descartado porque ambas
  reglas podrían divergir con cambios futuros.
- Crear una clase o agregar una dependencia de validación: descartado por ser
  innecesario para tres comprobaciones simples.

## Decision 2: Validar antes de normalizar

**Decision**: Evaluar identificación y celular con los valores originales antes de
aplicar `trim()` u otra normalización que elimine caracteres. Conservar la
normalización actual para los valores que ya pasaron las reglas.

**Rationale**: `ServicioAutenticacion.registrar` actualmente recorta identificación,
nombre y celular antes de verificar campos obligatorios. Si se validaran los
valores recortados, una identificación como `" 0123 "` se aceptaría aunque la SPEC
rechaza espacios. Validar primero evita esa discrepancia y conserva los ceros
iniciales porque los campos se tratan como texto.

**Alternatives considered**:
- Validar después del recorte: descartado porque permite separadores inválidos en
  los extremos.
- Convertir identificación o celular a número: descartado porque elimina ceros
  iniciales y no representa correctamente estos identificadores.

## Decision 3: Reglas de caracteres y momento del feedback

**Decision**: Aceptar letras Unicode y espacios en el nombre; aceptar únicamente
dígitos ASCII del 0 al 9 en identificación y celular. Validar al salir de cada
campo y al enviar el formulario; limpiar o actualizar el mensaje al salir del
campo corregido.

**Rationale**: Las letras Unicode cubren tildes y ñ sin limitar el nombre al
alfabeto ASCII. Los dígitos explícitos mantienen identificadores y teléfonos como
cadenas. La interacción corresponde a la aclaración aceptada en la SPEC.

**Alternatives considered**:
- Aceptar solo letras ASCII: descartado porque rechazaría nombres válidos en
  español.
- Validar en cada pulsación: descartado porque puede mostrar errores mientras la
  persona todavía está completando el valor.
- Validar únicamente al enviar: descartado porque posterga el feedback acordado.

## Decision 4: Pruebas sin dependencias adicionales

**Decision**: Usar el runner integrado `node:test` para pruebas unitarias de la
utilidad y del servicio, con almacenamiento falso para verificar que los rechazos
no persisten clientes. Verificar la interacción de blur y envío desde el navegador.

**Rationale**: El repositorio usa módulos `.mjs`, `tests/` está vacío y no existe
`package.json` ni una dependencia de pruebas. El runner nativo evita instalar
herramientas para una funcionalidad acotada.

**Alternatives considered**:
- Incorporar un framework de pruebas o DOM: descartado porque no hay una necesidad
  que justifique añadir dependencias para estas reglas puras.
- Confiar únicamente en revisión manual: descartado porque las reglas y la
  ausencia de persistencia ante errores son comprobables automáticamente.

## Repository Evidence

- `src/ui/Registro.mjs` actualmente trata el envío del formulario, llama al
  servicio y presenta sus excepciones en un feedback general; no valida los tres
  campos al salir de ellos.
- `src/services/ServicioAutenticacion.mjs` recorta los valores personales, valida
  obligatoriedad y unicidad, construye el cliente y persiste el estado candidato.
- `src/utils/Dinero.mjs` es una utilidad pura existente, consistente con el lugar
  propuesto para reglas de validación independientes.
- `src/ui/Renderizado.mjs` crea mensajes con roles `alert` o `status`, reutilizables
  para feedback accesible.
- `tests/` no contiene pruebas y el repositorio no tiene manifiesto de dependencias;
  `node --test` está disponible para pruebas nuevas.