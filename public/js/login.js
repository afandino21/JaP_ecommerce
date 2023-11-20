function borrarDatosPerfil() {
    const email = localStorage.getItem("username");
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

borrarDatosPerfil();

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


function irAlIndex() {
    window.location.href = "index.html";
}

function logout() {
    localStorage.setItem("logueado", "false");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    var regBtn = document.getElementById("regBtn");
    if (regBtn) {
        regBtn.addEventListener("click", registrarUsuario);
    }
    var outBtn = document.getElementById("outBtn");
    if (outBtn) {
        outBtn.addEventListener("click", logout);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        registrarUsuario();
    }
});
