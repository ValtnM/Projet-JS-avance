import { getNumberOfCinemas, getCinemas, displayCinemasList, elements } from "./cinemas.js";

// Création de la pagination
export const createPagination = async () => {
  const numberOfCinemas = await getNumberOfCinemas();
  const numberOfPages = Math.ceil(numberOfCinemas / 100);

  let outputHTML = "";

  if (numberOfPages > 1) {
    outputHTML += "<div class='page'><</div>";
  }

  elements.paginationNav.createElement;

  for (let page = 1; page < numberOfPages + 1; page++) {
    const listItem = document.createElement("li");
    listItem.classList.add("page");
    const link = document.createElement("a");
    link.classList.add("page-link");
    link.setAttribute("href", "#");
    link.dataset.page = page;
    link.textContent = page;
    link.addEventListener("click", (e) => {
      const selectedItem = document.querySelector(".selected");
      if (selectedItem) {
        selectedItem.classList.remove("selected");
      }

      e.preventDefault();
      e.target.parentNode.classList.add("selected");
      getCinemas(page).then((cinemas) => {
        displayCinemasList(cinemas);
      });
    });

    listItem.append(link);
    elements.paginationNav.append(listItem);
    if (page === 1) {
      link.parentNode.classList.add("selected");
    }
  }
};
