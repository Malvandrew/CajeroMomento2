# Research: Identificar Titulares en Transferencias

## Decision 1: Resolver el nombre en el servicio

**Decision**: En las listas de origen y destino de `ServicioTransferencias`,
resolver `nombreCompleto` buscando el cliente cuyo ID coincide con el `clienteId`
de cada producto elegible.

**Rationale**: El servicio ya carga estado y crea los objetos que consume la UI.
Centralizar ahí el dato mantiene la relación producto-titular fuera de la
presentación y evita que la UI consulte almacenamiento o reciba objetos cliente
completos.

**Alternatives considered**:
- Buscar titulares desde `Transferencias.mjs`: descartado porque trasladaría la
  relación de datos y el acceso al estado a la interfaz.
- Persistir una copia del nombre en cada producto: descartado porque duplica datos
  y puede quedar desactualizado al editar el perfil.

## Decision 2: Conservar el ID como clave y selección

**Decision**: Devolver el mismo `id` en cada opción; la UI conserva ese ID en el
valor seleccionado. El texto visible mantiene el tipo y el sufijo de seis
caracteres del ID que ya se muestra, y agrega el nombre completo del titular.

**Rationale**: El servicio de transferencia recibe IDs de productos y ya valida la
cuenta de origen y destino con esos valores. Mantenerlos preserva exactamente la
selección y el comportamiento financiero.

**Alternatives considered**:
- Usar el nombre como value de selección: descartado porque los nombres pueden
  repetirse y no identifican un producto de forma única.
- Cambiar el formato visible del número de cuenta: descartado porque el usuario
  pidió agregar el titular, no cambiar la identificación existente.

## Decision 3: Limitar la información a nombre completo

**Decision**: Añadir únicamente `nombreCompleto` del titular en cada lista,
incluidas las cuentas destino de otros clientes, conforme al alcance asumido por
la SPEC. No devolver ni presentar usuario, identificación, celular o contraseña.

**Rationale**: El nombre completo permite reconocer a la persona que recibirá o
proporciona fondos. Limitar los datos expuestos reduce información personal visible
en el selector. La exposición de titulares de destino está expresamente recogida
en la SPEC.

**Alternatives considered**:
- Mostrar solo titulares de cuentas propias: descartado porque no ayudaría a
  identificar destinatarios externos, que son elegibles en el flujo actual.
- Mostrar username o datos adicionales: descartado porque la SPEC establece el
  nombre completo y excluye otros datos personales.

## Decision 4: Mantener filtros y resultados

**Decision**: No cambiar filtros de productos elegibles, lista vacía/deshabilitada,
valor de las opciones ni el proceso de transferencia. Actualizar destinos tras
cambiar origen como hasta ahora, incluyendo el titular en cada opción generada.

**Rationale**: El cambio es de presentación e identificación; los saldos, reglas de
ahorro/corriente, confirmación e historial quedan fuera del alcance.

**Alternatives considered**:
- Alterar la elegibilidad para ocultar cuentas con titulares repetidos o nombre
  vacío: descartado porque el feature no debe cambiar los destinos permitidos.

## Repository Evidence

- `src/services/ServicioTransferencias.mjs` carga el estado local, filtra productos
  elegibles y devuelve objetos de origen/destino con ID y nombre de tipo.
- `src/ui/Transferencias.mjs` crea `<option>` con el ID completo como `value` y
  muestra el tipo más los últimos seis caracteres del ID.
- `src/models/Cliente.mjs` guarda `nombreCompleto`; los productos guardan
  `clienteId`. `EstadoAplicacion.mjs` valida las colecciones, pero no impone
  integridad referencial entre ambas.
- `tests/` no contiene pruebas de transferencias ni un entorno DOM. El runner
  integrado `node:test` está disponible para la suite existente y el selector UI
  se verifica manualmente en navegador.