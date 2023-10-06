const elements = {
  cinemasList: document.querySelector(".cinemas-list"),
};

export const getCinemas = () => {
  return fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?order_by=fauteuils+desc")
    .then((res) => res.json())
    .then((res) => displayCinemas(res.results));
};

export const displayCinemas = (cinemasList) => {
  let htmlElement = "";

  cinemasList.forEach((cinema) => {
    htmlElement += `
              <article>
                  <h2>${cinema.nom}</h2>
                  <p>${cinema.adresse}</p>
                  <p>${cinema.code_insee} ${cinema.commune}</p>
                  <p class="armchair-nb">Nombre de fauteuils : ${cinema.fauteuils}</p>
              </article>
          `;
  });

  elements.cinemasList.innerHTML = htmlElement;
};
