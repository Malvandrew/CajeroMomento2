# Quickstart: Renombrar Banco a Plata First

## Requisitos previos

- Node.js disponible para ejecutar la suite existente.
- Navegador moderno para la revisión manual de la interfaz.

## Validación automatizada

Desde la raíz del repositorio, ejecutar:

```sh
node --test
```

Resultado esperado: todas las pruebas existentes pasan; la actualización de marca no altera autenticación, registro ni las reglas cubiertas por ellas.

Comprobar que no queden referencias activas al nombre anterior:

```sh
rg -n "Mi Plata|mi plata" index.html src .specify/memory/constitution.md
```

Resultado esperado: ninguna coincidencia en el contenido vigente. Las especificaciones históricas bajo `specs/001` a `specs/006` no forman parte de esta búsqueda y deben conservar su redacción original.

## Validación manual

1. Servir la aplicación desde la raíz con `python3 -m http.server 8000` y abrir `http://localhost:8000`.
2. Comprobar el título de la pestaña, nombre y monograma de la marca, portada, historia, pie de página, registro y panel autenticado.
3. Comprobar el nombre accesible de la marca con las herramientas de accesibilidad del navegador.
4. Repetir la inspección a 1280, 768 y 375 píxeles de ancho; verificar que Plata First y `PF` sean legibles y no se solapen con navegación u otros controles.
5. Registrar e iniciar sesión, y recorrer las operaciones bancarias disponibles; confirmar que el flujo y los datos se comportan igual que antes.

Para detener el servidor local, usar `Ctrl+C` en la terminal donde se inició.