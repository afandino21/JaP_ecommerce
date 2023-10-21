const productosCart = document.getElementById("productosCart");

function renderCart() {
    const storedInfo = localStorage.getItem('productInfo');
    const savedInfoArray = JSON.parse(storedInfo);
    let html = '';
    let total = 0;

    savedInfoArray.forEach((item, index) => {
        const cantidad = 1;
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
            actualizarSubtotal(input, savedInfoArray);
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

function actualizarSubtotal(input, savedInfoArray) {
    const index = input.getAttribute('data-index');
    const cantidad = parseInt(input.value);
    const item = savedInfoArray[index];
    const costo = item.cost;
    const subtotalElement = input.parentElement.nextElementSibling.querySelector('.subtotal-td');
    const subtotal = cantidad * costo;
    subtotalElement.textContent = `${subtotal} ${item.currency}`;
}

function actualizarLocalStorage(array) {
    localStorage.setItem('productInfo', JSON.stringify(array));
}

let productos = JSON.parse(localStorage.getItem('productInfo'));
let subtotal = 15200;
let costoEnvio = 0;

function costos() {
    productos.forEach(producto => {
        if (producto.currency == 'USD') {
            subtotal += producto.cost;
        } else {
            subtotal += Math.round(producto.cost / 40);
        }
        containerSubtotal.innerHTML = `USD ${subtotal}`;
    });
}

let opcionPremium = document.getElementById('opcionPremium');
let opcionExpress = document.getElementById('opcionExpress');
let opcionStandard = document.getElementById('opcionStandard');
let containerSubtotal = document.getElementById('containerSubtotal');
let containerEnvio = document.getElementById('containerEnvio');
let containerTotal = document.getElementById('containerTotal');

function containerCostos() {
    containerEnvio.innerHTML = `USD ${costoEnvio}`;
    containerTotal.innerHTML = `USD ${subtotal + costoEnvio}`;
}

opcionPremium.addEventListener('click', function () {
    costoEnvio = Math.round(subtotal * 0.15);
    containerCostos();
});

opcionExpress.addEventListener('click', function () {
    costoEnvio = Math.round(subtotal * 0.07);
    containerCostos();
});

opcionStandard.addEventListener('click', function () {
    costoEnvio = Math.round(subtotal * 0.05);
    containerCostos();
});

renderCart();
costos();

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
    let cantidadValida = true;
    cantidadInputs.forEach(input => {
        if (parseInt(input.value) <= 0) {
            cantidadValida = false;
        }
    });

    const tarjetaDeCreditoInput = document.getElementById('tarjetaDeCredito');
    const transferenciaBancariaInput = document.getElementById('transferenciaBancaria');

    if (calleInput.value.trim() === '' || numeroInput.value.trim() === '' || esquinaInput.value.trim() === '') {
        Swal.fire({
            title: 'Campos vacíos',
            text: 'Los campos de dirección no pueden estar vacíos.',
            icon: 'error',
        });
    } else if (!formaEnvioSeleccionada) {
        Swal.fire({
            title: 'Forma de envío no seleccionada',
            text: 'Debes seleccionar una forma de envío.',
            icon: 'error',
        });
    } else if (!cantidadValida) {
        Swal.fire({
            title: 'Cantidad inválida',
            text: 'La cantidad de productos en el carrito debe ser mayor a 0.',
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