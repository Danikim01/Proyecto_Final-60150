const contenedorProductos = document.getElementById('product-container')

const cuenta_carrito = document.getElementById('cuenta-carrito')

function actualizarCuentaCarrito(){
  const memoria = JSON.parse(localStorage.getItem("producto"))
  const cuenta = memoria ? memoria.reduce((acc, producto) => acc + producto.cantidad, 0) : 0
  cuenta_carrito.innerHTML = cuenta
}


function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("producto"))
    console.log(memoria)
    if(!memoria){
      const nuevoProducto = producto
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

function crearProductos(productos){
  productos.forEach(producto => {
    const nuevoProducto = document.createElement('div')
    nuevoProducto.classList = "tarjeta-producto"
    nuevoProducto.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button id="btn-agregar">Agregar al carrito</button>
    `
    contenedorProductos.appendChild(nuevoProducto)
    nuevoProducto.querySelector('#btn-agregar').addEventListener('click', () => {
      agregarAlCarrito(producto)
    })

  })
}

crearProductos(productos)