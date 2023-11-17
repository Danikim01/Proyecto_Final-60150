// product.js (añade un nuevo script para manejar los detalles del producto)

import { agregarAlCarrito, actualizarCuentaCarrito } from './script.js'; 


document.addEventListener("DOMContentLoaded", function () {
    // Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    fetch('https://fakestoreapi.com/products/' + productId)
    .then(response => response.json())
    .then(product => {
        const productTitleElement = document.getElementById('product-title');
        const productImageElement = document.getElementById('product-image');
        const productPriceElement = document.getElementById('product-price');
        const productDescriptionElement = document.getElementById('product-description');
        
        productImageElement.src = product.image;
        productTitleElement.innerHTML = product.title;
        productPriceElement.innerHTML = 'Price: '+'$'+product.price;
        productDescriptionElement.innerHTML = product.description.charAt(0).toUpperCase() + product.description.slice(1);

        const singleProDetails = document.querySelector(".single-pro-details")
        const addToCartBtn = document.createElement("button")
        addToCartBtn.id = "btn-agregar"
        addToCartBtn.innerHTML = "Agregar al carrito"
        singleProDetails.appendChild(addToCartBtn) 
    })
    .catch(error => console.log(error));



});