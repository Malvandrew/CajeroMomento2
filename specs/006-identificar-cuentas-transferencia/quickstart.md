# Quickstart: Identificar Titulares en Transferencias

## Prerequisites

- Node.js con soporte para `node:test`.
- Navegador compatible con módulos ES.
- Usar un perfil o datos locales de prueba; no borrar almacenamiento de una
  instalación que contenga datos que se quieran conservar.

## Automated Regression Check

Ejecutar desde la raíz del repositorio:

```sh
node --test tests/*.test.mjs
```

Las pruebas existentes deben seguir pasando. El proyecto no tiene entorno DOM de
pruebas para renderizar controles `select`; validar las etiquetas de UI en el
navegador.

## Browser Validation

1. Iniciar la aplicación mediante un servidor local y abrir la vista de
   transferencias con un usuario de prueba.
2. Con varias cuentas de origen, comprobar que cada opción muestra tipo, número
   visible y nombre completo del titular autenticado.
3. Comprobar que los destinos elegibles muestran tipo, número y nombre de su
   titular, incluyendo cuentas de otros clientes.
4. Cambiar la cuenta de origen y verificar que se actualiza la lista de destinos
   sin perder la información del titular ni seleccionar una cuenta diferente.
5. Usar dos cuentas del mismo tipo y, si es posible, dos titulares con el mismo
   nombre; el número debe distinguir las opciones.
6. Completar una transferencia válida y comprobar que origen, destino, saldos y
   movimientos se comportan como antes del cambio.
7. Probar el texto en 1280, 768 y 375 píxeles de ancho; tipo, número y nombre deben
   seguir legibles sin recorte, solapamiento ni overflow horizontal.

## Expected Results

- Todas las opciones elegibles de origen y destino muestran tipo, número y nombre
  completo del titular.
- Los IDs de selección, filtros y resultados de transferencia no cambian.
- Ningún dato personal adicional al nombre completo se muestra en las opciones.