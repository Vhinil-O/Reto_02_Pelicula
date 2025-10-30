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
<<<<<<< HEAD
  searchBar();
};
=======
  renderRow("Tendencias", movies.slice(0,20))
}
>>>>>>> main

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
<<<<<<< HEAD
  });
};

//funcion para barra de busqueda
  const searchBar = () => {
    const input = document.getElementById('inputSearch')

    input.addEventListener('keyup', async (e) =>{  // e verifica el evento
       
       if (e.key !== 'Enter') { //detecta el enter para buscar
        return;
       }// fin del if e key
       const query = input.value.trim()
       if (!query) {
            return;
        }

       try {
        const data = await fetchJSON(`${API}/search/movie?query=${encodeURIComponent(query)}`);
        if (data.results && data.results.length > 0) {
           console.log('Resultados encontrados', data.results.length)
           const primerPelicula = data.results[0] //obtiene la primer coincidencia
           renderHero(primerPelicula);
           console.log('Resto de resultado', data.results.slice(1)) ;
        } else {
          showMessage(`No se encontraron resultados para ${query}`) 
        }
       } catch (error) {
        console.log('Error en busqueda', error)
        showMessage('Error al buscar. Intenta nuevamente')
       } 
    })
    
  }

 

 const showMessage = (message) => {
    rowsContainer.innerHTML = `
        <div class="text-center py-5">
            <h3 class="text-secondary">${message}</h3>
        </div>
    `;
};

const openMovieDetail = (movieId) => {
    console.log('Abriendo detalles de película:', movieId);
    alert(`Próximamente: Detalles de la película ID: ${movieId}`);
};

init();
=======
  })
}
>>>>>>> main

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

// Función para mostrar el detalle de una película en un modal
const openDetail = async (id) => {
  const modalEl = document.getElementById('detailModal')
  const modalBody = document.getElementById('detailBody')
  const modalTitle = document.getElementById('detailTitle')
  modalTitle.textContent = 'Cargando...'
  modalBody.innerHTML = '<p class="text-secondary">Cargando información...</p>'

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl)

  const movie = await fetchJSON(`${API}/movie/${id}`) // Obtener detalles de la película a través de la API
  const videos = await fetchJSON(`${API}/movie/${id}/videos`)
  const youtubeTrailer = videos.results.find(v => v.site === "YouTube" && v.type === "Trailer")
  const genres = (movie.genres || []).map(g => `
  <span class="badge bg-secondary me-1">${g.name}</span>
  `).join("")

  // Extraer detalles para mostrarlos en el modal
  modalTitle.textContent = movie.title || 'Sin título'
  modalBody.innerHTML = `
    <div class="row g-4">
      <div class="col-md-5">
        <img class="img-fluid rounded shadow" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      </div>
      <div class="col-md-7">
        <p class="mb-1 text-secondary">
          <strong>${movie.release_date?.slice(0,4) || 'N/A'}</strong> | ${(movie.original_language || '').toUpperCase()} | ⭐ ${movie.vote_average?.toFixed(1) || 'N/A'}
        </p>
        <div class="mb-2">${genres}</div>
        <h6 class="fw-bold mb-2">Sinopsis</h6>
        <p class="small text-light mb-3">
          ${stripHTML(movie.overview || 'Sin descripción disponible.')}
        </p>
        ${youtubeTrailer ? `
          <a class="btn btn-danger" href="https://www.youtube.com/watch?v=${youtubeTrailer.key}" target="_blank">
            ▷ Ver Tráiler
          </a>
          ` : `
            <button class="btn btn-secondary" disabled>
              Tráiler no disponible
            </button>
          `}
        </div>
      </div>
      ${movie.similar ? `<hr><h6>Similares</h6>` : ''}
    `
    modal.show()
}

init()




