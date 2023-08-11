
function loadProducts() {

    const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const products = data.products;


            const productsContainer = document.getElementById('products-container');


            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('card', 'mb-3', 'product-card');


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


                productsContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}


document.addEventListener('DOMContentLoaded', loadProducts);
