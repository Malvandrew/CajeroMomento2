import { mostrarMensaje } from "./Renderizado.mjs";

export function renderizarInicioSesion(contenedor, servicioAutenticacion, alIniciarSesion = () => {}) {
  const formulario = document.createElement("form");
  formulario.id = "form-inicio-sesion";
  formulario.innerHTML = `
    <h1>Iniciar sesión</h1>
    <p>Esta es una simulación académica. Las contraseñas podrían leerse en los datos guardados; no uses credenciales bancarias reales.</p>
    <label for="sesion-usuario">Usuario</label>
    <input id="sesion-usuario" name="usuario" autocomplete="username" required>
    <label for="sesion-contrasena">Contraseña</label>
    <input id="sesion-contrasena" name="contrasena" type="password" autocomplete="current-password" required>
    <button type="submit">Entrar</button>
    <div data-feedback aria-live="polite"></div>
  `;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const feedback = formulario.querySelector("[data-feedback]");
    const datos = Object.fromEntries(new FormData(formulario).entries());

    try {
      const cliente = servicioAutenticacion.iniciarSesion(datos);
      mostrarMensaje(feedback, "Sesión iniciada.", "exito");
      alIniciarSesion(cliente);
    } catch (error) {
      mostrarMensaje(feedback, error.message, "error");
    }
  });

  contenedor.replaceChildren(formulario);
}

export function crearBotonCerrarSesion(contenedor, servicioAutenticacion, alCerrarSesion = () => {}) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.textContent = "Cerrar sesión";
  boton.addEventListener("click", () => {
    servicioAutenticacion.cerrarSesion();
    alCerrarSesion();
  });
  contenedor.append(boton);
  return boton;
}
