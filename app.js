let cart = [];
let total = 0;

function addToCart(name, price){

cart.push({
name,
price
});

total += price;

updateCart();

}

function updateCart(){

const cartItems = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

cartItems.innerHTML = "";

cart.forEach(item => {

cartItems.innerHTML += `
<div class="cart-item">
${item.name} - ₦${item.price}
</div>
`;

});

cartTotal.innerText = total;

const customerName =
document.getElementById("customer-name").value;

const customerPhone =
document.getElementById("customer-phone").value;

let message =
"Hello Blushoria ✨%0A%0A";

message += "Customer Name: " + customerName + "%0A";

message += "Phone Number: " + customerPhone + "%0A%0A";

message += "I want to order:%0A";

cart.forEach(item => {

message += `- ${item.name} (₦${item.price})%0A`;

});

message += `%0ATotal: ₦${total}%0A%0A`;

message += "Waybill delivery fee will be discussed.";

document.getElementById(
"whatsapp-order"
).href =
"https://wa.me/2347012620748?text=" + message;

}

document.getElementById("customer-name")
.addEventListener("input", updateCart);

document.getElementById("customer-phone")
.addEventListener("input", updateCart);