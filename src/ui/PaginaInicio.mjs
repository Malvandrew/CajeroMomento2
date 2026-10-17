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
      <section class="landing-aside" aria-labelledby="productos-disponibles">
        <h2 class="eyebrow product-section-title" id="productos-disponibles">Productos disponibles</h2>
        <ul class="product-list">
          <li class="product-card">
            <h3 class="product-card__title">Cuenta de ahorros</h3>
            <p class="product-card__description">Ahorra, consigna y retira dinero; genera interés según las condiciones del producto.</p>
          </li>
          <li class="product-card">
            <h3 class="product-card__title">Cuenta corriente</h3>
            <p class="product-card__description">Administra tus movimientos cotidianos con sobregiro sujeto a las condiciones de la cuenta.</p>
          </li>
          <li class="product-card">
            <h3 class="product-card__title">Tarjeta de crédito</h3>
            <p class="product-card__description">Realiza compras con tu cupo disponible y paga en cuotas, con intereses según el plazo.</p>
          </li>
        </ul>
      </section>
      <section class="business-presentation" aria-labelledby="presentacion-empresarial-title">
        <div class="business-presentation__intro">
          <p class="eyebrow">Mi Plata · Proyecto académico</p>
          <h2 id="presentacion-empresarial-title">Un banco digital pensado para las personas</h2>
          <p>Somos un banco digital enfocado en la satisfacción de nuestros usuarios. Nacimos como un proyecto académico y hoy hacemos parte de la comunidad CESDE.</p>
        </div>
        <section
          class="story-carousel"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Historia de Mi Plata"
          aria-live="off"
          data-story-carousel
        >
          <div class="story-carousel__slides">
            <article class="story-slide" role="group" aria-roledescription="diapositiva" aria-label="Hito 1 de 3" data-story-slide>
              <p class="eyebrow">Segundo semestre de 2026</p>
              <h3>Comenzamos como un proyecto académico</h3>
              <p>Mi Plata nació como una idea para acercar la banca digital a las personas.</p>
            </article>
            <article class="story-slide" role="group" aria-roledescription="diapositiva" aria-label="Hito 2 de 3" data-story-slide hidden>
              <p class="eyebrow">Hoy</p>
              <h3>Más de 10 clientes</h3>
              <p>Seguimos creciendo junto a quienes hacen parte de nuestro proyecto.</p>
            </article>
            <article class="story-slide" role="group" aria-roledescription="diapositiva" aria-label="Hito 3 de 3" data-story-slide hidden>
              <p class="eyebrow">CESDE</p>
              <h3>El banco más importante del CESDE</h3>
              <p>Una iniciativa académica que creció dentro de nuestra comunidad.</p>
            </article>
          </div>
          <div class="story-carousel__controls">
            <button type="button" aria-label="Mostrar hito anterior" data-story-previous>&lt;</button>
            <p class="story-carousel__position" aria-live="off" data-story-position>1 de 3</p>
            <button type="button" aria-label="Mostrar hito siguiente" data-story-next>&gt;</button>
          </div>
        </section>
      </section>
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
      <p class="site-footer__credits">Desarrollo para el segundo momento CESDE, materia FrontEnd1, Docente Beautyful Albeiro.</p>
      <nav id="redes-sociales" aria-label="Redes sociales">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
      </nav>
    </footer>
  `;

  const storyCarousel = contenedor.querySelector("[data-story-carousel]");
  const storySlides = [...storyCarousel.querySelectorAll("[data-story-slide]")];
  const storyPosition = storyCarousel.querySelector("[data-story-position]");
  let currentStoryIndex = 0;
  let storyTimer = null;
  let pointerInsideStory = false;
  let focusInsideStory = false;

  function displayStorySlide(index, announceChange = false) {
    currentStoryIndex = (index + storySlides.length) % storySlides.length;
    storySlides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== currentStoryIndex;
    });
    storyPosition.setAttribute("aria-live", announceChange ? "polite" : "off");
    storyPosition.textContent = `${currentStoryIndex + 1} de ${storySlides.length}`;
  }

  function clearStoryTimer() {
    if (storyTimer !== null) {
      clearTimeout(storyTimer);
      storyTimer = null;
    }
  }

  function scheduleStoryAdvance() {
    clearStoryTimer();
    if (pointerInsideStory || focusInsideStory) {
      return;
    }

    storyTimer = setTimeout(() => {
      storyTimer = null;
      displayStorySlide(currentStoryIndex + 1);
      scheduleStoryAdvance();
    }, 2000);
  }

  function resumeStoryWhenReady() {
    if (!pointerInsideStory && !focusInsideStory) {
      scheduleStoryAdvance();
    }
  }

  storyCarousel.querySelector("[data-story-previous]").addEventListener("click", () => {
    displayStorySlide(currentStoryIndex - 1, true);
    scheduleStoryAdvance();
  });
  storyCarousel.querySelector("[data-story-next]").addEventListener("click", () => {
    displayStorySlide(currentStoryIndex + 1, true);
    scheduleStoryAdvance();
  });

  storyCarousel.addEventListener("pointerenter", () => {
    pointerInsideStory = true;
    clearStoryTimer();
  });
  storyCarousel.addEventListener("pointerleave", () => {
    pointerInsideStory = false;
    resumeStoryWhenReady();
  });
  storyCarousel.addEventListener("focusin", () => {
    focusInsideStory = true;
    clearStoryTimer();
  });
  storyCarousel.addEventListener("focusout", (evento) => {
    if (storyCarousel.contains(evento.relatedTarget)) {
      return;
    }
    focusInsideStory = false;
    resumeStoryWhenReady();
  });

  scheduleStoryAdvance();
}
