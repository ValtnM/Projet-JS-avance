import { getUserCoords } from "./location.js";
import { haversine } from "./utils/math.js";

export const elements = {
  cinemasList: document.querySelector(".cinemas-list"),
  paginationNav: document.querySelector(".pagination"),
};

// Récupération des salles de cinéma
export const getCinemas = (page = 1) => {
  return fetch(`https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?order_by=fauteuils+desc&offset=${page * 100}&limit=100`).then((res) => res.json());
};

// Récupération du nombre de cinéma
export const getNumberOfCinemas = async () => {
  const getNumberOfCinemas = await getCinemas().then((cinemas) => cinemas.total_count);
  return getNumberOfCinemas;
};

// Affichage de la liste des cinémas
export const displayCinemasList = async (cinemas) => {
  // Récupération des coordonnées de l'utilisateur
  const userCoords = await getUserCoords();

  let htmlElement = "";

  cinemas.results.forEach((cinema) => {
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
