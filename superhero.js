//Variables
let img;
const BASE_URL = "https://superheroapi.com/api.php/3181965498742966";

// DOM Elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//button Clicks
searchButton.onclick = () => searchSuperHero(searchInput.value);

const getSuperHero = () => {
  const id = Math.floor(Math.random() * 731) + 1;
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((data) => getHeroImage(data));
};

const getHeroImage = (data) => {
  img = `${data.image.url}`;
  const stats = showHeroInfo(data);
  document.getElementById(
    "heroimage-container"
  ).innerHTML = `<h3>${data.name}</h3>
  <img src="${img}" height=200 width=200/>
  <h4>${data.biography.publisher}<h4>
  ${stats}
  `;
};

const searchSuperHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())
    .then((data) => {
      const hero = data.results[0];
      const stats = showHeroInfo(hero);
      document.getElementById(
        "heroimage-container"
      ).innerHTML = `<h3>${hero.name}</h3>
      <img src="${hero.image.url}" height=200 width=200/>
      <h4>${hero.biography.publisher}<h4>
      ${stats}
      `;
    });
};

const showHeroInfo = (character) => {
  const stats = Object.keys(character.powerstats).map((stat) => {
    return `<p>${stat.toUpperCase()}: ${character.powerstats[stat]} </p>`;
  });

  return stats.join("");
};
