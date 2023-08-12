function registrarUsuario() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;

    if (username !== "" && email !== "" && email.includes("@")) {

        localStorage.setItem("logueado", "true");
        exito();
        setTimeout(irAlIndex, 2000); 
      
    } else {
        noExito()
    }
}

function irAlIndex(){
    window.location.href = "index.html";
};


function exito() {
    var cartelPasa = document.getElementById('cartelYes');
    cartelPasa.textContent = 'Inicio de sesión realizado correctamente';
    cartelPasa.style.display = 'block';
};


function noExito() {
    var cartelNoPasa = document.getElementById('cartelNo');
    cartelNoPasa.textContent = 'Debe rellenar todos los campos y el correo debe incluir @';
    cartelNoPasa.style.display = 'block';
    setTimeout(function() {
        cartelNoPasa.style.display = "none";
    }, 3000);
};

function logout(){
    localStorage.setItem("logueado", "false");
    window.location.href = "login.html";
}

function verificarAutenticacion() {
    var logueado = localStorage.getItem("logueado");
    var aviso = document.getElementById("p");
    var botonIn = document.getElementById("regBtn");
    var botonOut = document.getElementById("outBtn");
    var eliminar = document.getElementById("eliminar");

    if (logueado === "true") {

      console.log("El usuario está autenticado.");
      aviso.textContent = "Te encuentras logueado actualmente.";
      botonIn.parentNode.removeChild(botonIn);
      eliminar.textContent = ""

    } else {

      console.log("El usuario no está autenticado.");
      aviso.textContent = "Debes loguearte para acceder a la pagina."
      botonOut.parentNode.removeChild(botonOut);

    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    verificarAutenticacion();
  });