# Data Model: Identificar Titulares en Transferencias

## Existing Persisted Entities

No se agregan campos ni cambia el esquema almacenado.

### Cliente

- `id`: clave del titular usada para relacionarlo con productos.
- `nombreCompleto`: nombre registrado que se mostrará junto a sus cuentas.
- No se mostrarán `usuario`, identificación, celular ni contraseña.

### Producto

- `id`: permanece como identificador único y valor de selección.
- `clienteId`: relaciona el producto con su titular.
- `tipo`: determina el nombre visible del producto elegible.
- `saldoCentavos`: sigue disponible para el origen conforme a las reglas existentes;
  no es parte del cambio de etiqueta.

## Transient Transfer Option

Cada opción presentada combina los datos existentes del producto y su titular:

| Dato visible | Origen |
|--------------|--------|
| Tipo de producto | Tipo elegible de la cuenta. |
| Número de cuenta mostrado | Sufijo de seis caracteres del ID, igual que en la vista actual. |
| Nombre del titular | `nombreCompleto` del cliente cuyo `id` coincide con `clienteId`. |

La selección conserva el ID completo del producto. No se persiste una etiqueta ni
una copia del nombre en el producto.