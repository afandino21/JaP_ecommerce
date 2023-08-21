function registrarUsuario() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    //agregue la contraseña a la funcion
    if (username !== "" && password !== "") {

        localStorage.setItem("username", username);
        localStorage.setItem("logueado", "true");
        exito();
        setTimeout(irAlIndex, 2000);

    } else {
        noExito()
    }
}

function irAlIndex() {
    window.location.href = "index.html";
};


function exito() {
    var cartelPasa = document.getElementById('cartelYes');
    cartelPasa.textContent = 'Inicio de sesión realizado correctamente';
    cartelPasa.style.display = 'block';
};


function noExito() {
    var cartelNoPasa = document.getElementById('cartelNo');
    cartelNoPasa.textContent = 'Debe rellenar todos los campos';
    cartelNoPasa.style.display = 'block';
    setTimeout(function () {
        cartelNoPasa.style.display = "none";  // ver de en vez de usar un timeOut usar algo para que quede el cartel pero no se repita
    }, 3000);
};

function logout() {
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

document.addEventListener('DOMContentLoaded', function () {
    verificarAutenticacion();
});