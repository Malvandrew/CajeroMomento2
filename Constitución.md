# Constitución.md

# Constitución del Proyecto "Mi Plata"

## I. Propósito
Desarrollar una aplicación web bancaria en JavaScript que modele de forma realista los procesos de una sucursal bancaria, aplicando Programación Orientada a Objetos, buenas prácticas de desarrollo y un enfoque Spec-Driven Development.

---

## II. Principios Innegociables

### 1. Programación Orientada a Objetos Obligatoria
Toda funcionalidad deberá construirse evidenciando:
- Abstracción.
- Encapsulamiento.
- Herencia.
- Polimorfismo.

Clases mínimas:
- Cliente
- Cuenta
- CuentaAhorros
- CuentaCorriente
- TarjetaCredito

### 2. Las Reglas de Negocio Tienen Prioridad
Ninguna implementación podrá contradecir las reglas funcionales definidas para:
- Cuenta de Ahorros.
- Cuenta Corriente.
- Tarjeta de Crédito.
- Seguridad y autenticación.
- Transferencias.

### 3. Toda Funcionalidad Debe Estar Especificada
Queda prohibido desarrollar funcionalidades directamente desde prompts ambiguos. Antes de implementar una funcionalidad debe existir una SPEC que incluya:
- Objetivo.
- Alcance.
- Reglas de negocio.
- Casos de aceptación.
- Edge cases.

### 4. No Se Implementa Fuera de Alcance
Cualquier funcionalidad no descrita en la SPEC se considera fuera del alcance hasta ser aprobada y documentada.
Tampoco se implementará un motor de base de datos, todo se debe almacenar de forma local usando el localstorage del navegador web.

### 5. Codigo legible para un estudiante de segundo semestre
que no contenga código complejo a avanzado para que se pueda leer intuitivamente por los estudiantes

---

## III. Reglas Arquitectónicas

### Tecnología
- Lenguaje: JavaScript.
- Paradigma principal: Programación Orientada a Objetos.
- No se empleará bases de datos, únicamente localStorage del navegador.
-FrontEnd: javaScript, css, html.

### Estructura
Toda lógica de negocio deberá estar separada de la interfaz gráfica.



### Reutilización
La herencia deberá utilizarse para evitar duplicación de código entre productos bancarios.

---

## IV. Reglas Funcionales Fundamentales

### Cuenta de Ahorros
- Permite consignaciones y retiros.
- Genera interés del 1.5% mensual aplicado en el retiro.
- No permite retirar más del saldo disponible.

### Cuenta Corriente
- No genera intereses.
- Permite sobregiro del 20% sobre el saldo actual.

### Tarjeta de Crédito
- ≤ 2 cuotas: 0% interés.
- 3 a 6 cuotas: 1.9% mensual.
- ≥ 7 cuotas: 2.3% mensual.
- Debe mostrar la cuota mensual calculada.

---

## V. Seguridad

### Registro
Campos obligatorios:
- Identificación.
- Nombre completo.
- Celular.
- Usuario único.
- Contraseña.
- Confirmación de contraseña.

### Inicio de Sesión
- Validación de usuario y contraseña.
- Máximo 3 intentos fallidos.
- Bloqueo de cuenta al tercer intento.
- Contador visible de intentos.

### Gestión de Usuarios
Debe existir soporte para:
- Crear.
- Consultar.
- Editar.
- Eliminar.

---

## VI. Experiencia de Usuario

La aplicación deberá:
- Ser responsive.
- Mantener identidad visual consistente.
- Informar con claridad errores, éxitos y advertencias.
- Mantener un flujo intuitivo:
  Inicio → Registro/Login → Panel de Transacciones.

---

## VII. Gestión de Transacciones

Toda transacción deberá:
- Registrarse en historial local storage.
- Conservar fecha y hora.
- Conservar tipo de movimiento.
- Conservar valor.

El historial deberá mostrarse en orden descendente por fecha.

---

## VIII. Calidad de Código

Cada Pull Request deberá:
- Respetar esta constitución.
- Mantener nombres descriptivos.
- Evitar duplicación.
- Preservar encapsulamiento.
- No romper funcionalidades existentes.

---

## IX. Definición de Terminado (Definition of Done)

Una funcionalidad se considera terminada únicamente si:

1. Existe SPEC aprobada.
2. Cumple las reglas de negocio.
3. Cumple los criterios de aceptación.
4. No viola esta constitución.
5. Funciona correctamente desde la interfaz.
6. Registra adecuadamente los movimientos cuando aplique.
7. Mantiene la coherencia visual del sistema.

---

## X. Autoridad de la Constitución

Ante cualquier conflicto entre implementación, preferencias personales o sugerencias de IA, prevalece esta Constitución. Toda modificación deberá actualizarse explícitamente en este documento antes de ser aplicada al proyecto.

## XI. Comportamiento del Agente de IA (Reglas SDD)
- Cero Código Sombra (Shadow Code): Construye estrictamente lo documentado en `spec.md`. No añadas características "por si acaso" (no pasarelas de pago, no perfiles complejos, etc.).
- Fuente de la Verdad: Si una instrucción del usuario contradice esta constitución o si detectas una falla lógica, detente. Advierte del problema y solicita actualizar el `spec.md` antes de tocar el código fuente.