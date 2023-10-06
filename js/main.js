import { getCinemas, displayCinemasList } from "./module/cinemas.js";
import { createPagination } from "./module/pagination.js";

const main = () => {
  // Affichage des cinémas
  getCinemas().then((cinemas) => {
    displayCinemasList(cinemas);
  });

  // Création de la pagination
  createPagination();
};

main();
