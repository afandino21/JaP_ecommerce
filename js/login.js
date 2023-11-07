function borrarDatosPerfil(){
    // Crear un objeto con los valores
    
    const email = localStorage.getItem("username");
    const datos = {
    nombre: "",
    segundoNombre: "",
    apellido: "",
    segundoApellido: "",
    email: email,
    numCelular: "",
    imagenURL: "https://th.bing.com/th/id/R.b9f2a0a089c701e8a133886239ad53b8?rik=KNP%2foOI9bk%2f1xw&riu=http%3a%2f%2fthumbor-prod-us-east-1.photo.aws.arc.pub%2fEDCSwWez7LyWyxdS2dDdKOYCHmk%3d%2farc-anglerfish-arc2-prod-copesa%2fpublic%2fZ2NK6DYAPBHO3BVPUE25LQ22ZA.jpg&ehk=EXnNjAZaZJrtocPM8CjvdbtaQ46n9j6M%2feZdJgpix5k%3d&risl=&pid=ImgRaw&r=0",

    };
  // Guardar el objeto en el localStorage
    localStorage.setItem("datosGuardados", JSON.stringify(datos));
}
borrarDatosPerfil()

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

function mostrarMensaje(mensaje, exito) {

    var cartelPasa = document.getElementById('cartelYes');
    var cartelNoPasa = document.getElementById('cartelNo');
    var isCartelPasaVisible = true;
    var cartel = exito ? cartelPasa : cartelNoPasa;
    var otroCartel = exito ? cartelNoPasa : cartelPasa;

    cartel.textContent = mensaje;
    cartel.style.display = 'block';
    otroCartel.style.display = 'none';

    isCartelPasaVisible = exito;
};

function exito() {
    mostrarMensaje('Inicio de sesión realizado correctamente', false)
};

function noExito() {
    mostrarMensaje('Debe rellenar todos los campos', true)
};
function noExito2() {
    mostrarMensaje('El correo debe inculir @', true)
};

function registrarUsuario() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var aviso = document.getElementById("p");

    switch (true) {
        case username === "" && password === "":
        noExito();
        break;
    
        case username.includes("@"):
        if (username !== "" && password !== "") {
            localStorage.setItem("username", username);
            localStorage.setItem("logueado", "true");
            aviso.textContent = "Aguarde un momento...";
            exito();
            setTimeout(irAlIndex, 3000);
        } else {
            noExito();
        }
        break;
    
        case username !== "" && !username.includes("@"):
        noExito2();
        break;
    }
}

function irAlIndex() {
    window.location.href = "index.html";
};

function logout() {
    localStorage.setItem("logueado", "false");
    window.location.href = "login.html";
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        registrarUsuario();
    }
});



