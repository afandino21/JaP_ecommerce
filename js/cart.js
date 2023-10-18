// Realizar la solicitud fetch a la URL
fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
    .then(response => response.json())
    .then(data => {
        // Obtener la información del primer artículo
        const article = data.articles[0];

        // Manipular el DOM para mostrar la información
        document.getElementById("nombre").textContent = article.name;
        document.getElementById("costo").textContent = article.unitCost;
        document.getElementById("moneda").textContent = article.currency;
        document.getElementById("imagen").src = article.image;

        // Calcular y mostrar el subtotal al cambiar la cantidad
        const cantidadInput = document.getElementById("cantidad");
        const subtotalSpan = document.getElementById("subtotal");
        const monedaSubtotalSpan = document.getElementById("monedaSubtotal");
        subtotalSpan.textContent = parseFloat(article.unitCost);
        monedaSubtotalSpan.textContent = article.currency;


        cantidadInput.addEventListener("input", () => {
            const cantidad = parseInt(cantidadInput.value);
            const costo = parseFloat(article.unitCost);
            const subtotal = cantidad * costo;
            subtotalSpan.textContent = subtotal;
            monedaSubtotalSpan.textContent = article.currency;
        });
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });


// Obtén una referencia al elemento HTML con el ID "productosCart"
const productosCart = document.getElementById("productosCart");

// Función para renderizar la lista del carrito
function renderCart() {
    // Obtén el array almacenado en el localStorage con la clave "productInfo"
    const storedInfo = localStorage.getItem('productInfo');

    // Si hay información en el localStorage, convierte la cadena JSON en un array de JavaScript
    const savedInfoArray = JSON.parse(storedInfo);
    let html = ''; // Variable para acumular el HTML que se generará

    let total = 0; // Inicializa la variable total para el costo total del carrito

    // Recorre cada elemento en el array savedInfoArray
    savedInfoArray.forEach((item, index) => {
        // Obtén la cantidad inicial (en este caso, 1) y el costo del producto
        const cantidad = 1; // Puedes obtener la cantidad deseada del elemento HTML correspondiente
        const costo = item.cost;

        // Calcula el subtotal (cantidad multiplicada por el costo del producto)
        const subtotal = cantidad * costo;

        // Genera una fila HTML para el producto actual y agrega la información al HTML acumulado
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

    // Establece el contenido del elemento "productosCart" con el HTML generado
    productosCart.innerHTML = html;

    // Agrega un evento de escucha a los inputs para que se actualice el subtotal cuando cambia la cantidad
    const cantidadInputs = document.querySelectorAll('.cantidad-input');
    cantidadInputs.forEach(input => {
        input.addEventListener('input', () => {
            actualizarSubtotal(input, savedInfoArray);
        });
    });

    // Agrega un evento de escucha a los botones de eliminar para eliminar productos del carrito
    const eliminarButtons = document.querySelectorAll('.eliminar-btn');
    eliminarButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            // Elimina el producto del array y actualiza el localStorage y la vista del carrito
            savedInfoArray.splice(index, 1);
            actualizarLocalStorage(savedInfoArray);
            renderCart(); // Vuelve a renderizar la lista después de eliminar el objeto
        });
    });
}

// Función para actualizar el subtotal cuando cambia la cantidad de un producto
function actualizarSubtotal(input, savedInfoArray) {
    const index = input.getAttribute('data-index');
    const cantidad = parseInt(input.value);
    const item = savedInfoArray[index];
    const costo = item.cost;
    const subtotalElement = input.parentElement.nextElementSibling.querySelector('.subtotal-td');
    const subtotal = cantidad * costo;
    subtotalElement.textContent = `${subtotal} ${item.currency}`;
}

// Función para actualizar la información del carrito en el localStorage
function actualizarLocalStorage(array) {
    localStorage.setItem('productInfo', JSON.stringify(array));
}

function costos() {
    let productos = JSON.parse(localStorage.getItem('productInfo'));
    let container = document.getElementById('containerCostos');
    let subtotal = 0;
    let costoEnvio = 0;

    productos.forEach(producto => {
        if (producto.currency == 'USD') {
        subtotal += producto.cost;
        } else {
            subtotal += Math.round(producto.cost / 40);
          }
    }); 

    let opcionPremium = document.getElementById('opcionPremium');
    let opcionExpress = document.getElementById('opcionExpress');
    let opcionStandard = document.getElementById('opcionStandard');

    opcionPremium.addEventListener('click', function() {
        costoEnvio = Math.round(subtotal * 0.15);
        container.innerHTML = `
        <div class="container">
  <h2>Costos</h2>         
  <table class="table">
    <thead>
      <tr>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Subtotal</td>
        <td> </td>
        <td>USD ${subtotal}</td>
      </tr>
      <tr>
        <td>Envio</td>
        <td> </td>
        <td>USD ${costoEnvio}</td>
      </tr>
      <tr>
        <td>Total($)</td>
        <td> </td>
        <td>USD ${costoEnvio + subtotal}</td>
      </tr>
    </tbody>
  </table>
</div>

`;
    } )

    opcionExpress.addEventListener('click', function() {
        costoEnvio = Math.round(subtotal * 0.07);
        container.innerHTML =`
        <div class="container">
  <h2>Costos</h2>         
  <table class="table">
    <thead>
      <tr>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Subtotal</td>
        <td> </td>
        <td>USD ${subtotal}</td>
      </tr>
      <tr>
        <td>Envio</td>
        <td> </td>
        <td>USD ${costoEnvio}</td>
      </tr>
      <tr>
        <td>Total($)</td>
        <td> </td>
        <td>USD ${costoEnvio + subtotal}</td>
      </tr>
    </tbody>
  </table>
</div>

`;
    } )

    opcionStandard.addEventListener('click', function() {
        costoEnvio = Math.round(subtotal * 0.05);
        container.innerHTML = `
        <div class="container">
  <h2>Costos</h2>         
  <table class="table">
    <thead>
      <tr>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Subtotal</td>
        <td> </td>
        <td>USD ${subtotal}</td>
      </tr>
      <tr>
        <td>Envio</td>
        <td> </td>
        <td>USD ${costoEnvio}</td>
      </tr>
      <tr>
        <td>Total($)</td>
        <td> </td>
        <td>USD ${costoEnvio + subtotal}</td>
      </tr>
    </tbody>
  </table>
</div>

`;
    } )


    container.innerHTML += `
    <div class="container">
<h2>Costos</h2>         
<table class="table">
<thead>
  <tr>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Subtotal</td>
    <td> </td>
    <td>USD ${subtotal}</td>
  </tr>
  <tr>
    <td>Envio</td>
    <td> </td>
    <td>USD ${costoEnvio}</td>
  </tr>
  <tr>
    <td>Total($)</td>
    <td> </td>
    <td>USD ${costoEnvio + subtotal}</td>
  </tr>
</tbody>
</table>
</div>

`;



}

// Llama a la función para inicializar la lista del carrito cuando se carga la página
renderCart();
costos();

