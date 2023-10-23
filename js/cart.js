const productosCart = document.getElementById("productosCart");


// Funcion que genera el carrito en base al array del carrito en localStorage

function renderCart() {
    const storedInfo = localStorage.getItem('productInfo');
    const savedInfoArray = JSON.parse(storedInfo);
    const longitud = savedInfoArray.length
    const contenidoCart = document.getElementById("contenidoCart");
    const alertaCarritoVacio = document.getElementById("alertaCarritoVacio");

    if (longitud === 0) {
        contenidoCart.style.display = "none";
        alertaCarritoVacio.style.display = "block";
    } else {
        contenidoCart.style.display = "block";
        alertaCarritoVacio.style.display = "none";
    };

    let html = '';



    savedInfoArray.forEach((item, index) => {
        const cantidad = item.cartCount;
        const costo = item.cost;
        const subtotal = cantidad * costo;

        html += `
            <tr>
                <td class="d-none d-md-table-cell"><img src="${item.images[0]}" style="width: 100px;"></td>
                <td><span class="nombre">${item.name}</span></td>
                <td class="d-none d-md-table-cell"><span class="subtotal">${costo} ${item.currency}</span></td>
                <td><input type="number" class="cantidad-input" data-index="${index}" style="width: 70px;" value="${cantidad}" min="1" max="10"></td>
                <td><span class="subtotal-td" data-subtotal="${subtotal} ${item.currency}">${subtotal} ${item.currency}</span></td>
                <td><button class="btn btn-danger eliminar-btn" data-index="${index}">╳</button></td>
            </tr>
        `;
    });

    productosCart.innerHTML = html;

    const cantidadInputs = document.querySelectorAll('.cantidad-input');
    cantidadInputs.forEach(input => {
        input.addEventListener('input', () => {
            actualizarCantProducto(input, savedInfoArray);
        });
    });

    const eliminarButtons = document.querySelectorAll('.eliminar-btn');
    eliminarButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            savedInfoArray.splice(index, 1);
            actualizarLocalStorage(savedInfoArray);
            renderCart();
        });
    });
}

// Actualizar cantidad de un producto en el carrito y el subtotal en la linea del carrito

function actualizarCantProducto(input, savedInfoArray) {

    const index = input.getAttribute('data-index');
    const cantidad = parseInt(input.value);
    const item = savedInfoArray[index];
    const costo = item.cost;
    const subtotalElement = input.parentElement.nextElementSibling.querySelector('.subtotal-td');
    const subtotal = cantidad * costo;
    subtotalElement.textContent = `${subtotal} ${item.currency}`;

    item.cartCount = cantidad;
    actualizarLocalStorage(savedInfoArray);
    costos();
    containerCostos()
}

function actualizarLocalStorage(array) {
    localStorage.setItem('productInfo', JSON.stringify(array));
}


// Calculo de subtotal / costo de envio / total de la compra
let productos = JSON.parse(localStorage.getItem('productInfo'));
let subtotal = 0;
let costoEnvio = 0;
let descuento = 0;

let opcionPremium = document.getElementById('opcionPremium');
let opcionExpress = document.getElementById('opcionExpress');
let opcionStandard = document.getElementById('opcionStandard');
let containerSubtotal = document.getElementById('containerSubtotal');
let containerEnvio = document.getElementById('containerEnvio');
let containerTotal = document.getElementById('containerTotal');


opcionPremium.addEventListener('click', function () {
    descuento = 0.15;
    containerCostos();
});

opcionExpress.addEventListener('click', function () {
    descuento = 0.07;
    containerCostos();
});

opcionStandard.addEventListener('click', function () {
    descuento = 0.05;
    containerCostos();
});


// funcion costos calcula el subtotal de la compra
function costos() {
    productos = JSON.parse(localStorage.getItem('productInfo'));
    subtotal = 0;
    productos.forEach(producto => {
        if (producto.currency == 'USD') {
            subtotal += producto.cost * producto.cartCount;
        } else {
            subtotal += Math.round(producto.cost / 40) * producto.cartCount;
        }
        containerSubtotal.innerHTML = `USD ${subtotal}`;
    });
}

// Funcion que actualiza el valor del costo de envio y el total de compra
function containerCostos() {

    costoEnvio = Math.round(subtotal * descuento);
    containerEnvio.innerHTML = `USD ${costoEnvio}`;
    containerTotal.innerHTML = `USD ${subtotal + costoEnvio}`;
}

// Se genera el carrito y se calcula el subtotal
renderCart();
costos();


// Funcionalidad del modal
const tarjetaDeCreditoInput = document.getElementById('tarjetaDeCredito');
const transferenciaBancariaInput = document.getElementById('transferenciaBancaria');

tarjetaDeCreditoInput.addEventListener('change', () => {
    const tarjetaInput = document.getElementById('numeroTarjeta');
    const codigoSegInput = document.getElementById('codigoSeg');
    const vencimientoInput = document.getElementById('vencimiento');
    const cuentaInput = document.getElementById('numeroCuenta');
    const textoMetodoDePago = document.getElementById('metodoDePago');

    textoMetodoDePago.innerHTML = "Tarjeta de Credito";
    tarjetaInput.removeAttribute('disabled');
    codigoSegInput.removeAttribute('disabled');
    vencimientoInput.removeAttribute('disabled');
    cuentaInput.setAttribute('disabled', 'true');
});

transferenciaBancariaInput.addEventListener('change', () => {
    const cuentaInput = document.getElementById('numeroCuenta');
    const tarjetaInput = document.getElementById('numeroTarjeta');
    const codigoSegInput = document.getElementById('codigoSeg');
    const vencimientoInput = document.getElementById('vencimiento');
    const textoMetodoDePago = document.getElementById('metodoDePago');

    textoMetodoDePago.innerHTML = "Transferencia Bancaria";
    cuentaInput.removeAttribute('disabled');
    tarjetaInput.setAttribute('disabled', 'true');
    codigoSegInput.setAttribute('disabled', 'true');
    vencimientoInput.setAttribute('disabled', 'true');
});


// Finalizar Compra - funcionalidad de boton y validacion de formulario
const finalizarCompraBoton = document.getElementById('finalizarCompraBoton');

finalizarCompraBoton.addEventListener('click', function () {
    const calleInput = document.getElementById('calle');
    const numeroInput = document.getElementById('numero');
    const esquinaInput = document.getElementById('esquina');
    const formaEnvioInputs = document.querySelectorAll('input[name="opcion"]');
    let formaEnvioSeleccionada = false;
    formaEnvioInputs.forEach(input => {
        if (input.checked) {
            formaEnvioSeleccionada = true;
        }
    });

    const cantidadInputs = document.querySelectorAll('.cantidad-input');


    let cantidadValida = false;
    cantidadInputs.forEach(input => {
        if (parseInt(input.value) > 0) {
            cantidadValida = true;
        }
    });

    const tarjetaDeCreditoInput = document.getElementById('tarjetaDeCredito');
    const transferenciaBancariaInput = document.getElementById('transferenciaBancaria');

    if (!cantidadValida) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'La cantidad de productos en el carrito debe ser mayor a 0.',
            icon: 'error',
        });
    } else if (!formaEnvioSeleccionada) {
        Swal.fire({
            title: 'Forma de envío no seleccionada',
            text: 'Debes seleccionar una forma de envío.',
            icon: 'error',
        });
    } else if (calleInput.value.trim() === '' || numeroInput.value.trim() === '' || esquinaInput.value.trim() === '') {
        Swal.fire({
            title: 'Campos vacíos',
            text: 'Los campos de dirección no pueden estar vacíos.',
            icon: 'error',
        });
    } else if (!(tarjetaDeCreditoInput.checked || transferenciaBancariaInput.checked)) {
        Swal.fire({
            title: 'Forma de pago no seleccionada',
            text: 'Debes seleccionar una forma de pago.',
            icon: 'error',
        });
    } else if (tarjetaDeCreditoInput.checked) {
        const numeroTarjetaInput = document.getElementById('numeroTarjeta');
        const codigoSegInput = document.getElementById('codigoSeg');
        const vencimientoInput = document.getElementById('vencimiento');
        if (numeroTarjetaInput.value.trim() === '' || codigoSegInput.value.trim() === '' || vencimientoInput.value.trim() === '') {
            Swal.fire({
                title: 'Campos de tarjeta de crédito vacíos',
                text: 'Debes completar los campos de tarjeta de crédito.',
                icon: 'error',
            });
        } else {
            Swal.fire({
                title: 'Compra exitosa',
                text: '¡Gracias por tu compra!',
                icon: 'success',
            });
        }
    } else if (transferenciaBancariaInput.checked) {
        const numeroCuentaInput = document.getElementById('numeroCuenta');
        if (numeroCuentaInput.value.trim() === '') {
            Swal.fire({
                title: 'Número de cuenta no proporcionado',
                text: 'Debes completar el campo de número de cuenta para transferencia bancaria.',
                icon: 'error',
            });
        } else {
            Swal.fire({
                title: 'Compra exitosa',
                text: '¡Gracias por tu compra!',
                icon: 'success',
            });
        }
    }
});


// Función para generar el PDF
document.getElementById("finalizarCompraBoton").addEventListener("click", function () {

    const storedInfo = localStorage.getItem('productInfo');
    const savedInfoArray = JSON.parse(storedInfo);
    console.log(savedInfoArray)

    // Definir el contenido del documento en JavaScript
    var docDefinition = {
        content: [
            { text: 'Mi Documento PDF', style: 'header' },
            'Este es un ejemplo de cómo generar un PDF con PDFMake.',
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            }
        }
    };
    // Generar el PDF y descargarlo
    pdfMake.createPdf(docDefinition).open();//.download("mi_archivo.pdf");

});



