const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
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



// Verificar si el usuario está autentificado
function verificarAutenticacion() {
  var logueado = localStorage.getItem("logueado");
  if (logueado === "true") {

    console.log("El usuario está autenticado y su nombre es : " + localStorage.getItem("username"));
    cambiarInPorOut()

  } else {

    console.log("El usuario no está autenticado.");

    setTimeout(irAlLogin, 2500);

  }
}

document.addEventListener('DOMContentLoaded', function () {
  verificarAutenticacion();

  var menu = document.getElementById('menu')
  var localLog = localStorage.getItem('logueado');

  if (localLog ==="false"){
    menu.style.display="none"
  }

});

function irAlLogin() {
  window.location.href = "login.html";
}

// Cambia 
function cambiarInPorOut() {

  var claseLogin = document.querySelectorAll(".custom-link");
  var storedValue = localStorage.getItem("username");

  for (var i = 0; i < claseLogin.length; i++) {
    claseLogin[i].textContent = storedValue;
  }
}

function cerrarSesion(){
  localStorage.setItem("logueado", "false");
}

