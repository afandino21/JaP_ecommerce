
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


// Verificar si el usuario está autentificado
function verificarAutenticacion() {
    var logueado = localStorage.getItem("logueado");
    if (logueado === "true") {
  
      console.log("El usuario está autenticado y su nombre es : " + localStorage.getItem("username"));
      cambiarInPorOut()
  
    } else {
  
      console.log("El usuario no está autenticado.");
  
      setTimeout(irAlLogin, 500);
  
    }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    verificarAutenticacion();
  
    var menu = document.getElementById('menu');
    var localLog = localStorage.getItem('logueado');
  
    if (localLog === "false") {
      menu.style.display = "none"
    };

});

function irAlLogin() {
    window.location.href = "login.html";
}

