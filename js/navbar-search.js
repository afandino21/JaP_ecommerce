// Añadir barra de búsqueda
const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">...</svg>`;

// Obtén una referencia al elemento de la lista de navegación
const navList = document.querySelector(".navbar-nav");

// Crea un nuevo elemento de lista
const searchListItem = document.createElement("li");
searchListItem.className = "nav-item";

// Crea el contenedor para el campo de búsqueda
const searchContainer = document.createElement("div");
searchContainer.className = "input-group";

// Crea el elemento de entrada (input)
const inputElement = document.createElement("input");
inputElement.setAttribute("type", "search");
inputElement.setAttribute("placeholder", "Buscar...");
inputElement.className = "form-control";
inputElement.id = "inputBusqueda";

// Crea el botón de envío (submit)
const submitButton = document.createElement("button");
submitButton.setAttribute("type", "button"); // Cambiado a "button"
submitButton.className = "btn btn-orange-dark";
submitButton.id = "buttonBusqueda";
submitButton.innerHTML = searchIcon;

// Agrega el campo de entrada y el botón al contenedor
searchContainer.appendChild(inputElement);
searchContainer.appendChild(submitButton);

// Agrega el contenedor de búsqueda al elemento de la lista
searchListItem.appendChild(searchContainer);

// Inserta el nuevo elemento de lista después del elemento "Log-in"
const loginListItem = document.querySelector(".custom-link").lastElementChild;
navList.insertBefore(searchListItem, loginListItem);

// Manejo de búsqueda
const searchInput = document.getElementById('inputBusqueda');
const searchButton = document.getElementById('buttonBusqueda');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
});

// Función para buscar y redirigir
function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const catIDs = [101, 102, 103, 104, 105, 106, 107, 108, 109];
  let matchingProducts = [];

  catIDs.forEach(catID => {
    fetch(`https://japceibal.github.io/emercado-api/cats_products/${catID}.json`)
      .then(response => response.json())
      .then(data => {
        const products = data.products;
        const matchingProductsInCategory = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm)
        );
        matchingProducts = matchingProducts.concat(matchingProductsInCategory);
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => {
        if (matchingProducts.length > 0) {
          localStorage.setItem("matchingProducts", JSON.stringify(matchingProducts));
          window.location.href = 'search-results.html';
        }
      });
  });
}
