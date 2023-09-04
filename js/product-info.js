function loadInfo() {
    let productID = localStorage.getItem('productID');
    const url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productInfo = data;
            const infoContainer = document.getElementById('info-container');
            const infoList = document.createElement('div');
            infoList.classList.add("list-group")

            infoList.innerHTML = `
        <div>
            <h1> ${productInfo.name} </h1>
        </div>
        
        <ul class="list-group">
            <li class="list-group-item">Precio:${productInfo.cost} ${productInfo.currency}</li>
            <li class="list-group-item">Descripcion:${productInfo.description} </li>
            <li class="list-group-item">Categoria:${productInfo.category} </li>
            <li class="list-group-item">Cantidad de vendidos:${productInfo.soldCount} </li>
        </ul>
        <ul class="list-group list-group-horizontal">
        <li class="list-group-item"><img src="${productInfo.images[0]}" alt="Imagen 1" class="product-image"></li>
        <li class="list-group-item"><img src="${productInfo.images[1]}" alt="Imagen 2" class="product-image"></li>
        <li class="list-group-item"><img src="${productInfo.images[2]}" alt="Imagen 3" class="product-image"></li>
        </ul>
            `
            infoContainer.appendChild(infoList);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}
document.addEventListener('DOMContentLoaded', loadInfo);