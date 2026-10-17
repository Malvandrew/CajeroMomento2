# Research: Renombrar Banco a Plata First

## Decisiones

### Actualizar la identidad en los puntos vigentes y conservar el historial

- **Decision**: Usar exactamente `Plata First` en el título de la página, el nombre y monograma de marca, la presentación, las etiquetas accesibles, el encabezado del panel, el pie de página, el encabezado de registro, los mensajes de inicialización y la descripción actual de identidad del producto.
- **Rationale**: La revisión de contenido encontró referencias actuales en `index.html`, `src/main.mjs`, `src/ui/PaginaInicio.mjs`, `src/ui/Registro.mjs` y `.specify/memory/constitution.md`. El monograma actual `MP` también depende de la identidad anterior y debe pasar a `PF`.
- **Alternatives considered**: Cambiar solo el nombre visible de la portada dejaría referencias inconsistentes en el título, el panel, el registro y la accesibilidad. Reemplazar todas las apariciones del repositorio también reescribiría especificaciones que documentan decisiones históricas; se descarta porque el alcance distingue explícitamente contenido vigente de historia del proyecto.

### Mantener intactos los datos y el comportamiento bancario

- **Decision**: Tratar el cambio como una actualización de presentación; no migrar ni modificar datos existentes, entidades, almacenamiento, servicios o reglas bancarias.
- **Rationale**: El nombre de marca no participa en las operaciones ni en las relaciones de clientes y productos. La constitución ya limita la persistencia a `localStorage`, que no necesita cambios para esta funcionalidad.
- **Alternatives considered**: Renombrar claves de almacenamiento o datos históricos no aporta valor al reconocimiento de marca y podría poner en riesgo la información existente.

### No incorporar dependencias ni abstracciones de marca

- **Decision**: Editar las referencias actuales de forma directa, reutilizando la estructura y el sistema de pruebas existentes.
- **Rationale**: El proyecto usa HTML, CSS, módulos ES y pruebas con `node:test`; el cambio no introduce una necesidad de configuración dinámica ni de bibliotecas adicionales.
- **Alternatives considered**: Añadir un módulo de configuración centralizado para un nombre estático aumentaría complejidad sin eliminar duplicación significativa.

## Resultado de investigación

No quedan decisiones técnicas pendientes ni integraciones externas que investigar. La implementación puede continuar con las herramientas y convenciones existentes.