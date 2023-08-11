
function registrarUsuario() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var boton = document.getElementById("regBtn");

    
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
        irAlIndex();
     
}
