import { mostrarMensaje } from "./Renderizado.mjs";

export function renderizarPerfil(contenedor, servicioPerfil, clienteId, alEliminar = () => {}) {
  const perfil = servicioPerfil.obtenerPerfil(clienteId);
  contenedor.innerHTML = `
    <section aria-labelledby="titulo-perfil">
      <h2 id="titulo-perfil">Mi perfil</h2>
      <form data-form-perfil>
        <label for="perfil-identificacion">Identificación</label>
        <input id="perfil-identificacion" name="numeroIdentificacion" required>
        <label for="perfil-nombre">Nombre completo</label>
        <input id="perfil-nombre" name="nombreCompleto" autocomplete="name" required>
        <label for="perfil-celular">Celular</label>
        <input id="perfil-celular" name="celular" type="tel" autocomplete="tel" required>
        <label for="perfil-usuario">Usuario</label>
        <input id="perfil-usuario" name="usuario" autocomplete="username" required>
        <button class="button-primary" type="submit">Guardar perfil</button>
      </form>
      <div data-perfil-feedback aria-live="polite"></div>

      <h3>Cambiar contraseña</h3>
      <form data-form-contrasena>
        <label for="clave-usuario">Usuario</label>
        <input id="clave-usuario" name="usuario" autocomplete="username" required>
        <label for="clave-actual">Contraseña actual</label>
        <input id="clave-actual" name="contrasenaActual" type="password" autocomplete="current-password" required>
        <label for="clave-nueva">Nueva contraseña</label>
        <input id="clave-nueva" name="contrasenaNueva" type="password" autocomplete="new-password" required>
        <label for="clave-confirmacion">Confirmar nueva contraseña</label>
        <input id="clave-confirmacion" name="confirmacionContrasena" type="password" autocomplete="new-password" required>
        <button type="submit">Actualizar contraseña</button>
      </form>
      <div data-clave-feedback aria-live="polite"></div>

      <section aria-labelledby="titulo-eliminacion">
        <h3 id="titulo-eliminacion">Eliminar cuenta</h3>
        <p>Se eliminarán tu perfil y tus productos. Los movimientos quedarán sin vínculos que te identifiquen.</p>
        <button class="button-danger" type="button" data-eliminar-cuenta>Eliminar mi cuenta</button>
      </section>
      <div data-eliminar-feedback aria-live="polite"></div>
    </section>
  `;

  const formularioPerfil = contenedor.querySelector("[data-form-perfil]");
  formularioPerfil.elements.numeroIdentificacion.value = perfil.numeroIdentificacion;
  formularioPerfil.elements.nombreCompleto.value = perfil.nombreCompleto;
  formularioPerfil.elements.celular.value = perfil.celular;
  formularioPerfil.elements.usuario.value = perfil.usuario;

  formularioPerfil.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const datos = Object.fromEntries(new FormData(formularioPerfil).entries());
    try {
      servicioPerfil.editarPerfil(clienteId, datos);
      mostrarMensaje(contenedor.querySelector("[data-perfil-feedback]"), "Perfil actualizado.", "exito");
    } catch (error) {
      mostrarMensaje(contenedor.querySelector("[data-perfil-feedback]"), error.message, "error");
    }
  });

  const formularioContrasena = contenedor.querySelector("[data-form-contrasena]");
  formularioContrasena.elements.usuario.value = perfil.usuario;
  formularioContrasena.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const datos = Object.fromEntries(new FormData(formularioContrasena).entries());
    try {
      servicioPerfil.cambiarContrasena(clienteId, datos);
      formularioContrasena.reset();
      mostrarMensaje(contenedor.querySelector("[data-clave-feedback]"), "Contraseña actualizada.", "exito");
    } catch (error) {
      mostrarMensaje(contenedor.querySelector("[data-clave-feedback]"), error.message, "error");
    }
  });

  contenedor.querySelector("[data-eliminar-cuenta]").addEventListener("click", () => {
    const confirma = window.confirm("¿Deseas eliminar tu cuenta y tus productos? Los movimientos se conservarán sin datos identificables.");
    if (!confirma) {
      mostrarMensaje(contenedor.querySelector("[data-eliminar-feedback]"), "La cuenta sigue activa.", "info");
      return;
    }

    try {
      servicioPerfil.eliminarCuenta(clienteId);
      mostrarMensaje(contenedor.querySelector("[data-eliminar-feedback]"), "Cuenta eliminada.", "exito");
      alEliminar();
    } catch (error) {
      mostrarMensaje(contenedor.querySelector("[data-eliminar-feedback]"), error.message, "error");
    }
  });
}
