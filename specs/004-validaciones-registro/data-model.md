# Data Model: Validaciones de Datos en el Registro

## Persisted Entities

### Cliente

No se agregan atributos ni cambia la persistencia del cliente. Se conservan los
campos existentes:

| Campo | Representación | Regla de esta funcionalidad |
|-------|----------------|------------------------------|
| `nombreCompleto` | Texto | Solo letras Unicode y espacios; acepta tildes y ñ. |
| `numeroIdentificacion` | Texto | Solo dígitos del 0 al 9; conserva ceros iniciales. |
| `celular` | Texto | Solo dígitos del 0 al 9; conserva ceros iniciales. |

La obligatoriedad, la unicidad de identificación y las demás reglas del registro
continúan vigentes y no se redefinen en este feature. No se agregan límites de
longitud.

## Transient Registration Data

Los valores enviados desde el formulario se evalúan como texto antes de aplicar
normalizaciones que puedan eliminar espacios u otros caracteres. El resultado de
validación es temporal y contiene los errores asociados a los campos inválidos; no
se persiste ni altera el modelo de almacenamiento.

## Validation Outcomes

- Un nombre compuesto por letras y espacios pasa la validación de caracteres.
- Identificación y celular pasan cuando cada carácter es un dígito ASCII entre 0
  y 9; los ceros a la izquierda son significativos.
- Campos vacíos siguen sujetos a la validación obligatoria existente.
- Un valor con caracteres no permitidos bloquea el registro antes de crear el
  cliente o guardar el estado candidato.
- Un valor corregido vuelve a evaluarse al salir del campo y al enviar el
  formulario.