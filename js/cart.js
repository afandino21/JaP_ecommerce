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
                subtotalSpan.textContent = parseFloat(article.unitCost).toFixed(2);
                monedaSubtotalSpan.textContent = article.currency;


                cantidadInput.addEventListener("input", () => {
                    const cantidad = parseInt(cantidadInput.value);
                    const costo = parseFloat(article.unitCost);
                    const subtotal = cantidad * costo;
                    subtotalSpan.textContent = subtotal.toFixed(2);
                    monedaSubtotalSpan.textContent = article.currency;
                });
            })
            .catch(error => {
                console.error("Error al obtener los datos:", error);
            });