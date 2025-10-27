# Clase 23/10/2025

---

Para la segunda sesión de trabajo se dividieron las actividades de la siguiente manera:
- 🌟Paola Ornelas: Modificaciones pertinentes en figma (estética para el modal y sección de inicio), cración de la parte main en el archivo html.
- 🐈‍⬛Edgar Medina: Creador del header en html, incluye el header y la barra de búsqueda.
- 🥷Zianya Hinojosa: Encargada de crear el footer de la página en html.
- 🪰Diego Sánchez: Encargado de documentacion y colaboracion activa para el main, incluyendo tanto enl html como el archivo JavaScript.

---

## ⚙️ Código implementado

Para trabajar con la API de 'The Movie DB' es necesario obtener una API key y agregarlo a un archivo `config.js` como se muestra a continuación:

```
reto_02_pelicula/
├── index.html
├── css/
    └── app.css
├── js/
    └── app.js
├── assets/
├── config.js
└── .gitignore
```

El archivo debe de contener lo siguiente:

```
const CONFIG = {
  API_KEY: "tu_API_KEY_aquí_12345",
  API_BASE: "https://api.themoviedb.org/3"
};
```

Por su parte, el header y nav-bar trabajado por 🐈‍⬛Edgar es el siguiente hasta el momento:

```html
    <body>
    <header class="bg-header"> <!--header para la barra de navegacion -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> <!-- navbar-expand-lg Controla cuándo la navbar se expande/colapsa-->
      <div class="container" id="container-navbar">  <!--CONTAINER Centra el contenido y añade padding lateral --- Alternativas: container-fluid (en caso de necesitar ancho completo)-->

         <img src="assets/logo.png" alt="logo popflix" class="me-2"  style="width: 300px; height: auto;">

         
           <button  class="btn btn-link text-white text-decoration-none ms-3">
             <span id="btn-filtros" class="me-2">filtros</span>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>

         <!--Barra de busqueda-->
         <div class="d-flex align-items-center w-50">
          <div class="input-group"> <!--Agrupa input -->
            <input type="text" id="input-busqueda" class="form-control bg-dark text-white border-secondary "    placeholder="Busqueda... 🔍"> 
          </div>
         </div>
      </div>
    </nav>
  </header>
```

El footer desarrollado por 🥷Zianya es el siguiente:

```html
    <footer class="footer">
        <div class="waves">
          <div class="wave" id="wave1"></div>
          <div class="wave" id="wave2"></div>
          <div class="wave" id="wave3"></div>
          <div class="wave" id="wave4"></div>
        </div>
        <ul class="social-icon">
          <li class="social-icon__item"><a class="social-icon__link" href="#">
            <img src="/assets/facebook1.png" alt="Facebook" />
            </a>
          </li>
      
          <li class="social-icon__item"><a class="social-icon__link" href="#">
            <img src="/assets/instagram.png" alt="Instagram" />
            </a>
          </li>
          <li class="social-icon__item"><a class="social-icon__link" href="#">
            <img src="/assets/linkedin.png" alt="Linkedin" />
            </a>
          </li>
        </ul>
        <p>
          POPFLIX🍿 Copyright © 2025 popflix - Todos los derechos reservados   || Creador por: nosotros 
        </p>
    </footer>
```

Código desarrollado por 🌟Pao en `html` y `app.js`:


```html
    <body class="bg-dark text-light">
      <section id="hero" class="container my-5">
      </section>
        

      <main id="rowsContainer" class="container my-4">
      </main>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

      <script src="config.js"></script>
      <script src="./js/app.js"></script>
</body>
```

```js
// API a TMDB usando la API KEY 
const { API_KEY, API_BASE } = CONFIG;
const API = API_BASE || "https://api.themoviedb.org/3";

// Elementos del DOM
const rowsContainer = document.getElementById('rowsContainer');
const hero = document.getElementById('hero');
const heroTitle = document.getElementById('heroTitle');
const heroDesc = document.getElementById('heroDesc');
const heroPlay = document.getElementById('heroPlay');

// Función para traer datos en formato JSON
const fetchJSON = async (url) => {
  const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=es-MX`);
  if (!res.ok) throw new Error('Error al cargar datos: ' + url);
  return await res.json();
};

const stripHTML = (html) => (html || "").replace(/<[^>]*>/g, "");

// Inicialización principal
const init = async () => {
  const data = await fetchJSON(`${API}/movie/popular?page=1`);
  const movies = data.results || [];
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  renderHero(randomMovie);
};

// Función para bloque del inicio
const renderHero = async (movie) => {
  if (!movie) return;

  const videos = await fetchJSON(`${API}/movie/${movie.id}/videos`);
  const youtubeTrailer = videos.results.find(v => v.site === "YouTube" && v.type === "Trailer");
  const media = youtubeTrailer
    ? `
      <div class="ratio ratio-16x9 overflow-hidden shadow">
        <iframe 
          src="https://www.youtube.com/embed/${youtubeTrailer.key}?rel=0&modestbranding=1"
          title="${movie.title}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
      `
    : `
      <div class="rounded-4 overflow-hidden shadow">
        <img class="img-fluid w-100" src="https://image.tmdb.org/t/p/w1280${movie.backdrop_path}" alt="${movie.title}">
      </div>
      `;

  hero.innerHTML = `
    <div class="row align-items-center g-4">
      <div class="col-12">
        <span class="text-init mb-2">INICIA BIEN TU DÍA</span>
        <h1 id="heroTitle" class="display-6 fw-bold mb-3">
          INSPÍRATE VIENDO "<span class="text text-sec">${movie.title}</span>"
        </h1>
        <p id="heroDesc" class="text-secondary mb-4">
          ${stripHTML(movie.overview).slice(0, 220)}...
        </p>
        <button id="heroPlay" class="btn">▶ Ver trailer</button>
      </div>
      <div class="icon-media col-12">
        ${media}
      </div>
    </div>
  `;

  const btn = hero.querySelector("#heroPlay");
  btn.addEventListener("click", () => {
    if (youtubeTrailer && youtubeTrailer.key) {
      window.open(`https://www.youtube.com/watch?v=${youtubeTrailer.key}`, "_blank");
    } else {
      alert("Esta película no tiene tráiler disponible :(");
    }
  });
};

init();
```

---
## Otra documentación

- 🔠[Home](README.md)