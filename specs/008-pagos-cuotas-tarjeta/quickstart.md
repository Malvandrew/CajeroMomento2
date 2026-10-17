# Quickstart: Pago de Cuotas de Tarjeta de Crédito

## Requisitos previos

- Node.js para ejecutar la suite existente y las pruebas de servicio.
- Navegador moderno para probar el recorrido desde la interfaz.
- La aplicación servida desde la raíz del repositorio.

## Validación automatizada

Ejecutar desde la raíz:

```sh
node --test
```

Resultado esperado: la suite completa pasa, incluyendo pagos correctos, rechazo por fondos insuficientes, propiedad de cuenta, rechazo de cuota ya pagada y ausencia de cambios parciales.

## Recorrido manual

1. Iniciar la aplicación con `python3 -m http.server 8000` y abrir `http://localhost:8000`.
2. Registrar un cliente con saldo positivo en ahorros o corriente y cupo de tarjeta suficiente; iniciar sesión.
3. En la sección de tarjeta, realizar una compra dividida en varias cuotas y anotar el importe de la primera cuota, la cuenta elegida, el saldo de la cuenta y el cupo disponible.
4. Seleccionar la compra, elegir la cuenta propia y confirmar el pago de la siguiente cuota.
5. Verificar que el saldo de la cuenta y la deuda disminuyen exactamente por el valor programado, que el cupo aumenta solo por el capital de esa cuota y permanece dentro del límite, y que la cuota queda marcada como pagada.
6. Confirmar que no se agregaron intereses o comisiones al pagar y que la tasa y los importes originales de la compra no cambiaron.
7. Consultar movimientos y verificar fecha, hora, monto, cuenta de origen, tarjeta, compra y cuota.
8. Intentar pagar otra vez la misma cuota y luego intentar pagar con una cuenta con saldo insuficiente; ambos intentos deben rechazarse sin cambios.
9. Repetir desde escritorio, tableta y móvil; confirmar que los controles y estados siguen siendo accesibles y legibles.

Para detener el servidor local, presionar `Ctrl+C` en la terminal donde se inició.