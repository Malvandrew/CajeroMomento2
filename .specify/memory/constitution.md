# CajeroMomento2 Constitution

## Project Purpose

Desarrollar una aplicación web bancaria denominada "Mi Plata" utilizando JavaScript, HTML y CSS, que modele de forma realista los procesos de una sucursal bancaria mediante Programación Orientada a Objetos y un enfoque Spec-Driven Development.

La constitución es la fuente principal de gobernanza del proyecto y prevalece sobre cualquier sugerencia de IA, implementación o decisión técnica que la contradiga.

---

# Core Principles

## I. Spec First (NON-NEGOTIABLE)

Toda funcionalidad deberá seguir obligatoriamente el flujo:

Spec → Plan → Tasks → Implementación

Queda prohibido desarrollar funcionalidades directamente desde prompts ambiguos o instrucciones incompletas.

Antes de implementar cualquier funcionalidad deberá existir una SPEC que incluya como mínimo:

- Objetivo.
- Alcance.
- Reglas de negocio.
- Casos de aceptación.
- Edge Cases.
- Restricciones técnicas.

### Rationale

La especificación es la fuente de verdad del proyecto y evita inconsistencias entre requisitos y código.

---

## II. Object-Oriented Design (NON-NEGOTIABLE)

Toda solución deberá evidenciar los principios fundamentales de Programación Orientada a Objetos:

- Abstracción.
- Encapsulamiento.
- Herencia.
- Polimorfismo.

El modelo mínimo del dominio bancario deberá incluir:

- Cliente
- Cuenta
- CuentaAhorros
- CuentaCorriente
- TarjetaCredito
- Transaccion

### Requirements

- La lógica bancaria deberá residir en clases.
- No se permitirá lógica de negocio compleja dentro de eventos HTML.
- La herencia deberá utilizarse cuando represente correctamente el dominio.

---

## III. Banking Rules First (NON-NEGOTIABLE)

Las reglas financieras tienen prioridad sobre cualquier decisión técnica.

### Cuenta de Ahorros

- Permite consignaciones.
- Permite retiros.
- Genera interés del 1.5%.
- No permite saldo negativo.
- No permite retirar más del saldo disponible.

### Cuenta Corriente

- No genera intereses.
- Permite sobregiro equivalente al 20% del saldo.

### Tarjeta de Crédito

- Hasta 2 cuotas: 0% interés.
- Entre 3 y 6 cuotas: 1.9% mensual.
- 7 cuotas o más: 2.3% mensual.
- Debe calcular y mostrar el valor de la cuota mensual.

### Transferencias

- Deben validar existencia de cuentas.
- Deben actualizar los saldos involucrados.
- Deben registrarse en el historial.

### Rationale

La aplicación modela productos financieros. Por lo tanto, el dominio bancario tiene prioridad sobre la conveniencia de implementación.

---

## IV. Local Storage Only (NON-NEGOTIABLE)

La persistencia del sistema se realizará exclusivamente mediante localStorage del navegador.

No se permitirá el uso de:

- MySQL
- PostgreSQL
- MongoDB
- Firebase
- Supabase
- APIs externas de almacenamiento

Toda información persistente deberá almacenarse y recuperarse desde localStorage.

### Rationale

La evaluación académica exige una solución autocontenida sin motor de base de datos.

---

## V. Simplicity for Learning (NON-NEGOTIABLE)

El código deberá ser comprensible para estudiantes de segundo semestre de desarrollo de software.

Se deberá favorecer:

- Código explícito.
- Métodos cortos.
- Variables descriptivas.
- Clases simples.
- Nombres claros.

Se deberá evitar:

- Patrones de diseño avanzados innecesarios.
- Metaprogramación.
- Complejidad accidental.
- Código excesivamente optimizado que reduzca la legibilidad.

### Rationale

La mantenibilidad y comprensión del código tienen prioridad educativa.

---

# Architecture Standards

## Technology Stack

Frontend obligatorio:

- HTML
- CSS
- JavaScript

Paradigma principal:

- Programación Orientada a Objetos

Persistencia:

- localStorage

---

## Separation of Concerns

La interfaz gráfica y la lógica de negocio deben mantenerse separadas.

La aplicación deberá organizarse bajo responsabilidades claramente diferenciadas.

Ejemplo recomendado:

```text
src/
├── models/
├── services/
├── storage/
├── ui/
└── utils/
```

---

## Reuse

La herencia y reutilización deberán emplearse para minimizar la duplicación de código entre productos bancarios relacionados.

---

# Security Requirements

## Registro

Campos obligatorios:

- Identificación
- Nombre completo
- Celular
- Usuario
- Contraseña
- Confirmación de contraseña

Validaciones mínimas:

- Usuario único.
- Contraseñas coincidentes.
- Campos obligatorios diligenciados.

---

## Inicio de Sesión

- Validar usuario y contraseña.
- Máximo tres intentos fallidos.
- Bloqueo de cuenta al tercer intento.
- Mostrar contador de intentos disponibles.

---

## Gestión de Usuarios

El sistema deberá permitir:

- Crear usuarios.
- Consultar usuarios.
- Editar usuarios.
- Eliminar usuarios.

---

# User Experience Requirements

La aplicación deberá:

- Ser responsive.
- Mantener consistencia visual.
- Mostrar mensajes claros de error y éxito.
- Mantener una navegación intuitiva.

Flujo mínimo:

```text
Inicio
↓
Registro / Login
↓
Panel principal
↓
Operaciones bancarias
↓
Historial
```

---

# Transaction Requirements

Toda transacción deberá registrar:

- Fecha.
- Hora.
- Tipo de movimiento.
- Valor de la operación.

Las transacciones deberán almacenarse en localStorage.

El historial deberá mostrarse en orden descendente por fecha.

---

# AI Agent Governance

## No Shadow Code

Construir únicamente lo documentado en la SPEC vigente.

No agregar características no solicitadas.

Ejemplos prohibidos:

- Roles avanzados.
- Pasarelas de pago.
- Módulos administrativos no especificados.
- Integraciones externas no aprobadas.

---

## Scope Control

Toda funcionalidad fuera de la SPEC deberá rechazarse hasta que exista una actualización formal de requisitos.

---

## Constitution Authority

Si existe conflicto entre:

- Código fuente.
- Comentarios.
- Conversaciones.
- Sugerencias de IA.
- Pull Requests.
- Prompts.

Prevalece esta constitución.

---

## Failure Protocol

Si una solicitud contradice:

- Esta constitución.
- Una regla de negocio.
- Una SPEC aprobada.

El agente deberá detener la implementación y advertir explícitamente la inconsistencia.

---

# Quality Standards

Toda contribución deberá:

- Respetar esta constitución.
- Cumplir la SPEC correspondiente.
- Mantener nombres descriptivos.
- Evitar duplicación innecesaria.
- Preservar encapsulamiento.
- No romper funcionalidades existentes.

---

# Definition of Done

Una funcionalidad se considera terminada únicamente cuando:

1. Existe SPEC aprobada.
2. Existe PLAN aprobado.
3. Existen TASKS definidas.
4. Cumple todas las reglas de negocio.
5. Cumple todos los criterios de aceptación.
6. Respeta esta constitución.
7. Funciona correctamente desde la interfaz.
8. Registra correctamente los movimientos cuando aplique.
9. Mantiene coherencia visual con el resto del sistema.

---

# Governance

Esta constitución tiene autoridad superior sobre cualquier implementación del proyecto.

Toda modificación a las reglas aquí establecidas deberá realizarse mediante una actualización explícita de este documento antes de cambiar el código fuente.
