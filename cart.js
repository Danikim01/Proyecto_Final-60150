const contenedorProductos = document.getElementById('carrito-container')

function actualizarUnidadesCarrito(){
    const productos = JSON.parse(localStorage.getItem("producto"))
    const cantidad_total = productos.reduce((acc, producto) => acc + producto.cantidad, 0)
    document.querySelector("#unidades").innerHTML = cantidad_total
}

function actualizarPrecioTotal(){
    const productos = JSON.parse(localStorage.getItem("producto"))
    const precio_total = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
    document.querySelector("#precio").innerHTML = precio_total
}


function actualizarCantidad(operacion,producto){
    const nuevaMemoria = JSON.parse(localStorage.getItem("producto"))
    const indiceProducto = nuevaMemoria.findIndex(p => p.id === producto.id)
    const productoEncontrado = nuevaMemoria[indiceProducto]
    operacion === 'sumar' ? productoEncontrado.cantidad += 1 : productoEncontrado.cantidad -= 1
    nuevaMemoria[indiceProducto] = productoEncontrado
    localStorage.setItem("producto", JSON.stringify(nuevaMemoria))
}


function botonSumar(nuevoProducto,producto){
    nuevoProducto.querySelector('#btn-sumar').addEventListener('click', () => {
        nuevoProducto.querySelector('#cantidad').innerHTML = parseInt(nuevoProducto.querySelector('#cantidad').innerHTML) + 1
        document.getElementById('cuenta-carrito').innerHTML = parseInt(document.getElementById('cuenta-carrito').innerHTML) + 1
        actualizarCantidad('sumar',producto)
        actualizarUnidadesCarrito()
        actualizarPrecioTotal()
    })
}

function botonRestar(nuevoProducto,producto){
    nuevoProducto.querySelector('#btn-restar').addEventListener('click', () => {
        if (parseInt(nuevoProducto.querySelector('#cantidad').innerHTML) > 0 && parseInt(document.getElementById('cuenta-carrito').innerHTML) > 0){
            nuevoProducto.querySelector('#cantidad').innerHTML = parseInt(nuevoProducto.querySelector('#cantidad').innerHTML) - 1
            document.getElementById('cuenta-carrito').innerHTML = parseInt(document.getElementById('cuenta-carrito').innerHTML) - 1
            actualizarCantidad('restar',producto)
            actualizarUnidadesCarrito()
            actualizarPrecioTotal()
        }
    })
}

function mostrarCarrito(){
    const productos = JSON.parse(localStorage.getItem("producto"))
    if (productos && productos.length  > 0){
        contenedorProductos.innerHTML = ""
        document.getElementById("totales").style.display = "flex"
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
            actualizarUnidadesCarrito()
            actualizarPrecioTotal()
            contenedorProductos.appendChild(nuevoProducto)
        })
    }else{
        const nuevoProducto = document.createElement('div')
        nuevoProducto.classList = "carrito-producto"
        nuevoProducto.innerHTML = `
        <strong>No hay productos en el carrito</strong>
        <p>Agregue algun producto al carrito porfavor</p>
        `
        nuevoProducto.style.display = "flex"
        nuevoProducto.style.flexDirection = "column"
        nuevoProducto.style.height = "70vh" 
        document.getElementById("totales").style.display = "none"
        contenedorProductos.appendChild(nuevoProducto)
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
