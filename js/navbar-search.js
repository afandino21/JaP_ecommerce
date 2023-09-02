// En esta versión, este .js no está siendo utilizado. Status: en proceso

// script para escribir el navbar en todos los HTML, para hacer los cambios m'as f'aciles de manejar
// Añadir barra de busqueda
const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
<path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
<path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
</svg>`;

// Obtén una referencia al elemento de la lista de navegación
const navList = document.getElementById("searchBar"); // aca esta usado searchBar

// Crea un nuevo elemento de lista
const searchListItem = document.createElement("div");

// Crea el contenedor para el campo de búsqueda
const searchContainer = document.createElement("div");
searchContainer.className = "input-group";

// Crea el elemento de entrada (input)
const inputElement = document.createElement("input");
inputElement.setAttribute("type", "search");
inputElement.setAttribute("placeholder", "🔍︎ Buscar...🔍︎");
inputElement.className = "form-control";// Aplica las clases de Bootstrap
inputElement.id = "inputBusqueda";

// Agrega el campo de entrada y el botón al contenedor
searchContainer.appendChild(inputElement);

// Agrega el contenedor de búsqueda al elemento de la lista
searchListItem.appendChild(searchContainer);

// Inserta el nuevo elemento de lista despues del elemento "Log-in"
const loginListItem = document.querySelector(".custom-link").lastElementChildNode;
navList.insertBefore(searchListItem, loginListItem);

// <i class="fa-solid fa-magnifying-glass"></i>   -- RIP lupita que esta buena para alguna imagen




