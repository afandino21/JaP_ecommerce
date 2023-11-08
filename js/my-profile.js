// Función para mostrar los valores almacenados en el localStorage en la consola
function mostrarValoresDesdeLocalStorage(event) {
    event.preventDefault();
    const inputNombre = document.getElementById("inputNombre");
    const inputSegundoNombre = document.getElementById("inputSegundoNombre");
    const inputApellido = document.getElementById("inputApellido");
    const inputSegundoApellido = document.getElementById("inputSegundoApellido");
    const inputEmail = document.getElementById("inputEmail");
    const inputNumCelular = document.getElementById("inputNumCelular");
    const datos = localStorage.getItem("datosGuardados");

    const datosToString = JSON.parse(datos)
    console.log(datosToString)


    if (inputNombre.value.trim() === '') {
        Swal.fire({
            title: 'Debe ingresar un nombre',
            icon: 'error',
        });
    } else if (inputSegundoNombre.value.trim() === '') {
        Swal.fire({
            title: 'Debe ingresar su segundo nombre',
            icon: 'error',
        });
    } else if (inputApellido.value.trim() === '') {
        Swal.fire({
            title: 'Deebe ingresar su apellido',
            icon: 'error',
        });
    } else if (inputSegundoApellido.value.trim() === '') {
        Swal.fire({
            title: 'Debe ingresar su segundo apellido',
            icon: 'error',
        });
    } else if (inputEmail.value.trim() === '') {
        Swal.fire({
            title: 'Debe ingresar su email',
            icon: 'error',
        });
    } else if (!inputEmail.value.includes("@")) {
        Swal.fire({
            title: 'Su email debe contener @',
            icon: 'error',
        });
    } else if (inputNumCelular.value.trim() === '' || isNaN(inputNumCelular.value)) {
        Swal.fire({
            title: 'Debe ingresar un número de telefono valido',
            icon: 'error',
        });
    } else {

        localStorage.setItem("username", inputEmail.value)
        var claseLogin = document.querySelectorAll(".custom-link");
        var storedValue = localStorage.getItem("username");
        for (var i = 0; i < claseLogin.length; i++) {
            claseLogin[i].textContent = storedValue;
        }
        // Crear un objeto con los valores
        const datos = {
            nombre: inputNombre.value,
            segundoNombre: inputSegundoNombre.value,
            apellido: inputApellido.value,
            segundoApellido: inputSegundoApellido.value,
            email: inputEmail.value,
            numCelular: inputNumCelular.value,
        };

        // Actualizar solo la propiedad imagenURL
        datos.imagenURL = profileImage.src;

        // Guardar el objeto en el localStorage
        localStorage.setItem("datosGuardados", JSON.stringify(datos));


        Swal.fire({
            title: 'Datos guardados correctamente',
            icon: 'success',
        });
    }

}

function cargarDatos() {
    const inputNombre = document.getElementById("inputNombre");
    const inputSegundoNombre = document.getElementById("inputSegundoNombre");
    const inputApellido = document.getElementById("inputApellido");
    const inputSegundoApellido = document.getElementById("inputSegundoApellido");
    const inputEmail = document.getElementById("inputEmail");
    const inputNumCelular = document.getElementById("inputNumCelular");
    const profileImage = document.getElementById("profileImage");
    const datos = localStorage.getItem("datosGuardados");
    const email = localStorage.getItem("username");
    let datosToString = JSON.parse(datos)
    if (datosToString === null) {
        datosToString = {
            nombre: '',
            segundoNombre: '',
            apellido: '',
            segundoApellido: '',
            email: '',
            numCelular: '',
            imagenURL: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Download.png',
        }
    }

    inputNombre.value = datosToString.nombre;
    inputSegundoNombre.value = datosToString.segundoNombre;
    inputApellido.value = datosToString.apellido;
    inputSegundoApellido.value = datosToString.segundoApellido;
    inputEmail.value = email;
    inputNumCelular.value = datosToString.numCelular;
    profileImage.src = datosToString.imagenURL;
}

// funcionalidad para la imagen de perfil

const profileImage = document.getElementById("profileImage");
const imageInput = document.getElementById("imageInput");
const changeImageBtn = document.getElementById("changeImageBtn");

// Agregar un evento click al botón para abrir el cuadro de diálogo de archivo
changeImageBtn.addEventListener("click", () => {
    imageInput.click();
});

// Agregar un evento change al input de archivo
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;

            // Guardar la imagen en el array "datos"
            const datosGuardados = localStorage.getItem("datosGuardados");
            if (datosGuardados) {
                const datos = JSON.parse(datosGuardados);
                datos.imagenURL = e.target.result;
                localStorage.setItem("datosGuardados", JSON.stringify(datos));
            }
        };
        reader.readAsDataURL(file);

    }
});

cargarDatos()
document.getElementById("guardarPerfil").addEventListener("click", mostrarValoresDesdeLocalStorage)




