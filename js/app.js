// API a TMDB usando la API KEY 
const { API_KEY, API_BASE } = CONFIG
const API = API_BASE || "https://api.themoviedb.org/3"

// Elementos del DOM
const rowsContainer = document.getElementById('rowsContainer')
const hero = document.getElementById('hero')
const heroTitle = document.getElementById('heroTitle')
const heroDesc = document.getElementById('heroDesc')
const heroPlay = document.getElementById('heroPlay')

// Función para traer datos en formato JSON
const fetchJSON = async (url) => {
  const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=es-MX`)
  if (!res.ok) throw new Error('Error al cargar datos: ' + url)
  return await res.json()
}

const stripHTML = (html) => (html || "").replace(/<[^>]*>/g, "")

// Inicialización principal
const init = async () => {
  const data = await fetchJSON(`${API}/movie/popular?page=1`);
  const movies = data.results || [];
  console.log('@@@movies ->',movies.slice(0,20).map(movie => movie.poster_path))
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  renderHero(randomMovie);
  renderRow("Tendencias", movies.slice(0,20))
}

// Función para bloque del inicio
const renderHero = async (movie) => {
  if (!movie) return

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
      `

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
        <button id="heroPlay" class="btn">▷ Ver trailer</button>
      </div>
      <div class="icon-media col-12">
        ${media}
      </div>
    </div>
  `

  const btn = hero.querySelector("#heroPlay")
  btn.addEventListener("click", () => {
    if (youtubeTrailer && youtubeTrailer.key) {
      window.open(`https://www.youtube.com/watch?v=${youtubeTrailer.key}`, "_blank")
    } else {
      alert("Esta película no tiene tráiler disponible :(")
    }
  })
}

const renderRow = (title, shows) => {
    const section = document.createElement('section')
    section.classList = 'mb-3'
    section.innerHTML = 
    `
        <h3 class="rowTitle">${title}</h3>
        <div class="rail" data-rail></div>
    `
    const rail = section.querySelector('[data-rail]')
    shows.forEach ((show) => {
        rail.appendChild(posterCard(show))
    })

    rowsContainer.appendChild(section)    
}

const posterCard = show => {
    const card = document.createElement('div');
    card.className = 'card card-poster';

    const imgBaseUrl = 'https://image.tmdb.org/t/p/w500'; 
    const placeholder = 'https://placehold.co/600x400?text=Sin+Imagen';

    const img = show.poster_path 
                ? `${imgBaseUrl}${show.poster_path}` 
                : placeholder;
    const title = show.title;

    card.innerHTML = 
    `
        <img class="card-img-top" src="${img}">
        <div class="card-body p-2">
            <div class="small text-secondary">
                </div>
            <div class="fw-semibold">
                ${escapeHTML(title)} </div>
        </div>
    `;

    card.addEventListener('click', () => openDetail(show.id));
    return card;
}


const escapeHTML = s => {
    return (s||"").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

const starHTML = (voteAvg=0) => {
  const n = Math.round(voteAvg/2); // TMDB 0-10 -> 0-5 estrellas
  return `<span class="stars">${
    Array.from({length:5}, (_,i)=>`<i class="star ${i<n?'fill':''}"></i>`).join('')
  }</span><span>${(voteAvg||0).toFixed(1)}</span>`;
};

const badge = (txt) => `<span class="badge bg-secondary me-1">${txt}</span>`;

const imgUrl = (path, size='w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : 'https://placehold.co/800x1200?text=Sin+Imagen'
;

// Función para mostrar el detalle de una película en un modal
async function openDetail(id){
  const modalEl   = document.getElementById('detailModal');
  const modalBody = document.getElementById('detailBody');
  const modal     = bootstrap.Modal.getOrCreateInstance(modalEl);

  modalBody.innerHTML = `<div class="p-4 text-secondary">Cargando información...</div>`;
  modal.show();

  const [movie, videos, similar] = await Promise.all([
    fetchJSON(`${API}/movie/${id}`),
    fetchJSON(`${API}/movie/${id}/videos`),
    fetchJSON(`${API}/movie/${id}/similar?page=1`)
  ]);

  const youtubeTrailer = (videos.results||[]).find(v=>v.site==="YouTube" && v.type==="Trailer");

  const heroBG = imgUrl(movie.backdrop_path || movie.poster_path, 'w1280');
  const genres = (movie.genres||[]).map(g=>badge(g.name)).join('');
  const sims = (similar.results||[]).slice(0,12).map(s => `
    <div class="similar-card" data-id="${s.id}">
      <img src="${imgUrl(s.poster_path,'w342')}" alt="${escapeHTML(s.title||s.name||'')}" />
      <div class="t">${escapeHTML(s.title||s.name||'')}</div>
    </div>
  `).join('');

  modalBody.innerHTML = `
    <div class="modal-hero" style="background-image:url('${heroBG}');">
      <div class="modal-hero__play">
        ${youtubeTrailer ? `<button id="playTrailer" title="Ver tráiler">▶</button>` : ``}
      </div>
    </div>

    <div class="modal-section vertical-layout">
      <img class="img-fluid rounded-3 shadow-sm poster-center" 
          src="${imgUrl(movie.poster_path,'w500')}" 
          alt="${escapeHTML(movie.title||'')}" />

      <div class="title-row">
        <h3 class="mb-0">${escapeHTML(movie.title || movie.name || 'Sin título')}</h3>
        <div class="rating-info">${starHTML(movie.vote_average)}</div>
      </div>

      <div class="meta-small mb-2">
        ${(movie.release_date||movie.first_air_date||'N/A').slice(0,4)} | 
        ${(movie.original_language||'').toUpperCase()} | 
        ${(movie.genres||[]).map(g=>badge(g.name)).join('')}
      </div>

      <div class="modal-about">
        <h6>Sinopsis</h6>
        <p>${stripHTML(movie.overview || 'Sin descripción disponible.')}</p>
        ${youtubeTrailer ? `
          <a class="btn btn-danger mt-1" href="https://www.youtube.com/watch?v=${youtubeTrailer.key}" target="_blank">
            ▷ Ver Tráiler
          </a>` : `
          <button class="btn btn-secondary mt-1" disabled>Tráiler no disponible</button>
        `}
      </div>
    </div>

    ${ (similar.results||[]).length ? `
      <h6 class="similar-title">Otros usuarios también buscaron</h6>
      <div class="similar-rail" id="similarRail">${sims}</div>` : ``}
  `
  ;

  if (youtubeTrailer){
    const btn = document.getElementById('playTrailer');
    btn?.addEventListener('click', () => {
      window.open(`https://www.youtube.com/watch?v=${youtubeTrailer.key}`, '_blank');
    });
  }

  document.getElementById('similarRail')?.addEventListener('click', (e)=>{
    const card = e.target.closest('.similar-card');
    if(card){ openDetail(card.getAttribute('data-id')); }
  });
}

init()



