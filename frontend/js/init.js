const CATEGORIES_URL = "http://localhost:3000/cats/cat";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/publish";
const PRODUCTS_URL = "http://localhost:3000/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments/";
const CART_INFO_URL = "http://localhost:3000/user_cart/";
const CART_BUY_URL = "http://localhost:3000/cart/buy";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}
// Cambia 
function cambiarInPorOut() {

  var claseLogin = document.querySelectorAll(".custom-link");
  var storedValue = localStorage.getItem("email");

  for (var i = 0; i < claseLogin.length; i++) {
    claseLogin[i].textContent = storedValue;
  }
}
cambiarInPorOut()
// Función para cambiar el modo (claro u oscuro)
function cambiarModo() {
  const navbar = document.querySelector('.navbar');
  const botonModo = document.getElementById('modoBoton');
  const bodyElements = document.body;

  if (navbar.classList.contains('navbar-dark')) {
    // Cambia a modo claro
    bodyElements.style.background = 'white';
    bodyElements.style.color = 'black';
    navbar.classList.remove('navbar-dark', 'bg-dark');
    navbar.classList.add('navbar-light', 'bg-light');
    botonModo.innerText = '☼';
  } else {
    // Cambia a modo oscuro
    bodyElements.style.background = 'hsl(210, 20%, 20%)';
    bodyElements.style.color = 'white';
    navbar.classList.remove('navbar-light', 'bg-light');
    navbar.classList.add('navbar-dark', 'bg-dark');
    botonModo.textContent = '☾';
  }

  // Guarda el estado en el almacenamiento local
  const modoActual = navbar.classList.contains('navbar-light') ? 'Modo Día' : 'Modo Noche';
  localStorage.setItem('modo', modoActual);
}

// Verifica si hay un modo guardado en el almacenamiento local y aplica el modo correspondiente
const modoGuardado = localStorage.getItem('modo');
if (modoGuardado === 'Modo Noche') {
  cambiarModo(); // Aplica el modo claro si está guardado
}

// Agrega un evento clic al botón para cambiar el modo
const botonModo = document.getElementById('modoBoton');
botonModo.addEventListener('click', cambiarModo);


