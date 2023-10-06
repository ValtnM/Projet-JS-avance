import { getUserCoords } from "./location.js";
import { haversine } from "./utils/math.js";

const elements = {
  cinemasList: document.querySelector(".cinemas-list"),
};

export const getCinemas = () => {
  return fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?order_by=fauteuils+desc")
    .then((res) => res.json())
    .then((res) => displayCinemas(res.results));
};

export const displayCinemas = async (cinemasList) => {
  const userCoords = await getUserCoords();

  let htmlElement = "";

  cinemasList.forEach((cinema) => {
    const cinemaCoords = [cinema.latitude, cinema.longitude];

    const distance = haversine(userCoords, cinemaCoords);

    htmlElement += `
              <article>
                  <h2>${cinema.nom}</h2>
                  <p>${cinema.adresse}</p>
                  <p>${cinema.code_insee} ${cinema.commune}</p>
                  <p class="armchair-nb">Nombre de fauteuils : ${cinema.fauteuils}</p>
                  <p class="distance">Distance : ${Math.round(distance)} km</p>
              </article>
          `;
  });

  elements.cinemasList.innerHTML = htmlElement;
};
