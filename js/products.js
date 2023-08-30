let currentSort = 'count';
let priceRangeMin = null;
let priceRangeMax = null;

function loadProducts() {
  let catID = localStorage.getItem('catID');
  const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const products = data.products;
      const productsContainer = document.getElementById('products-container');
      const sortAscButton = document.getElementById('sortAsc');
      const sortDescButton = document.getElementById('sortDesc');
      const sortByCountButton = document.getElementById('sortByCount');
      const rangeFilterCountButton = document.getElementById('rangeFilterCount');
      const clearRangeFilterButton = document.getElementById('clearRangeFilter');

      sortAscButton.addEventListener('click', () => {
        currentSort = 'asc';
        applyFiltersAndSort(products);
      });

      sortDescButton.addEventListener('click', () => {
        currentSort = 'desc';
        applyFiltersAndSort(products);
      });

      sortByCountButton.addEventListener('click', () => {
        currentSort = 'count';
        applyFiltersAndSort(products);
      });

      rangeFilterCountButton.addEventListener('click', () => {
        priceRangeMin = parseFloat(document.getElementById('rangeFilterCountMin').value);
        priceRangeMax = parseFloat(document.getElementById('rangeFilterCountMax').value);
        applyFiltersAndSort(products);
      });

      clearRangeFilterButton.addEventListener('click', () => {
        priceRangeMin = null;
        priceRangeMax = null;
        applyFiltersAndSort(products);
      });

      applyFiltersAndSort(products);
    })
    .catch(error => {
      console.error('Error al cargar los productos:', error);
    });
}

function applyFiltersAndSort(products) {
  let filteredProducts = products.slice();

  if (priceRangeMin !== null && priceRangeMax !== null) {
    filteredProducts = filteredProducts.filter(product => {
      return product.cost >= priceRangeMin && product.cost <= priceRangeMax;
    });
  }

  switch (currentSort) {
    case 'asc':
      filteredProducts.sort((a, b) => a.cost - b.cost);
      break;
    case 'desc':
      filteredProducts.sort((a, b) => b.cost - a.cost);
      break;
    case 'count':
      filteredProducts.sort((a, b) => b.soldCount - a.soldCount);
      break;
  }

  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = '';

  filteredProducts.forEach(product => {
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
}

document.addEventListener('DOMContentLoaded', loadProducts);
