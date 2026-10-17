# Data Model: Presentación Empresarial e Historia de Mi Plata

## Persisted Entities

No se agregan entidades, campos del cliente ni datos persistidos. El contenido del
home no consulta ni modifica `localStorage`.

## Static Presentation Content

La vista mantiene contenido editorial estático para:

| Content | Value |
|---------|-------|
| Propósito | Banco digital enfocado en la satisfacción de sus usuarios. |
| Origen | Proyecto académico nacido en el segundo semestre de 2026. |
| Hito actual | Más de 10 clientes. |
| Posicionamiento solicitado | Banco más importante del CESDE, presentado como afirmación del proyecto académico. |
| Crédito | Desarrollo para el segundo momento CESDE, materia FrontEnd1, Docente Beautyful Albeiro. |

Los tres hitos se presentan en las láminas; el crédito se muestra en el footer.

## Transient Carousel State

- `indiceActual`: número temporal de 0 a 2 que identifica la lámina visible.
- Avanzar aplica circulación al extremo final; retroceder aplica circulación al
  extremo inicial.
- El carrusel avanza cada dos segundos mientras no esté pausado; el estado temporal
  distingue puntero sobre la región y foco dentro de ella.
- Al reanudar tras salir hover/foco, al avanzar automáticamente o tras una
  navegación manual, el siguiente avance se programa para dos segundos después.
- Solo puede existir un temporizador activo; al pausar o cambiar de lámina, el
  temporizador anterior se cancela antes de programar otro.
- La posición se expone como información accesible y no se persiste entre cargas.
- No existe relación con clientes, usuarios registrados ni cifras guardadas.