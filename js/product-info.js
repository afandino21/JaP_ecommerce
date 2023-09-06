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
        <li class="list-group-item"><img src="${productInfo.images[0]}" alt="Imagen 1" class="illustrive-image"></li>
        <li class="list-group-item"><img src="${productInfo.images[1]}" alt="Imagen 2" class="illustrive-image"></li>
        <li class="list-group-item"><img src="${productInfo.images[2]}" alt="Imagen 3" class="illustrive-image"></li>
        <li class="list-group-item"><img src="${productInfo.images[3]}" alt="Imagen 4" class="illustrive-image"></li>
        </ul>
            `
            infoContainer.appendChild(infoList);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}


function loadComments() {
    let productID = localStorage.getItem('productID');
    const url = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const comments = data;
            const commentContainer = document.getElementById('comment-list');
            const infoList = document.createElement('div');
            infoList.classList.add("list-group");

            infoList.innerHTML = `
                <div id="comment-list">
                </div>
            `;

            const commentList = document.getElementById('comment-list');

            comments.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add("list-group-item");
                commentItem.classList.add("commits");

                let starHTML = '';
                for (let i = 0; i < comment.score; i++) {
                    starHTML += '<span class="fa fa-star checked"></span>';
                }

                commentItem.innerHTML = `
                <p><strong>${comment.user}</strong> - ${comment.dateTime} - ${starHTML}</p>
                    <p>${comment.description}</p>
                `;

                commentList.appendChild(commentItem);
            });

            commentContainer.appendChild(infoList);
        })
        .catch(error => {
            console.error('Error al cargar los comentarios:', error);
        });
}

function addComment(event) {
    event.preventDefault();

    const productID = localStorage.getItem('productID');
    const user = document.getElementById('comment-user').value;
    const score = document.getElementById('comment-rating').value;
    const description = document.getElementById('comment-text').value;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const newComment = {
        product: productID,
        score: parseInt(score),
        description: description,
        user: user,
        dateTime: dateTime
    };

    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.push(newComment);

    localStorage.setItem('comments', JSON.stringify(comments));

    displayComment(newComment);

    document.getElementById('comment-user').value = '';
    document.getElementById('comment-text').value = '';
}
function displayComment(comment) {
    const commentList = document.getElementById('comment-list');
    const commentItem = document.createElement('div');
    commentItem.classList.add("list-group-item");
    commentItem.classList.add("commits");

    let starHTML = '';
    for (let i = 0; i < comment.score; i++) {
        starHTML += '<span class="fa fa-star checked"></span>';
    }

    commentItem.innerHTML = `
        <p><strong>${comment.user}</strong> - ${comment.dateTime} - ${starHTML}</p>
        <p>${comment.description}</p>
    `;

    commentList.appendChild(commentItem);
}

document.addEventListener('DOMContentLoaded', () => {
    loadInfo();
    loadComments();

    const commentForm = document.getElementById('new-comment-form');
    commentForm.addEventListener('submit', addComment);
});