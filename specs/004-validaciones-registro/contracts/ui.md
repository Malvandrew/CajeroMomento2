# UI Contract: Validaciones de Datos en el Registro

## Registration Fields

- El formulario existente conserva sus campos, etiquetas, orden y reglas de
  obligatoriedad.
- Nombre completo acepta letras, incluidas tildes y ñ, y espacios; rechaza números
  y puntuación.
- Número de identificación y celular aceptan únicamente dígitos del 0 al 9.
  Rechazan espacios, signos y separadores, y permiten ceros iniciales.
- La longitud de estos campos no recibe límites nuevos.

## Validation Feedback

- Al salir de cada campo, se muestra un mensaje específico si el valor contiene
  caracteres no permitidos.
- Al enviar el formulario, se vuelven a validar los tres campos y se muestran
  todos los errores aplicables.
- Los mensajes explican qué caracteres admite el campo y se asocian con el control
  correspondiente para tecnologías de asistencia.
- Al corregir un valor y salir del campo, se actualiza o elimina su error si ahora
  cumple la regla.
- Si hay un error de caracteres, el formulario no completa el registro ni invoca
  la operación de registro.
- Las validaciones existentes, como campos obligatorios, usuario duplicado,
  identificación duplicada y confirmación de contraseña, conservan su
  comportamiento.

## Accessibility and Existing Behavior

- Los controles conservan etiquetas explícitas y los mensajes de error son
  perceptibles por tecnologías de asistencia.
- El feedback de error usa el mecanismo de mensajes accesibles existente.
- No se rediseña el formulario ni se cambian navegación, persistencia o flujo de
  registro válido.