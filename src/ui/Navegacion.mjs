export class Navegacion {
  constructor(contenedor) {
    if (!(contenedor instanceof HTMLElement)) {
      throw new TypeError("Se requiere el contenedor principal de navegación.");
    }

    this.contenedor = contenedor;
    this.manejarClick = this.manejarClick.bind(this);
    this.contenedor.addEventListener("click", this.manejarClick);
  }

  manejarClick(evento) {
    const botonPanel = evento.target.closest("[data-panel-navegar]");
    if (botonPanel && this.contenedor.contains(botonPanel)) {
      this.mostrarSeccionPanel(botonPanel.dataset.panelNavegar);
      return;
    }

    const boton = evento.target.closest("[data-navegar]");
    if (!boton || !this.contenedor.contains(boton)) {
      return;
    }

    this.mostrarVista(boton.dataset.navegar);
  }

  mostrarVista(idVista) {
    const vistas = [...this.contenedor.querySelectorAll("[data-view]")];
    const destino = vistas.find((vista) => vista.dataset.view === idVista);

    if (!destino) {
      throw new Error(`No existe la vista: ${idVista}`);
    }

    for (const vista of vistas) {
      const activa = vista === destino;
      vista.hidden = !activa;
      vista.setAttribute("aria-hidden", String(!activa));
    }

    destino.focus?.();
  }

  mostrarSeccionPanel(idSeccion) {
    const panel = this.contenedor.querySelector('[data-view="panel"]');
    const secciones = [...panel.querySelectorAll("[data-panel-section]")];
    const destino = secciones.find((seccion) => seccion.dataset.panelSection === idSeccion);

    if (!destino) {
      throw new Error(`No existe la sección del panel: ${idSeccion}`);
    }

    for (const seccion of secciones) {
      const activa = seccion === destino;
      seccion.hidden = !activa;
      seccion.setAttribute("aria-hidden", String(!activa));
    }

    destino.focus?.();
  }

  destruir() {
    this.contenedor.removeEventListener("click", this.manejarClick);
  }
}
