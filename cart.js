const contenedorProductos = document.getElementById('carrito-container')

/*Esta funcion actualiza la cantidad de unidades que hay en el carrito*/
function actualizarUnidadesCarrito(){
    const productos = JSON.parse(localStorage.getItem("producto"))
    const cantidad_total = productos.reduce((acc, producto) => acc + producto.cantidad, 0)
    document.querySelector("#unidades").innerHTML = cantidad_total
}

/**
 * Esta funcion actualiza el precio total de los productos que hay en el carrito
 */
function actualizarPrecioTotal(){
    const productos = JSON.parse(localStorage.getItem("producto"))
    const precio_total = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
    document.querySelector("#precio").innerHTML = precio_total
}

/**
 * 
 * Esta funcion hace que si el producto ya esta en el carrito, aumenta la cantidad
 */
function actualizarCantidad(operacion,producto){
    const nuevaMemoria = JSON.parse(localStorage.getItem("producto"))
    const indiceProducto = nuevaMemoria.findIndex(p => p.id === producto.id)
    const productoEncontrado = nuevaMemoria[indiceProducto]
    operacion === 'sumar' ? productoEncontrado.cantidad += 1 : productoEncontrado.cantidad -= 1
    nuevaMemoria[indiceProducto] = productoEncontrado
    localStorage.setItem("producto", JSON.stringify(nuevaMemoria))
}

/*
* Esta funcion setea la funcionalidad del boton sumar en el carrito, lo cual aumenta la cantidad de prendas a comprar
*/
function botonSumar(nuevoProducto,producto){
    nuevoProducto.querySelector('#btn-sumar').addEventListener('click', () => {
        nuevoProducto.querySelector('#cantidad').innerHTML = parseInt(nuevoProducto.querySelector('#cantidad').innerHTML) + 1
        document.getElementById('cuenta-carrito').innerHTML = parseInt(document.getElementById('cuenta-carrito').innerHTML) + 1
        actualizarCantidad('sumar',producto)
        actualizarUnidadesCarrito()
        actualizarPrecioTotal()
    })
}

/*
* Esta funcion setea la funcionalidad del boton restar en el carrito, lo cual resta la cantidad de prendas a comprar
*/
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

/*Esta funcion elimina el elemento almacenado en el carrito, elimina el producto del local storage*/ 
function botonEliminarElemento(nuevoProducto,producto){
    nuevoProducto.querySelector('#btn-eliminar').addEventListener('click', () => {
        nuevoProducto.innerHTML = ""
        const nuevaMemoria = JSON.parse(localStorage.getItem("producto"))
        if (nuevaMemoria.length === 1){
            localStorage.removeItem("producto")
            actualizarCuentaCarrito()
            actualizarCuentaCarrito()
            mostrarCarrito()
        }else{
            const indiceProducto = nuevaMemoria.findIndex(p => p.id === producto.id)
            nuevaMemoria.splice(indiceProducto,1)
            localStorage.setItem("producto", JSON.stringify(nuevaMemoria))
            actualizarUnidadesCarrito()
            actualizarCuentaCarrito()
            actualizarPrecioTotal()
        }
    })
}

/*
* Esta funcion muestra los productos almacenados en el local storage en el carrito de compras, muestra la cantidad de unidades a comprar, el precio
* y setea los botones corresopndientes 
* Si no hay productos en el carrito muestra un mensaje.
*/ 
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
            <button id="btn-eliminar">X</button>
            `
            botonSumar(nuevoProducto,producto)
            botonRestar(nuevoProducto,producto)
            botonEliminarElemento(nuevoProducto,producto)
            actualizarUnidadesCarrito()
            actualizarPrecioTotal()
            contenedorProductos.appendChild(nuevoProducto)
        })
    }else{
        contenedorProductos.innerHTML = ""
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

/*
 * Esta funcion setea la funcionalidad del boton reiniciar carrito, lo cual elimina todos los productos del carrito y del local storage 
 */
function setearReiniciarCarrito(){
    const reiniciar_carrito = document.getElementById('boton-reiniciar')
    reiniciar_carrito.addEventListener('click', () => {
        localStorage.removeItem("producto")
        actualizarCuentaCarrito()
        mostrarCarrito()
    })
}


const cuenta_carrito = document.getElementById('cuenta-carrito')

/*
* Esta funcion actualiza la cantidad de productos que hay en el carrito
*/
function actualizarCuentaCarrito(){
  const memoria = JSON.parse(localStorage.getItem("producto"))
  const cuenta = memoria ? memoria.reduce((acc, producto) => acc + producto.cantidad, 0) : 0
  cuenta_carrito.innerHTML = cuenta
}


actualizarCuentaCarrito()
mostrarCarrito()
setearReiniciarCarrito()
