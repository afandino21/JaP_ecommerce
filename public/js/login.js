function localSessionData() {
    const email = document.getElementById("username").value;
    const datos = {
        nombre: "",
        segundoNombre: "",
        apellido: "",
        segundoApellido: "",
        email: email,
        numCelular: "",
        imagenURL: "https://cdn.drawception.com/images/panels/2017/12-27/sKB3FyFYpX-2.png",
    };
    localStorage.setItem("datosGuardados", JSON.stringify(datos));
}

document.addEventListener('submit', localSessionData);

function verificarAutenticacion() {
    var logueado = localStorage.getItem("logueado");
    var aviso = document.getElementById("p");
    var botonIn = document.getElementById("regBtn");
    var botonOut = document.getElementById("outBtn");
    var eliminar = document.getElementById("eliminar");

    if (logueado === "true") {
        console.log("El usuario está autenticado.");
        aviso.textContent = "Te encuentras logueado actualmente.";
        botonIn?.parentNode?.removeChild(botonIn);
        eliminar.textContent = "";
    } else {
        console.log("El usuario no está autenticado.");
        aviso.textContent = "Debes loguearte para acceder a la pagina.";
        botonOut?.parentNode?.removeChild(botonOut);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    verificarAutenticacion();
});

function mostrarMensaje(mensaje, exito) {
    var cartelPasa = document.getElementById('cartelYes');
    var cartelNoPasa = document.getElementById('cartelNo');
    var cartel = exito ? cartelPasa : cartelNoPasa;
    var otroCartel = exito ? cartelNoPasa : cartelPasa;

    cartel.textContent = mensaje;
    cartel.style.display = 'block';
    otroCartel.style.display = 'none';
}

function exito() {
    mostrarMensaje('Inicio de sesión realizado correctamente', false);
}

function noExito() {
    mostrarMensaje('Debe rellenar todos los campos', true);
}

function noExito2() {
    mostrarMensaje('El correo debe incluir @', true);
}
