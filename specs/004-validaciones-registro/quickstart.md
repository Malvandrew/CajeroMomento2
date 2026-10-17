# Quickstart: Validaciones de Datos en el Registro

## Prerequisites

- Node.js con soporte para `node:test`.
- Un navegador compatible con los módulos JavaScript de la aplicación.
- Ejecutar los comandos desde la raíz del repositorio.

## Automated Validation

Después de implementar las pruebas del feature, ejecutar:

```sh
node --test tests/validacionRegistro.test.mjs tests/servicioAutenticacionRegistro.test.mjs
```

Las pruebas deben cubrir las reglas de caracteres, ceros iniciales, mensajes o
resultados por campo, y el rechazo del servicio sin guardar el estado cuando los
valores contienen caracteres inválidos.

## Browser Validation

1. Servir el repositorio desde su raíz:

   ```sh
   python3 -m http.server 8000
   ```

2. Abrir `http://localhost:8000/` y navegar al formulario de registro.
3. Ingresar un nombre con tildes, ñ y espacios; ingresar identificación y celular
   formados por dígitos, incluidos valores que comiencen con cero. Al salir de cada
   campo, no debe aparecer un error de caracteres.
4. Ingresar un número o signo de puntuación en el nombre. Al salir del campo debe
   aparecer el mensaje correspondiente; corregirlo y salir del campo debe retirar
   o actualizar el error.
5. Ingresar letras o espacios en identificación o celular. Al salir de cada campo
   debe aparecer un mensaje que indique que solo admite dígitos.
6. Enviar el formulario con varios campos inválidos. Todos deben señalarse, no
   debe completarse el registro y no debe crearse el cliente ni sus productos.
7. Corregir los valores y completar los demás datos válidos. El registro debe
   conservar el comportamiento exitoso existente.

## Expected Results

- Valores válidos pasan las reglas de caracteres sin perder ceros iniciales.
- Los errores aparecen al salir del campo y al enviar; corregirlos permite
  continuar.
- Ningún dato inválido crea ni persiste un cliente o productos.
- Las reglas existentes de obligatoriedad y registro válido permanecen intactas.