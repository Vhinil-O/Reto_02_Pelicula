# Clase 23/10/2025

---

Para la segunda sesion de trabajo el equipo dividio la carga de trabajo de la siguiente manera:
- 🌟Paola Ornelas: Modificaciones pertinentes en figma (estetica modal), cracion de la parte main en el archivo html
- 🐈‍⬛Edgar Medina: Es el encargado de la parte del header en el html lo que incluye el mismo header como el navegador
- 🥷Zianya Hinojosa: Es la encargada de crear footer de la pagina en el html
- 🪰Diego Sanchez: En el encargado de documentacion y colaboracion activa en la parte del main tanto en html como en JavaScript

---

## Codigo implementado

Para trabajar con la API de 'The Movie DB' es necesario obtener tu API key y agregarlo a un archivo config.js como se muestra a continaucion:

```
reto_02_pelicula/
|-index.html
|-css/
|--app.css
|-js/
|--app.js
|-assets/
|-config.js
|-.gitignore
```

El archivo debe de contener lo siguiente: `API_KEY="tu_llave_secreta_aqui_12345"`

Por su parte el header y nav-bar trabajado por 🐈‍⬛Edgar es el siguiente hasta el momento:
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

El footer desarrollado por 🥷Zianya es el siguiente

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

Y debido a problemas con entender la concepcion del JavaScript las unicas modificaciones fueron en config.js

```

```

---
## Otras actualizaciones

- 🔠[Home](README.md)