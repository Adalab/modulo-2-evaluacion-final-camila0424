'use strict';

const animeUl  = document.querySelector(".js_animeUl ");

// DATOS

const oneAnimeMovie = {
  id: "1-93-po",
  name: "Tardis Blue",
  from: "Doctor Who",
  colors: ["003A6E", "9B9A99", "000000", "FFFFFF", "6F4500"],
};

// FUNCIONES

function renderColors(colors) {
  let colorHtml = "";

  for (const oneColor of colors) {
    colorHtml += `<div class="palette__color" style="background-color: #${oneColor};"></div>
    `;
  }

  return colorHtml;
}

function renderOneSpaceship(oneSpaceship) {
  const colorHtml = renderColors(oneSpaceship.colors);

  const html = `
    <li class="spaceship__item">
      <h2 class="title">${oneSpaceship.name}</h2>          
      <div class="palette">
        ${colorHtml}
      </div>
    </li>
  `;

  spaceshipsUl.innerHTML += html;

  return html;
}

// CUANDO CARGA LA PÁGINA

renderOneSpaceship(oneSpaceship);

