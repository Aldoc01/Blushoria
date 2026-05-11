let cart = [];
let total = 0;

function addToCart(product, price){

cart.push({product, price});

total += price;

updateCart();

}

function updateCart(){

const cartItems =
document.getElementById("cart-items");

cartItems.innerHTML = "";

cart.forEach(item => {

cartItems.innerHTML += `
<div class="cart-item">
${item.product} - ₦${item.price}
</div>
`;

});

document.getElementById("cart-total")
.innerText = total;

let message = "Hello BLUSHORIA ✨%0A%0AI want to order:%0A";

cart.forEach(item => {
message += `- ${item.product} (₦${item.price})%0A`;
});

message += `%0ATotal: ₦${total}`;

document.getElementById("whatsapp-order")
.href =
"https://wa.me/234XXXXXXXXXX?text=" + message;

}