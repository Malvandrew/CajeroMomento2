<!--
Sync Impact Report
Version change: unversioned -> 1.0.0 (initial versioned baseline)
Modified principles:
- I. Spec First -> I. Spec-First Development (NON-NEGOTIABLE)
- II. Object-Oriented Design -> II. Object-Oriented Domain Model (NON-NEGOTIABLE)
- V. Simplicity for Learning -> V. Learning-Centered Simplicity (NON-NEGOTIABLE)
Added sections: SemVer amendment policy and compliance review expectations under Governance
Removed sections: None; prior requirements were reorganized under the active scaffold
Follow-up TODOs: None
-->
# CajeroMomento2 Constitution

## Core Principles

### I. Spec-First Development (NON-NEGOTIABLE)
La aplicación web bancaria Mi Plata se desarrollará mediante el flujo obligatorio:
Spec → Plan → Tasks → Implementación. Ninguna funcionalidad se implementará a partir
de prompts ambiguos o requisitos incompletos. Antes de implementar, la SPEC deberá
definir objetivo, alcance, reglas de negocio, criterios de aceptación, casos límite y
restricciones técnicas. La SPEC aprobada es la fuente de verdad de cada funcionalidad.

### II. Object-Oriented Domain Model (NON-NEGOTIABLE)
La lógica bancaria residirá en clases y el modelo mínimo incluirá Cliente, Cuenta,
CuentaAhorros, CuentaCorriente, TarjetaCredito y Transaccion. Las soluciones deberán
demostrar abstracción, encapsulamiento, herencia y polimorfismo; la herencia se usará
cuando represente correctamente el dominio. Los eventos HTML no contendrán lógica de
negocio compleja.

### III. Banking Rules First (NON-NEGOTIABLE)
Las reglas financieras prevalecen sobre las decisiones técnicas. La CuentaAhorros
permitirá consignaciones y retiros, generará interés del 1.5%, no admitirá saldo
negativo y no permitirá retiros superiores al saldo disponible. La CuentaCorriente
no generará intereses y permitirá un sobregiro equivalente al 20% del saldo. La
TarjetaCredito aplicará 0% de interés hasta 2 cuotas, 1.9% mensual entre 3 y 6
cuotas y 2.3% mensual desde 7 cuotas; calculará y mostrará el valor mensual de la
cuota. Las transferencias validarán la existencia de las cuentas, actualizarán los
saldos involucrados y quedarán registradas en el historial.
Las reglas del dominio bancario tienen prioridad sobre la conveniencia técnica
porque la aplicación modela productos financieros.

### IV. Local Storage Only (NON-NEGOTIABLE)
Toda información persistente se almacenará y recuperará exclusivamente mediante
localStorage del navegador. Se prohíben MySQL, PostgreSQL, MongoDB, Firebase,
Supabase y cualquier API externa de almacenamiento. Esta restricción mantiene la
solución autocontenida para la evaluación académica.

### V. Learning-Centered Simplicity (NON-NEGOTIABLE)
El código será comprensible para estudiantes de segundo semestre. Se favorecerán
código explícito, métodos cortos, variables descriptivas, clases simples y nombres
claros. Se evitarán patrones avanzados innecesarios, metaprogramación, complejidad
accidental y optimizaciones que reduzcan la legibilidad. La mantenibilidad y la
comprensión educativa tienen prioridad.

## Architecture, Security, and User Experience

### Technology Stack and Separation of Concerns
El frontend utilizará HTML, CSS y JavaScript, con Programación Orientada a Objetos
como paradigma principal y localStorage como persistencia. La interfaz y la lógica
de negocio se mantendrán separadas, con responsabilidades claramente diferenciadas.
La estructura podrá organizarse en modelos, servicios, almacenamiento, interfaz y
utilidades. La herencia y reutilización reducirán duplicación entre productos
bancarios relacionados sin forzar relaciones ajenas al dominio.

### Registration, Login, and User Management
El registro solicitará identificación, nombre completo, celular, usuario,
contraseña y confirmación de contraseña. Validará campos obligatorios, unicidad del
usuario y coincidencia de contraseñas. El inicio de sesión validará usuario y
contraseña, mostrará los intentos disponibles y bloqueará la cuenta al tercer intento
fallido. El sistema permitirá crear, consultar, editar y eliminar usuarios.

### User Experience
La aplicación será responsive, mantendrá consistencia visual, mostrará mensajes
claros de error y éxito y ofrecerá navegación intuitiva. El flujo mínimo será Inicio,
Registro / Login, Panel principal, Operaciones bancarias e Historial.

## Transaction and Quality Requirements

Cada transacción registrará fecha, hora, tipo de movimiento y valor de la operación.
Las transacciones se almacenarán en localStorage y el historial se mostrará en orden
descendente por fecha.

Toda contribución respetará esta constitución y la SPEC correspondiente, usará
nombres descriptivos, evitará duplicación innecesaria, preservará el encapsulamiento
y no romperá funcionalidades existentes. Una funcionalidad estará terminada solo
cuando exista SPEC aprobada, PLAN aprobado y TASKS definidas; cumpla las reglas de
negocio y criterios de aceptación; respete esta constitución; funcione desde la
interfaz; registre correctamente los movimientos cuando aplique; y mantenga
coherencia visual con el sistema.

## Governance

Esta constitución prevalece sobre el código fuente, comentarios, conversaciones,
sugerencias de IA, pull requests y prompts. Solo se construirá lo documentado en la
SPEC vigente. Las funcionalidades fuera de la SPEC se aplazarán hasta que los
requisitos se actualicen formalmente; no se agregarán roles avanzados, pasarelas de
pago, módulos administrativos ni integraciones externas que no estén aprobados.
Cuando una solicitud contradiga esta constitución, una regla bancaria o una SPEC
aprobada, la implementación se detendrá y la inconsistencia se comunicará
explícitamente.

Toda enmienda se documentará y aprobará explícitamente en esta constitución antes
de modificar código sujeto a la regla. Cada enmienda indicará su impacto en las
SPECs, las reglas financieras y las funcionalidades existentes. Las contribuciones
y revisiones comprobarán su cumplimiento con esta constitución, la SPEC, las reglas
de negocio y los criterios de aceptación; cualquier incumplimiento deberá
corregirse antes de considerar terminada la funcionalidad.

La versión seguirá SemVer: MAJOR para cambios incompatibles que eliminen o redefinan
reglas; MINOR para principios o secciones nuevos y ampliaciones materiales; PATCH
para aclaraciones y cambios no semánticos.

**Version**: 1.0.0 | **Ratified**: 2026-10-15 | **Last Amended**: 2026-10-15
coherencia visual con el sistema.

## Governance

Esta constitución prevalece sobre el código fuente, comentarios, conversaciones,
sugerencias de IA, pull requests y prompts. Solo se construirá lo documentado en la
SPEC vigente. Las funcionalidades fuera de la SPEC se aplazarán hasta que los
requisitos se actualicen formalmente; no se agregarán roles avanzados, pasarelas de
pago, módulos administrativos ni integraciones externas que no estén aprobados.
Cuando una solicitud contradiga esta constitución, una regla bancaria o una SPEC
aprobada, la implementación se detendrá y la inconsistencia se comunicará
explícitamente.

Toda enmienda se documentará y aprobará explícitamente en esta constitución antes
de modificar código sujeto a la regla. Cada enmienda indicará su impacto en las
SPECs, las reglas financieras y las funcionalidades existentes. Las contribuciones
y revisiones comprobarán su cumplimiento con esta constitución, la SPEC, las reglas
de negocio y los criterios de aceptación; cualquier incumplimiento deberá
corregirse antes de considerar terminada la funcionalidad.

La versión seguirá SemVer: MAJOR para cambios incompatibles que eliminen o redefinan
reglas; MINOR para principios o secciones nuevos y ampliaciones materiales; PATCH
para aclaraciones y cambios no semánticos.

**Version**: 1.0.0 | **Ratified**: 2026-10-15 | **Last Amended**: 2026-10-15
├── storage/
