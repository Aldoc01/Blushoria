let cart = [];
let total = 0;

function addToCart(productName, price){

cart.push({
name: productName,
price: price
});

total += price;

updateCart();

}

function updateCart(){

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

cartItems.innerHTML = "";

cart.forEach((item)=>{

cartItems.innerHTML += `
<div class="cart-item">
${item.name} - ₦${item.price}
</div>
`;

});

cartTotal.innerText = total;

}

function checkoutWhatsApp(){

const customerName = document.getElementById("customer-name").value;

const customerPhone = document.getElementById("customer-phone").value;

if(cart.length === 0){

alert("Your cart is empty.");

return;

}

if(customerName === "" || customerPhone === ""){

alert("Please enter your name and phone number.");

return;

}

let message = "✨ *NEW BLUSHORIA ORDER* ✨%0A%0A";

message += "👩 Customer Name: " + customerName + "%0A";

message += "📞 Customer Phone: " + customerPhone + "%0A%0A";

message += "🛍 PRODUCTS:%0A";

cart.forEach((item)=>{

message += "• " + item.name + " - ₦" + item.price + "%0A";

});

message += "%0A💰 TOTAL: ₦" + total;

message += "%0A%0A🚚 Waybill delivery fee will be discussed based on customer location in Nigeria.";

const whatsappNumber = "2347012620748";

const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

window.open(whatsappURL,"_blank");

cart = [];

total = 0;

updateCart();

document.getElementById("customer-name").value = "";

document.getElementById("customer-phone").value = "";

}