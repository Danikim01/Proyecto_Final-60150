const contenedorProductos = document.getElementById('carrito-container')

function botonSumar(nuevoProducto,producto){
    nuevoProducto.querySelector('#btn-sumar').addEventListener('click', () => {
        nuevoProducto.querySelector('#cantidad').innerHTML = parseInt(nuevoProducto.querySelector('#cantidad').innerHTML) + 1
        document.getElementById('cuenta-carrito').innerHTML = parseInt(document.getElementById('cuenta-carrito').innerHTML) + 1
        const nuevaMemoria = JSON.parse(localStorage.getItem("producto"))
        const indiceProducto = nuevaMemoria.findIndex(p => p.id === producto.id)
        const productoEncontrado = nuevaMemoria[indiceProducto]
        productoEncontrado.cantidad += 1
        nuevaMemoria[indiceProducto] = productoEncontrado
        localStorage.setItem("producto", JSON.stringify(nuevaMemoria))
    })
}

function botonRestar(nuevoProducto,producto){
    nuevoProducto.querySelector('#btn-restar').addEventListener('click', () => {
        if (parseInt(nuevoProducto.querySelector('#cantidad').innerHTML) > 0 && parseInt(document.getElementById('cuenta-carrito').innerHTML) > 0){
            nuevoProducto.querySelector('#cantidad').innerHTML = parseInt(nuevoProducto.querySelector('#cantidad').innerHTML) - 1
            document.getElementById('cuenta-carrito').innerHTML = parseInt(document.getElementById('cuenta-carrito').innerHTML) - 1
            const nuevaMemoria = JSON.parse(localStorage.getItem("producto"))
            const indiceProducto = nuevaMemoria.findIndex(p => p.id === producto.id)
            const productoEncontrado = nuevaMemoria[indiceProducto]
            productoEncontrado.cantidad -= 1
            nuevaMemoria[indiceProducto] = productoEncontrado
            localStorage.setItem("producto", JSON.stringify(nuevaMemoria))
        }
    })
}

function mostrarCarrito(){
    const productos = JSON.parse(localStorage.getItem("producto"))
    if (productos && productos.length  > 0){
        productos.forEach(producto => {
            const nuevoProducto = document.createElement('div')
            nuevoProducto.classList = "carrito-producto"
            nuevoProducto.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <strong>${producto.nombre}</strong>
            <p>$${producto.precio}</p>
            <div>
                <button id="btn-restar">-</button>
                <span id=cantidad>${producto.cantidad}</span>
                <button id="btn-sumar">+</button>
            </div>
            `
            botonSumar(nuevoProducto,producto)
            botonRestar(nuevoProducto,producto)
            contenedorProductos.appendChild(nuevoProducto)
        })
    }
}

const cuenta_carrito = document.getElementById('cuenta-carrito')

function actualizarCuentaCarrito(){
  const memoria = JSON.parse(localStorage.getItem("producto"))
  const cuenta = memoria ? memoria.reduce((acc, producto) => acc + producto.cantidad, 0) : 0
  cuenta_carrito.innerHTML = cuenta
}



actualizarCuentaCarrito()
mostrarCarrito()
