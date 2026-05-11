let cart = [];
let total = 0;

function addToCart(name, price){

cart.push({name, price});

total += price;

updateCart();

}

function updateCart(){

const cartItems = document.getElementById("cart-items");

cartItems.innerHTML = "";

cart.forEach(item => {

cartItems.innerHTML += `
<div class="cart-item">
${item.name} - ₦${item.price}
</div>
`;

});

document.getElementById("cart-total").innerText = total;

let message = "Hello BLUSHORIA ✨%0A%0AI want to order:%0A";

cart.forEach(item => {

message += `- ${item.name} ₦${item.price}%0A`;

});

message += `%0ATotal: ₦${total}`;

document.getElementById("whatsapp-link").href =
"https://wa.me/2347012620748?text=" + message;

}