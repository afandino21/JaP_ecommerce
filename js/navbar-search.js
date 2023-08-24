// script para escribir el navbar en todos los HTML, para hacer los cambios m'as f'aciles de manejar
// Añadir barra de busqueda
const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
<path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
<path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
</svg>`;

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
inputElement.className = "form-control";// Aplica las clases de Bootstrap
inputElement.id = "inputBusqueda";

// Crea el botón de envío (submit)
const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.className = "btn btn-orange-dark";
submitButton.id = "buttonBusqueda";
submitButton.textContent = "🔍︎"; // como alternativa, podriamos usar esta lupa sacada de bootsrap: https://icons.getbootstrap.com/icons/search-heart/

// Agrega el campo de entrada y el botón al contenedor
searchContainer.appendChild(inputElement);
searchContainer.appendChild(submitButton);

// Agrega el contenedor de búsqueda al elemento de la lista
searchListItem.appendChild(searchContainer);

// Inserta el nuevo elemento de lista despues del elemento "Log-in"
const loginListItem = document.querySelector(".custom-link").lastElementChildNode;
navList.insertBefore(searchListItem, loginListItem);

// <i class="fa-solid fa-magnifying-glass"></i>


//parte que hizo el brazuca joaozinho


document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('buttonBusqueda');

    searchButton.addEventListener('click', () => {
    // Obtén la lista de elementos de alguna fuente (por ejemplo, una API fetch)
        const searchInput = document.getElementById('inputBusqueda').value.toLowerCase();
        const url = `https://japceibal.github.io/emercado-api/cats_products/${searchInput}.json`;
    
    // Función para buscar 
    
  fetch(url)
  .then(response => {
    // Aquí puedes manejar la respuesta de la solicitud
    // La respuesta se pasa como parámetro "response"
    return response.json(); // Por ejemplo, para obtener los datos JSON de la respuesta
  })
  .then(data => {
    // Aquí puedes trabajar con los datos obtenidos
    console.log(data); // Por ejemplo, mostrar los datos en la consola
    //window.location.href = url; //te manda a la url del jonson baby
  })
  .catch(error => {
    // Manejo de errores en caso de que la solicitud falle
    console.error('Debes buscar por catID desde "101" al "109"');
  });

});

  });

