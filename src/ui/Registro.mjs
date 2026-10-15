import { mostrarMensaje } from "./Renderizado.mjs";

export function renderizarRegistro(contenedor, servicioAutenticacion, alRegistrar = () => {}) {
  const formulario = document.createElement("form");
  formulario.id = "form-registro";
  formulario.noValidate = false;
  formulario.innerHTML = `
    <h1>Crear cuenta Mi Plata</h1>
    <p>Esta es una simulación académica. Las contraseñas podrían leerse en los datos guardados; no uses credenciales bancarias reales.</p>
    <p>Los datos solo estarán disponibles en este dispositivo y navegador. Si borras sus datos, no se podrán recuperar.</p>
    <fieldset>
      <legend>Datos personales</legend>
      <label for="registro-identificacion">Número de identificación</label>
      <input id="registro-identificacion" name="numeroIdentificacion" autocomplete="off" required>
      <label for="registro-nombre">Nombre completo</label>
      <input id="registro-nombre" name="nombreCompleto" autocomplete="name" required>
      <label for="registro-celular">Celular</label>
      <input id="registro-celular" name="celular" type="tel" autocomplete="tel" required>
      <label for="registro-usuario">Usuario</label>
      <input id="registro-usuario" name="usuario" autocomplete="username" required>
      <label for="registro-contrasena">Contraseña</label>
      <input id="registro-contrasena" name="contrasena" type="password" autocomplete="new-password" required>
      <label for="registro-confirmacion">Confirmar contraseña</label>
      <input id="registro-confirmacion" name="confirmacionContrasena" type="password" autocomplete="new-password" required>
    </fieldset>
    <fieldset>
      <legend>Valores iniciales (COP)</legend>
      <label for="registro-ahorros">Saldo inicial de ahorros</label>
      <input id="registro-ahorros" name="saldoAhorros" type="number" min="0" step="0.01" inputmode="decimal" value="0" required>
      <label for="registro-corriente">Saldo inicial de corriente</label>
      <input id="registro-corriente" name="saldoCorriente" type="number" min="0" step="0.01" inputmode="decimal" value="0" required>
      <label for="registro-limite">Cupo inicial de tarjeta</label>
      <input id="registro-limite" name="limiteCredito" type="number" min="0" step="0.01" inputmode="decimal" value="0" required>
    </fieldset>
    <button type="submit">Crear cuenta</button>
    <div data-feedback aria-live="polite"></div>
  `;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const feedback = formulario.querySelector("[data-feedback]");
    const datos = Object.fromEntries(new FormData(formulario).entries());

    try {
      const resultado = servicioAutenticacion.registrar(datos);
      mostrarMensaje(feedback, "Cuenta creada con los saldos y cupo inicial seleccionados.", "exito");
      alRegistrar(resultado);
    } catch (error) {
      mostrarMensaje(feedback, error.message, "error");
    }
  });

  contenedor.replaceChildren(formulario);
}
