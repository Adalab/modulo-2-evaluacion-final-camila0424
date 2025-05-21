'use strict';

const animeUl  = document.querySelector(".js_animeUl ");
const filterByNameInput =document.querySelector(".js_filterByNameInput")
const filterButton = document.querySelector(".js_filterButton")
const favouritesUl = document.querySelector (".js_favouritesUl")
const resetButton = document.querySelector('.js_resetButton')


//---------------------------------------------- DATOS----------------------------------------------------------

let allMovies =[];
let favourites = [];

// -------------------------------------------FUNCIONES-------------------------------------------------------------

function renderOneMovie(oneMovie) {    //render de 1 movie. Se pone el Li que se va a mostrar en el html
    const html = `
    <li class="anime-item js_animeItemLi" data-gancho="${oneMovie.mal_id}">
        <h2 class="name">${oneMovie.title}</h2>          
        <img src="${oneMovie.images.jpg.image_url}" alt="">
    </li> `;

  return html;
}



function renderAllMovies() {
  let html = '';
   
  for( const oneMovie of allMovies) {
    html += renderOneMovie(oneMovie);
  }

  animeUl.innerHTML = html;

  const allAnimeItemLi = document.querySelectorAll(".js_animeItemLi");
  for(const animeItemLi of allAnimeItemLi){
    animeItemLi.addEventListener('click', hadleClickMovies)
  }
}


//Es como agregar elementos a mi carrito de la compra (en este caso favourites)
function renderAllFavourites() {
  let html = '';

  for( const oneMovie of favourites ) {
    html += renderOneMovie(oneMovie);
  }

  favouritesUl.innerHTML = html;
  }


// Esta función me sirve para que cuando le doy click a un li (un paeli) esa peli haga algo, para eso uso el if
function hadleClickMovies(ev){


    //le ponemos el currentTarget para que me llame al elemento que tiene el Listener en este caso animeItemLi.addEventListener en el renderAll
    const clickedLi = ev.currentTarget;
    clickedLi.classList.toggle('favourite')
   
    // Identificamos el objeto asociado al <li> en el que se ha hecho click.
    const id_gancho = parseInt( clickedLi.dataset.gancho );

    // Averiguamos si ya es favorita
    const moviePositionFromFavs = favourites.findIndex(oneMovie => oneMovie.mal_id === id_gancho);
    if( moviePositionFromFavs === -1 ) {
      // La peli clickada no está en favoritas  
      const clickedMoviesItem = allMovies.find(oneMovie => oneMovie.mal_id === id_gancho);
    
      // Añadir el objeto en el array de favoritas con push 
      favourites.push(clickedMoviesItem);


      //el ls me empieza afuncionar desde aquí. desde que empiezo a agregar las pelis a favs
      localStorage.setItem( 'favouriteMovie', JSON.  stringify(favourites) );

      // Generamos otro <li> para esos datos
      const htmlOneMovie = renderOneMovie(clickedMoviesItem)

      // Ponemos el <li> en la sección de favoritos
      favouritesUl.innerHTML += htmlOneMovie;
    }
    else {
      // si la peli clickada SÍ está en favs 
      //Se utiliza el método de array splice para eliminar un elemento de la lista de favs (position,1(no poner nada))

      favourites.splice( moviePositionFromFavs, 1 );

      //luego se vulve a llamar a la función render de la linea 46
      renderAllFavourites();
     }
}



// filtrando con el API teniendo en cuenta el título
function handleClickFilterButton(ev) {
  ev.preventDefault();

  const title = filterByNameInput.value;
    //este feth nos ayuda a filtrar las pelis del API pero unicamente a través de un parametro, en este caso el title
  fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
    .then(res => res.json())
    .then(data => {
      allMovies = data.data;

      //quiero que solo me aparezca la que busco entonces vacío la lista. El API me muestra las conincidencias por nombre de peli pero también por personajes
      animeUl.innerHTML = '';

      renderAllMovies();
    });
}

//------------------------------------------------EVENTOS--------------------------------------------------------

resetButton.addEventListener('click', (event) => {
  event.preventDefault();
  filterByNameInput.value = ''; 
  favourites = [];
  favouritesUl.innerHTML = '';
  localStorage.removeItem('favouriteMovie');
}) 

filterButton.addEventListener('click', handleClickFilterButton);

// -----------------------------------------CUANDO CARGA LA PÁGINA-----------------------------------------------

//el fetch nos trae todas las peliculas del api
fetch('https://api.jikan.moe/v4/anime')
  .then(res => res.json())
  .then(data => {
    allMovies = data.data;
   
    renderAllMovies();
});

// Obtenemos las favoritos desde el LocalStorage línea 76
const favsFromLS = JSON.parse( localStorage.getItem('favouriteMovie') );

if( favsFromLS !== null ) {
  favourites = favsFromLS;
  renderAllFavourites();
}