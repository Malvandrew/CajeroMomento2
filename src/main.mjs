import { AlmacenamientoLocal } from "./storage/AlmacenamientoLocal.mjs";
import { ServicioAutenticacion } from "./services/ServicioAutenticacion.mjs";
import { ServicioCuentas } from "./services/ServicioCuentas.mjs";
import { ServicioTransferencias } from "./services/ServicioTransferencias.mjs";
import { ServicioMovimientos } from "./services/ServicioMovimientos.mjs";
import { ServicioPerfil } from "./services/ServicioPerfil.mjs";
import { ServicioTarjeta } from "./services/ServicioTarjeta.mjs";
import { Navegacion } from "./ui/Navegacion.mjs";
import { mostrarMensaje } from "./ui/Renderizado.mjs";
import { crearBotonCerrarSesion, renderizarInicioSesion } from "./ui/InicioSesion.mjs";
import { renderizarPaginaInicio } from "./ui/PaginaInicio.mjs";
import { renderizarRegistro } from "./ui/Registro.mjs";
import { renderizarPanelCuentas } from "./ui/PanelCuentas.mjs";
import { renderizarTransferencias } from "./ui/Transferencias.mjs";
import { renderizarHistorial } from "./ui/Historial.mjs";
import { renderizarPerfil } from "./ui/Perfil.mjs";
import { renderizarTarjetaCompra } from "./ui/TarjetaCompra.mjs";

const applicationRoot = document.querySelector("#app");

if (!applicationRoot) {
  throw new Error("No se encontró el contenedor principal de Plata First.");
}

renderizarPaginaInicio(applicationRoot);

try {
  const almacenamiento = new AlmacenamientoLocal();
  const servicioAutenticacion = new ServicioAutenticacion({ almacenamiento });
  const servicioCuentas = new ServicioCuentas({ almacenamiento });
  const servicioTransferencias = new ServicioTransferencias({ almacenamiento });
  const servicioMovimientos = new ServicioMovimientos({ almacenamiento });
  const servicioPerfil = new ServicioPerfil({ almacenamiento });
  const servicioTarjeta = new ServicioTarjeta({ almacenamiento });
  const navegacion = new Navegacion(applicationRoot);
  const registro = applicationRoot.querySelector("[data-registro]");
  const inicioSesion = applicationRoot.querySelector("[data-inicio-sesion]");
  const panel = applicationRoot.querySelector("[data-panel-content]");
  const saludo = applicationRoot.querySelector("[data-saludo]");
  const cerrarSesion = applicationRoot.querySelector("[data-cerrar-sesion]");

  function limpiarContenidoPrivado() {
    panel.querySelectorAll("[data-panel-section]").forEach((seccion) => seccion.replaceChildren());
    saludo.textContent = "";
  }

  function actualizarCuentas(clienteId) {
    const seccion = panel.querySelector('[data-panel-section="cuentas"]');
    renderizarPanelCuentas(seccion, servicioCuentas, clienteId, () => {
      actualizarHistorial(clienteId);
    });
  }

  function actualizarHistorial(clienteId) {
    const seccion = panel.querySelector('[data-panel-section="historial"]');
    renderizarHistorial(seccion, servicioMovimientos, clienteId);
  }

  function abrirPanel(cliente) {
    const clienteId = cliente.clienteId;
    saludo.textContent = `Hola, ${cliente.nombreCompleto}`;

    actualizarCuentas(clienteId);
    actualizarHistorial(clienteId);
    renderizarTransferencias(
      panel.querySelector('[data-panel-section="transferencias"]'),
      servicioTransferencias,
      clienteId,
      () => {
        actualizarCuentas(clienteId);
        actualizarHistorial(clienteId);
      },
    );
    renderizarPerfil(
      panel.querySelector('[data-panel-section="perfil"]'),
      servicioPerfil,
      clienteId,
      () => {
        servicioAutenticacion.cerrarSesion();
        limpiarContenidoPrivado();
        navegacion.mostrarVista("inicio");
        mostrarMensaje(
          applicationRoot.querySelector("[data-global-feedback]"),
          "Cuenta eliminada. Los movimientos se conservaron sin datos identificables.",
          "exito",
        );
      },
    );
    renderizarTarjetaCompra(
      panel.querySelector('[data-panel-section="tarjeta"]'),
      servicioTarjeta,
      clienteId,
      () => {
        actualizarCuentas(clienteId);
        actualizarHistorial(clienteId);
      },
    );

    navegacion.mostrarVista("panel");
    navegacion.mostrarSeccionPanel("cuentas");
  }

  renderizarRegistro(registro, servicioAutenticacion);
  renderizarInicioSesion(inicioSesion, servicioAutenticacion, abrirPanel);
  crearBotonCerrarSesion(cerrarSesion, servicioAutenticacion, () => {
    limpiarContenidoPrivado();
    navegacion.mostrarVista("inicio");
  });
  navegacion.mostrarVista("inicio");
} catch (error) {
  const feedback = applicationRoot.querySelector("[data-global-feedback]");
  mostrarMensaje(feedback, error.message, "error");
}
