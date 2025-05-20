'use strict';

const animeUl  = document.querySelector(".js_animeUl ");
const filterByNameInput =document.querySelector(".js_filterByNameInput")
const filterButton = document.querySelector(".js_filterButton")
const favouritesUl = document.querySelector (".js_favouritesUl")
const resetButton = document.querySelector('.js_resetButton')
// DATOS

let allMovies =[];
let favourites = [];

// FUNCIONES

function renderOneMovie(oneMovie) {    //render de 1 movie
    const html = `
    <li class="anime-item js_animeItemLi" data-gancho="${oneMovie.mal_id}">
        <h2 class="name">${oneMovie.title}</h2>          
        <img src="${oneMovie.images.jpg.image_url}" alt="">
    </li> `;

  animeUl.innerHTML += html;

  return html;
}

function renderAllMovies() {
  let html = '';
    console.log ('antes del all movies', allMovies)

  for( const oneMovie of allMovies) {
    html += renderOneMovie(oneMovie);
  }

  animeUl.innerHTML += html;

  const allAnimeItemLi = document.querySelectorAll(".js_animeItemLi");
  for(const animeItemLi of allAnimeItemLi){
    animeItemLi.addEventListener('click', hadleClickMovies)
  }
}


function renderAllFavourites() {
  let html = '';

  for( const oneMovie of favourites ) {
    html += renderOneMovie(oneMovie);
  }

  favouritesUl.innerHTML = html;
}


function hadleClickMovies(ev){
    const clickedLi = ev.currentTarget;
    clickedLi.classList.toggle('favourite')
   // Identificamos el objeto asociado al <li> en el que se ha hecho click.
    const id_gancho = parseInt( clickedLi.dataset.gancho );

    console.log("gancho de las movies", id_gancho);

    // Averiguamos si ya es favorita
    const moviePositionFromFavs = favourites.findIndex(oneMovie => oneMovie.id === id_gancho);
    
    console.log(moviePositionFromFavs);
    
    console.log(id_gancho, allMovies[0].mal_id);
   

    if( moviePositionFromFavs === -1 ) {
    // La nave clickada no está en favs  
      const clickedMoviesItem = allMovies.find(oneMovie => oneMovie.mal_id === id_gancho);
      console.log(clickedMoviesItem);

    // Añadir el objeto en el array de fav
      favourites.push(clickedMoviesItem);

      localStorage.setItem( 'favouriteMovie', JSON.  stringify(favourites) );

      console.log('allMovies', allMovies);
      console.log('favourites', favourites);




      // Generamos otro <li> para esos datos
      const htmlOneMovie = renderOneMovie(clickedMoviesItem)

      // Ponemos el <li> en la sección de favoritos
      favouritesUl.innerHTML += htmlOneMovie;
    }
    else {
    // La peli clickada SÍ está en favs
    console.log('La nave YA está en favs');    
  }

}

// CUANDO CARGA LA PÁGINA

fetch('https://api.jikan.moe/v4/anime')
  .then(res => res.json())
  .then(data => {
    allMovies = data.data;
    console.log('despues del data',data)
    renderAllMovies();
});

filterByNameInput.addEventListener("click", (event) =>{
    event.preventDefault()
})

filterButton.addEventListener("click", (event) =>{
    event.preventDefault()
})

    

resetButton.addEventListener('click', (event) => {
  event.preventDefault();
  filterByNameInput.value = ''; 
  favourites = [];
  favouritesUl.innerHTML = '';
  localStorage.removeItem('favouriteMovie');
}) 

// Obtenemos las favoritos desde el LocalStorage
const favsFromLS = JSON.parse( localStorage.getItem('favouriteMovie') );
console.log(favsFromLS);

if( favsFromLS !== null ) {
  favourites = favsFromLS;
  renderAllFavourites();
}


// Filtro con API

function handleClickFilterButton(ev) {
  ev.preventDefault();

  const title = filterByNameInput.value;
  //quiero que me filtre por el título puesto en el input pero no funciona con la api en este orden. Intenté ponerle la barra pero dice que es not found
  fetch(`https://api.jikan.moe/v4/anime/${title}`)
    .then(res => res.json())
    .then(data => {
      allMovies = data.data.title;

      renderAllMovies();
    });
}

filterButton.addEventListener('click', handleClickFilterButton);



//no me agrega nuevas pelis 