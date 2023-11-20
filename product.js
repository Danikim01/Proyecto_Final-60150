// product.js (añade un nuevo script para manejar los detalles del producto)

import { agregarAlCarrito} from './script.js'; 


async function filtrarPorCategoria(categoria){
    try{
      const response = await fetch(`https://fakestoreapi.com/products/category/${categoria}`)
      const productos = await response.json()
      const contenedordetalles = document.querySelector('.pro-details')
      contenedordetalles.innerHTML = ""
      const contenedorProductos = document.querySelector('#product-container-sproduct')
      contenedorProductos.innerHTML = ""
      document.getElementById("title-sproduct").innerHTML = categoria.charAt(0).toUpperCase() + categoria.slice(1)
      productos.forEach(producto => {
        const nuevoProducto = document.createElement('div')
        nuevoProducto.classList = "tarjeta-producto"
        nuevoProducto.innerHTML = `
          <img src="${producto.image}" alt="${producto.title}">
          <h3>${producto.title}</h3>
          <p>Precio: $${producto.price}</p>
          <button id="btn-agregar">Agregar al carrito</button>
        `
        contenedorProductos.appendChild(nuevoProducto)
        nuevoProducto.addEventListener('click', () => {
          window.open(`sproduct.html?id=${producto.id}`, '_self');
        });
        nuevoProducto.querySelector('#btn-agregar').addEventListener('click', (event) => {
          event.stopPropagation(); 
          agregarAlCarrito(producto);
          Swal.fire({
            title: "Producto agregado al carrito",
            imageUrl: './imagenes/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.webp',
            imageWidth: 200,
            imageHeight: 100,
            imageAlt: "Custom image",
            icon: "success",
            timer: 1200,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        });
      })
    }catch (error) {
      console.error('Error:', error);
    }
      
  }
  
  async function filtrarPrductosSegunCategoria(){
    try{
      const reponse = await fetch("https://fakestoreapi.com/products/categories")
      const categorias = await reponse.json()
      categorias.forEach(categoria => {
        document.getElementById(categoria).addEventListener("click", () => filtrarPorCategoria(categoria))
      })
    } catch (error){
      console.error('Error:', error);
    }
  }

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
        addToCartBtn.addEventListener('click', () => {
            agregarAlCarrito(product)
            Swal.fire({
                title: "Producto agregado al carrito",
                imageUrl: './imagenes/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.webp',
                imageWidth: 200,
                imageHeight: 100,
                imageAlt: "Custom image",
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
              });
        })
        filtrarPrductosSegunCategoria()
   
        
    })
    .catch(error => console.log(error));
});

