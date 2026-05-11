let cart = [];
let total = 0;

function addToCart(name, price){

cart.push({
name,
price
});

total += price;

document.getElementById("total").innerText =
`₦${total.toLocaleString()}`;

}

function orderWhatsApp(){

const customerName =
document.getElementById("name").value;

const address =
document.getElementById("address").value;

if(cart.length === 0){
alert("Your cart is empty");
return;
}

let message =
`✨ BLUSHORIA ORDER ✨%0A%0A`;

message +=
`👩 Name: ${customerName}%0A`;

message +=
`📍 Address: ${address}%0A%0A`;

message +=
`🛍️ ITEMS:%0A`;

cart.forEach(item => {

message +=
`• ${item.name} - ₦${item.price}%0A`;

});

message +=
`%0A💰 TOTAL: ₦${total.toLocaleString()}`;

const phone = "2347012620748";

window.open(
`https://wa.me/${phone}?text=${message}`
);

}