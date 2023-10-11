      //  // Realizar la solicitud fetch a la URL
      //  fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
      //      .then(response => response.json())
      //      .then(data => {
      //          // Obtener la información del primer artículo
      //          const article = data.articles[0];
//
      //          // Manipular el DOM para mostrar la información
      //          document.getElementById("nombre").textContent = article.name;
      //          document.getElementById("costo").textContent = article.unitCost;
      //          document.getElementById("moneda").textContent = article.currency;
      //          document.getElementById("imagen").src = article.image;
//
      //          // Calcular y mostrar el subtotal al cambiar la cantidad
      //          const cantidadInput = document.getElementById("cantidad");
      //          const subtotalSpan = document.getElementById("subtotal");
      //          const monedaSubtotalSpan = document.getElementById("monedaSubtotal");
      //          subtotalSpan.textContent = parseFloat(article.unitCost).toFixed(2);
      //          monedaSubtotalSpan.textContent = article.currency;
//
//
      //          cantidadInput.addEventListener("input", () => {
      //              const cantidad = parseInt(cantidadInput.value);
      //              const costo = parseFloat(article.unitCost);
      //              const subtotal = cantidad * costo;
      //              subtotalSpan.textContent = subtotal.toFixed(2);
      //              monedaSubtotalSpan.textContent = article.currency;
      //          });
      //      })
      //      .catch(error => {
      //          console.error("Error al obtener los datos:", error);
      //      });
            

      const productosCart = document.getElementById("productosCart");
      const totalCartElement = document.getElementById('totalCart');
      
      function renderCart() {
        // Obtén el array almacenado en el localStorage
        const storedInfo = localStorage.getItem('productInfo');
        const containerCart = document.getElementById("containerCart");
        const sinProductosCart = document.getElementById("sinProductosCart");
        if (!storedInfo || !storedInfo.length) { // Verifica si no hay información o si la cadena está vacía
            return;
        }
        if (storedInfo == "[]"){
            console.log('No hay información almacenada en el localStorage del carrito.');
            containerCart.style.display = "none";
            sinProductosCart.style.display = "block";
        }
          
          // Si hay información, convierte la cadena JSON en un array de JavaScript
          const savedInfoArray = JSON.parse(storedInfo);
          let html = ''; // Variable para acumular el HTML

          let total = 0; // Inicializa la variable total
      
          savedInfoArray.forEach((item, index) => {
              const cantidad = 1; // Valor inicial para la cantidad
              const subtotal = item.cost * cantidad; // Calcula el subtotal
              const containerCart = document.getElementById("containerCart");
              containerCart.style.display = "block";
              sinProductosCart.style.display = "none";
      
              html += `
              <tr>
                  <td><img src="${item.images[0]}" style="width: 150px;"></td>
                  <td>${item.name}</td>
                  <td><input type="number" class="cantidad-input" data-index="${index}" style="width: 70px;" value="${cantidad}" min="1" max="10"></td>
                  <td><span class="subtotal">${subtotal} USD</span></td>
                  <td><button class="btn btn-danger eliminar-btn" data-index="${index}">╳</button></td>
              </tr>
              `;
      
              total += subtotal; // Agrega el subtotal al total
          });
      
          // Establece el contenido de productosCart una vez que hayas terminado el bucle
          productosCart.innerHTML = html;
          totalCartElement.textContent = `Subtotal: $${total} USD`; // Actualiza el total en la parte inferior
      
          // Agrega un evento de escucha a los inputs de cantidad
          const cantidadInputs = document.querySelectorAll('.cantidad-input');
          cantidadInputs.forEach(input => {
              input.addEventListener('input', () => {
                  actualizarSubtotal(input, savedInfoArray);
              });
          });
      
          // Agrega un evento de escucha a los botones de eliminar
          const eliminarButtons = document.querySelectorAll('.eliminar-btn');
          eliminarButtons.forEach(button => {
              button.addEventListener('click', (event) => {
                  const index = event.target.getAttribute('data-index');
                  savedInfoArray.splice(index, 1);
                  actualizarLocalStorage(savedInfoArray);
                  renderCart(); // Vuelve a renderizar la lista después de eliminar el objeto
              });
          });
      }
      
      function actualizarSubtotal(input, savedInfoArray) {
          const index = input.getAttribute('data-index');
          const cantidad = parseInt(input.value);
          const item = savedInfoArray[index];
          const subtotal = cantidad * item.cost;
          const subtotalElement = input.parentElement.nextElementSibling.querySelector('.subtotal');
          subtotalElement.textContent = `${subtotal} USD`;
          recalcularTotal(savedInfoArray);
      }
      
      function recalcularTotal(savedInfoArray) {
          let total = 0;
          savedInfoArray.forEach((item, index) => {
              const cantidadInput = document.querySelector(`.cantidad-input[data-index="${index}"]`);
              const cantidad = parseInt(cantidadInput.value);
              total += cantidad * item.cost;
          });
          totalCartElement.textContent = `Subtotal: $${total} USD`;
      }
      
      function actualizarLocalStorage(array) {
          localStorage.setItem('productInfo', JSON.stringify(array));
      }
      
      // Llama a la función para inicializar la lista del carrito
      renderCart();
      
