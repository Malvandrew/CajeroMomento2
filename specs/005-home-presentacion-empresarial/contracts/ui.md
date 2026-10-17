# UI Contract: Presentación Empresarial e Historia de Mi Plata

## Home Presentation

- Una sección de presentación empresarial aparece en el home público, separada de
  los productos disponibles.
- El texto indica que Mi Plata es un banco digital enfocado en la satisfacción de
  sus usuarios y que nació como proyecto académico.
- Tres láminas presentan el origen en el segundo semestre de 2026, el hito de más
  de 10 clientes y la afirmación de mayor importancia del CESDE.
- El contenido identifica estos mensajes como presentación del proyecto académico;
  no los presenta como datos dinámicos o verificados de un banco real.

## Carousel Interaction

- La región tiene un nombre accesible que identifica la historia de Mi Plata.
- El carrusel avanza automáticamente cada dos segundos mientras no está pausado.
- Los controles visibles son botones `<` (anterior) y `>` (siguiente), con nombres
  accesibles que describen cada acción y funcionamiento por teclado.
- Solo la lámina seleccionada presenta su contenido; la posición actual de tres es
  identificable para personas que usan tecnologías de asistencia.
- Siguiente en la última lámina muestra la primera; anterior en la primera muestra
  la última.
- Al activar un control, la lámina cambia inmediatamente y el siguiente avance se
  programa dos segundos después; el foco permanece en el control accionado.
- La rotación se pausa mientras el puntero está sobre el carrusel o el foco está
  dentro de él. Solo se reanuda cuando ambos salen, con dos segundos completos de
  espera antes del siguiente avance.
- Las láminas no dependen de animaciones para transmitir la información.

## Footer and Existing Behavior

- El footer contiene literalmente: “Desarrollo para el segundo momento CESDE,
  materia FrontEnd1, Docente Beautyful Albeiro.”
- Se conservan el aviso “Mi Plata · Simulación académica” y los enlaces sociales
  actuales.
- La navegación principal, botones de acceso y registro, y productos disponibles
  conservan su contenido y comportamiento.
- En escritorio, tablet y móvil, la sección, controles, hitos y crédito no se
  recortan, solapan ni provocan desplazamiento horizontal.