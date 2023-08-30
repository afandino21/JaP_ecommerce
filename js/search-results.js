// Resultados tomados del localStorage
const matchingProducts = JSON.parse(localStorage.getItem("matchingProducts"));

// Llamado al contenedor donde poner los resultados
const resultsContainer = document.getElementById("resultsList");

// Agarrar los resultados y mostrarlos
matchingProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "card mb-3";

    productCard.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${product.image}" alt="${product.name}" class="img-fluid product-image">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">${product.cost} ${product.currency}</p>
            <p class="card-text">${product.soldCount} vendidos</p>
          </div>
        </div>
      </div>
    `;

    resultsContainer.appendChild(productCard);
});
