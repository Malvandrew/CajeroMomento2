# Quickstart: Presentación Empresarial e Historia de Mi Plata

## Prerequisites

- Navegador compatible con módulos ES.
- Ejecutar los comandos desde la raíz del repositorio.

## Automated Regression Check

Ejecutar las pruebas existentes con Node.js:

```sh
node --test tests/*.test.mjs
```

El resultado debe conservar las pruebas existentes de registro y reglas bancarias;
el carrusel y la presentación se verifican visualmente en navegador porque el
repositorio no tiene un entorno DOM de pruebas.

## Browser Validation

1. Iniciar un servidor local:

   ```sh
   python3 -m http.server 8000
   ```

2. Abrir `http://localhost:8000/` y comprobar que la presentación aparece en el
   home sin iniciar sesión.
3. Verificar que el contenido identifica a Mi Plata como banco digital enfocado
   en sus usuarios y como proyecto académico; recorrer las tres láminas y confirmar
   que el carrusel avanza automáticamente cada dos segundos.
4. Mantener el puntero sobre el carrusel y luego mover el foco de teclado dentro
   de él. En ambos casos la rotación debe pausarse y reanudarse al salir; comprobar
   que espere dos segundos completos antes de cambiar.
5. Activar `<` y `>` manualmente. La lámina debe cambiar de inmediato, el intervalo
   debe reiniciarse a dos segundos y la navegación debe ser circular en ambos
   extremos; la posición actual siempre debe ser reconocible.
6. Recorrer los controles solo con teclado y comprobar nombres accesibles, foco
   visible y que el foco permanezca en el botón usado.
7. Confirmar que el footer muestra exactamente el crédito CESDE, FrontEnd1 y
   Beautyful Albeiro, y que conserva el aviso académico y los enlaces sociales.
8. Repetir la revisión a anchos de 1280, 768 y 375 píxeles; no debe haber recorte,
   solapamiento ni desplazamiento horizontal.
9. Confirmar que los enlaces de inicio de sesión/registro, navegación principal y
   productos disponibles siguen funcionando.

## Expected Results

- Los tres hitos se consultan en carrusel circular con autoplay de dos segundos y
   controles manuales accesibles.
- Hover/foco y navegación manual pausan o reinician correctamente el intervalo.
- La presentación y los créditos se leen en los tres tamaños de viewport.
- Navegación, productos, footer existente y comportamiento bancario permanecen
  intactos.
- No se crean ni consultan datos de clientes para mostrar el hito editorial.