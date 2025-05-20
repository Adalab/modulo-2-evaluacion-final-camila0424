'use strict';

const animeUl  = document.querySelector(".js_animeUl ");
const filterByNameInput =document.querySelector(".js_filterByNameInput")
const filterButton = document.querySelector(".js_filterButton")
const selectButton =document.querySelector (".js_selectButton")
/* const favouritesUl = document.querySelector (".js_favouritesUl") */

// DATOS

let allMovies =[];
// FUNCIONES

function renderOneMovie(oneMovie) {    //render de 1 movie
    const html = `
    <li class="anime-item">
        <h2 class="name">${oneMovie.title}</h2>          
        <img src="${oneMovie.images.jpg.image_url}" alt="">
        <input class="selectbtn js_selectButton"
            type="submit"
            value="Agregar a favoritos"
        />
    </li>
  `;

  animeUl.innerHTML += html;

  return html;
}

function renderAllMovies() {
  let html = '';
    console.log ('antes del all movies', allMovies)
  for( const oneMovie of allMovies) {
    html += renderOneMovie(oneMovie);
  }

  animeUl.innerHTML = html;
}


// CUANDO CARGA LA PÁGINA

fetch('https://api.jikan.moe/v4/anime')
  .then(res => res.json())
  .then(data => {
    allMovies = data.data;
    console.log('despues del data',data)
    renderAllMovies();
});


/* renderOneMovie(oneMovie); */

filterByNameInput.addEventListener("click", (event) =>{
    event.preventDefault()
})

filterButton.addEventListener("click", (event) =>{
    event.preventDefault()
})

selectButton.addEventListener("click", (event) =>{
    event.preventDefault()
})