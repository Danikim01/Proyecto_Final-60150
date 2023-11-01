let carrito_hashmap = {}

let buttons = document.querySelectorAll("button.add_product_btn")

buttons.forEach(button => {
    const name = button.getAttribute('data-product')
    carrito_hashmap[name] = 0
})


function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    for (const productName in carrito_hashmap) {
      const listItem = document.createElement('li');
      listItem.textContent = `${productName}: ${carrito_hashmap[productName]}`;
      if (carrito_hashmap[productName] != 0){
        cartList.appendChild(listItem);
      }
    }
  }

function showCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = 'block';
}

function closeCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = 'none';
}

// let display = document.querySelector("#display_products")
// /*display elements as ul li*/
// let unordered_list = document.createElement("ul")
// display.appendChild(unordered_list) 


buttons.forEach(button => {
    button.addEventListener("click", ()=>{
        const productName = button.getAttribute('data-product')
        /*set key:value where key is the product name and value is the amount of clicks*/
        carrito_hashmap[productName] += 1 
        updateCartDisplay() 
        /*display the product and its amount in carrito.html*/
        // let list_item = document.createElement("li")
        // list_item.innerHTML = productName + ": " + carrito_hashmap[productName]
        // unordered_list.appendChild(list_item)

    })
})


document.getElementById("carrito_icon").addEventListener("click",showCartPopup)
document.getElementById("close-cart-popup").addEventListener("click",closeCartPopup)




