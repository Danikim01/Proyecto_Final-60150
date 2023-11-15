const contenedorProductos = document.getElementById('product-container')

const cuenta_carrito = document.getElementById('cuenta-carrito')



/*
* Esta funcion actualiza la cantidad de productos que hay en el carrito
*/ 
function actualizarCuentaCarrito(){
  const memoria = JSON.parse(localStorage.getItem("producto"))
  const cuenta = memoria ? memoria.reduce((acc, producto) => acc + producto.cantidad, 0) : 0
  cuenta_carrito.innerHTML = cuenta
}

/*
* Esta funcion agrega el producto recibido por parametro al carrito, lo almacena en el local storage
*/
function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("producto"))
    if(!memoria){
      const nuevoProducto = producto
      /*add quantity field to the product and set it to 1*/
      nuevoProducto.cantidad = 1
      localStorage.setItem("producto", JSON.stringify([nuevoProducto]))
    }else{
      const indiceProducto = memoria.findIndex(p => p.id === producto.id)
      if(indiceProducto === -1){
        const nuevoProducto = producto
        nuevaMemoria = memoria
        nuevoProducto.cantidad = 1
        nuevaMemoria.push(nuevoProducto)
        localStorage.setItem("producto", JSON.stringify(nuevaMemoria))
      }else{
        const nuevaMemoria = memoria
        const productoEncontrado = nuevaMemoria[indiceProducto]
        productoEncontrado.cantidad += 1
        nuevaMemoria[indiceProducto] = productoEncontrado
        localStorage.setItem("producto", JSON.stringify(nuevaMemoria))
      }
    }
    actualizarCuentaCarrito()
}

async function filtrarPorCategoria(categoria){
  try{
    const response = await fetch(`https://fakestoreapi.com/products/category/${categoria}`)
    const productos = await response.json()
    document.getElementById("title").innerHTML = categoria.charAt(0).toUpperCase() + categoria.slice(1)
    contenedorProductos.innerHTML = ""
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
      nuevoProducto.querySelector('#btn-agregar').addEventListener('click', () => {
        agregarAlCarrito(producto)
      })
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


/*
* Esta funcion itera sobre los productos recibidos, crea un div por cada uno y lo agrega al contenedor de productos
* para luego agregarles la funcionalidad de agregar al carrito. Ademas esta funcion agrega la funcionalidad de filtrar los productos 
* segun su categoria
*/
async function crearProductos() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const productos = await response.json();

    document.getElementById("title").innerHTML = "Nuestra Tienda";

    for (const producto of productos) {

      const nuevoProducto = document.createElement('div');
      nuevoProducto.classList = "tarjeta-producto";
      nuevoProducto.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}">
        <h3>${producto.title}</h3>
        <p>Precio: $${producto.price}</p>
        <button id="btn-agregar">Agregar al carrito</button>
      `;

      contenedorProductos.appendChild(nuevoProducto);

      nuevoProducto.querySelector('#btn-agregar').addEventListener('click', () => {
        agregarAlCarrito(producto);
      });

    }
    filtrarPrductosSegunCategoria()
  } catch (error) {
    console.error('Error:', error);
  }
}


actualizarCuentaCarrito()
crearProductos()
