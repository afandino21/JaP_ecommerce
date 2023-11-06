

// Funcionalidad de la paagina:
// 1- Ingreso por primera vez ---> te muestra los inputs para poner tus datos
// 2- Guardas, hace validacion. Y si esta todo OK, guarda la info en el localStorage te muestra tu perfil con la data que le pasaste 

//PROFILE PICTURE

//SUICIDIO COLECTIVO, ME VOY AL VALORANT UN RATITO Y EN LA TARDE LE METO MAS CALMADO.



// Se muestra el mail y los inputs para agregar data del usuario 


//// Boton guardar, evento
//btnModifyData = document.getElementById("btnModifyData");
//btnModifyData.addEventListener('click', (e) => {
//    e.preventDefault();
//    const email = document.getElementById('inputEmail');
//    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // expresion regular para verificar si el mail tiene formato de mail
//    if (emailRegex.test(email.value)) {
//        console.log('Formato de correo electrónico válido')
//        guardarValoresEnLocalStorage();
//        Swal.fire({
//            title: 'you logged in successfully',
//            icon: 'success',
//        });
//        mostrarValoresDesdeLocalStorage();
//    } else {
//        console.log('Formato de correo electrónico no válido');
//        Swal.fire({
//            title: 'Debes ingresar todos tus datos y el mail debe tener el formato adecuado (incluir @)',
//            icon: 'error',
//        });
//
//    }
//
//
//
//
//});

// Función para guardar los valores en el localStorage
function guardarValoresEnLocalStorage(event) {
    event.preventDefault();

    const inputNombre = document.getElementById("inputNombre").value;
    const inputSegundoNombre = document.getElementById("inputSegundoNombre").value;
    const inputApellido = document.getElementById("inputApellido").value;
    const inputSegundoApellido = document.getElementById("inputSegundoApellido").value;
    const inputEmail = document.getElementById("inputEmail").value;
    const inputNumCelular = document.getElementById("inputNumCelular").value;

    // Crear un objeto con los valores
    const datos = {
        nombre: inputNombre,
        segundoNombre: inputSegundoNombre,
        apellido: inputApellido,
        segundoApellido: inputSegundoApellido,
        email: inputEmail,
        numCelular: inputNumCelular,

    };
    // Guardar el objeto en el localStorage
    localStorage.setItem("datosGuardados", JSON.stringify(datos));
}

// Función para mostrar los valores almacenados en el localStorage en la consola
function mostrarValoresDesdeLocalStorage() {
    const inputNombre = document.getElementById("inputNombre");
    const inputSegundoNombre = document.getElementById("inputSegundoNombre");
    const inputApellido = document.getElementById("inputApellido");
    const inputSegundoApellido = document.getElementById("inputSegundoApellido");
    const inputEmail = document.getElementById("inputEmail");
    const inputNumCelular = document.getElementById("inputNumCelular");
    const datos = localStorage.getItem("datosGuardados");
    const email = localStorage.getItem("username");

    const datosToString = JSON.parse(datos)
    console.log(datosToString)


    if (inputNombre.value.trim() === ''){
        Swal.fire({
            title: 'Debe ingresar un nombre',
            icon: 'error',
        });  
    }else if (inputSegundoNombre.value.trim() === ''){
        Swal.fire({
            title: 'Debe ingresar su segundo nombre',
            icon: 'error',
        });  
    }else if(inputApellido.value.trim() === ''){
        Swal.fire({
            title: 'Deebe ingresar su apellido',
            icon: 'error',
        });  
    }else if (inputSegundoApellido.value.trim() === ''){
        Swal.fire({
            title: 'Debe ingresar su segundo apellido',
            icon: 'error',
        });  
    }else if (inputEmail.value.trim() ===''){
        Swal.fire({
            title: 'Debe ingresar su email',
            icon: 'error',
        });  
    }else if (inputNumCelular.value.trim() === ''){
        Swal.fire({
            title: 'Debe ingresar un numero de celular',
            icon: 'error',
        });  
    }else{
        inputNombre.value = datosToString.nombre
        inputSegundoNombre.value = datosToString.segundoNombre
        inputApellido.value = datosToString.apellido
        inputSegundoApellido.value = datosToString.segundoApellido
        inputEmail.value = email;
        inputNumCelular.value = datosToString.numCelular

        Swal.fire({
            title: 'Datos guardados correctamente',
            icon: 'success',
        });  
    }
}

function cargarLosDatosAlIniciarLaPagina(){
    const inputNombre = document.getElementById("inputNombre");
    const inputSegundoNombre = document.getElementById("inputSegundoNombre");
    const inputApellido = document.getElementById("inputApellido");
    const inputSegundoApellido = document.getElementById("inputSegundoApellido");
    const inputEmail = document.getElementById("inputEmail");
    const inputNumCelular = document.getElementById("inputNumCelular");
    const datos = localStorage.getItem("datosGuardados");
    const email = localStorage.getItem("username");
    const datosToString = JSON.parse(datos)
    
    
    inputNombre.value = datosToString.nombre
    inputSegundoNombre.value = datosToString.segundoNombre
    inputApellido.value = datosToString.apellido
    inputSegundoApellido.value = datosToString.segundoApellido
    inputEmail.value = email;
    inputNumCelular.value = datosToString.numCelular
}


cargarLosDatosAlIniciarLaPagina()
document.getElementById("guardarPerfil").addEventListener("click", guardarValoresEnLocalStorage)
document.getElementById("guardarPerfil").addEventListener("click", mostrarValoresDesdeLocalStorage)



