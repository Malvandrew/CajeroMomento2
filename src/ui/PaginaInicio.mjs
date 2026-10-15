export function renderizarPaginaInicio(contenedor) {
  contenedor.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#inicio" data-navegar="inicio" aria-label="Mi Plata, inicio">
        <span class="brand-mark" aria-hidden="true">MP</span>
        <span>Mi Plata</span>
      </a>
      <nav class="main-navigation" aria-label="Navegación principal">
        <button type="button" data-navegar="inicio">Inicio</button>
        <button type="button" data-navegar="sesion">Iniciar sesión</button>
        <button class="button-primary" type="button" data-navegar="registro">Registrarse</button>
      </nav>
    </header>

    <section class="page-view landing-view" data-view="inicio" id="inicio" tabindex="-1">
      <div class="landing-copy">
        <p class="eyebrow">Sucursal bancaria · Mi Plata</p>
        <h1>Tu dinero, en movimiento.</h1>
        <p>Consulta tus cuentas, organiza tus operaciones y revisa cada movimiento desde un solo lugar.</p>
        <div class="landing-actions">
          <button class="button-primary" type="button" data-navegar="registro">Crear cuenta</button>
          <button class="button-secondary" type="button" data-navegar="sesion">Ya soy cliente</button>
        </div>
      </div>
      <div class="landing-aside" aria-label="Productos de Mi Plata">
        <p class="eyebrow">Productos disponibles</p>
        <ul>
          <li>Cuenta de ahorros</li>
          <li>Cuenta corriente</li>
          <li>Tarjeta de crédito</li>
        </ul>
      </div>
      <div data-global-feedback></div>
    </section>

    <section class="page-view" data-view="registro" id="registro" tabindex="-1" hidden>
      <div class="form-column" data-registro></div>
    </section>

    <section class="page-view" data-view="sesion" id="sesion" tabindex="-1" hidden>
      <div class="form-column" data-inicio-sesion></div>
    </section>

    <section class="page-view" data-view="panel" id="panel" tabindex="-1" hidden>
      <header class="panel-heading">
        <div>
          <p class="eyebrow">Panel principal</p>
          <h1>Mi Plata</h1>
          <p data-saludo></p>
        </div>
        <div data-cerrar-sesion></div>
      </header>
      <div class="panel-content" data-panel-content>
        <nav class="panel-navigation" aria-label="Operaciones bancarias">
          <button type="button" data-panel-navegar="cuentas">Cuentas</button>
          <button type="button" data-panel-navegar="transferencias">Transferir</button>
          <button type="button" data-panel-navegar="historial">Movimientos</button>
          <button type="button" data-panel-navegar="perfil">Perfil</button>
          <button type="button" data-panel-navegar="tarjeta">Tarjeta</button>
        </nav>
        <section data-panel-section="cuentas"></section>
        <section data-panel-section="transferencias" hidden></section>
        <section data-panel-section="historial" hidden></section>
        <section data-panel-section="perfil" hidden></section>
        <section data-panel-section="tarjeta" hidden></section>
      </div>
    </section>

    <footer class="site-footer">
      <p>Mi Plata · Simulación académica</p>
      <nav id="redes-sociales" aria-label="Redes sociales">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
      </nav>
    </footer>
  `;
}
