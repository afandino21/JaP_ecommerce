function borrarDatosPerfil() {
    const email = localStorage.getItem("email");

    // Hacer una solicitud al servidor para obtener los datos del perfil
    fetch(`http://localhost:3000/details/${email}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener los datos del perfil: ${response.statusText}`);
            }
            return response.json();
        })
        .then(datosDesdeServidor => {
            // Actualizar los datos locales con los datos del servidor
            const datos = {
                nombre: datosDesdeServidor.nombre || "",
                segundoNombre: datosDesdeServidor.segundoNombre || "",
                apellido: datosDesdeServidor.apellido || "",
                segundoApellido: datosDesdeServidor.segundoApellido || "",
                email: datosDesdeServidor.email || email,
                telefono: datosDesdeServidor.telefono || "",
                imagenURL: datosDesdeServidor.imagenURL || "https://cdn.drawception.com/images/panels/2017/12-27/sKB3FyFYpX-2.png",
            };

            localStorage.setItem("datosGuardados", JSON.stringify(datos));
        })
        .catch(error => {
            console.error('Error al obtener los datos del perfil:', error);
        });
}

// Cambia el evento a 'submit' y pasa una referencia a la función en lugar de llamarla directamente
document.addEventListener('submit', borrarDatosPerfil);


function exito() {
    mostrarMensaje('Inicio de sesión realizado correctamente', false);
}

function noExito() {
    mostrarMensaje('Debe rellenar todos los campos', true);
}

function noExito2() {
    mostrarMensaje('El correo debe incluir @', true);
}

function registrarUsuario() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var aviso = document.getElementById("p");

    switch (true) {
        case email === "" && password === "":
            noExito();
            break;
        case email.includes("@"):
            if (email !== "" && password !== "") {
                localStorage.setItem("email", email);
                exito();
            } else {
                noExito();
            }
            break;
        case email !== "" && !email.includes("@"):
            noExito2();
            break;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var regBtn = document.getElementById("regBtn");
    if (regBtn) {
        regBtn.addEventListener("click", registrarUsuario);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        registrarUsuario();
    }
});
