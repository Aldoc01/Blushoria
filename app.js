import {
collection,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db }
from "./firebase.js";

const productGrid =
document.getElementById("productGrid");

const cartItems =
document.getElementById("cartItems");

const totalText =
document.getElementById("totalText");

let products = [];

let cart =
JSON.parse(localStorage.getItem("blushoria_cart")) || [];

const productsCollection =
collection(db,"products");

/* REALTIME PRODUCTS */

onSnapshot(productsCollection,(snapshot)=>{

products =
snapshot.docs.map(doc => ({
id: doc.id,
...doc.data()
}));

renderProducts();

});

/* RENDER PRODUCTS */

function renderProducts(){

productGrid.innerHTML =
products.map(product => `

<div class="card">

<img src="${product.img}">

<div class="card-content">

<div class="category-tag">
${product.category}
</div>

<h3>${product.name}</h3>

<p>${product.description}</p>

<br>

<span class="price">
₦${Number(product.price).toLocaleString()}
</span>

<button
class="btn-primary"
onclick="addToCart('${product.id}')">

Add To Bag

</button>

</div>

</div>

`).join("");

}

/* CART */

window.addToCart = function(id){

const product =
products.find(p => p.id === id);

const existing =
cart.find(item => item.id === id);

if(existing){

existing.quantity += 1;

}else{

cart.push({
...product,
quantity:1
});

}

localStorage.setItem(
"blushoria_cart",
JSON.stringify(cart)
);

renderCart();

};

window.removeFromCart = function(id){

cart =
cart.filter(item => item.id !== id);

localStorage.setItem(
"blushoria_cart",
JSON.stringify(cart)
);

renderCart();

};

function renderCart(){

if(cart.length === 0){

cartItems.innerHTML =
"<p>Cart is empty.</p>";

updateTotal();

return;

}

cartItems.innerHTML =
cart.map(item => `

<div class="cart-item">

<p>
${item.name} x${item.quantity}
</p>

<p>
₦${(
item.price *
item.quantity
).toLocaleString()}
</p>

<button
onclick="removeFromCart('${item.id}')">

Remove

</button>

</div>

`).join("");

updateTotal();

}

window.toggleCart = function(){

const cartDrawer =
document.getElementById("cartDrawer");

if(cartDrawer.style.right === "0px"){

cartDrawer.style.right = "-100%";

}else{

cartDrawer.style.right = "0";

}

};

window.updateTotal = function(){

const subtotal =
cart.reduce((sum,item)=>{

return sum + (
item.price *
item.quantity
);

},0);

let shipping = 0;

const shippingValue =
document.getElementById(
"shippingLocation"
).value;

if(shippingValue === "lagos"){

shipping = 5000;

}else if(shippingValue === "other"){

shipping = 10000;

}

const total =
subtotal + shipping;

totalText.innerText =
`Total: ₦${total.toLocaleString()}`;

};

window.checkout = function(){

const name =
document.getElementById("custName").value;

const phone =
document.getElementById("custPhone").value;

if(!name || !phone){

alert("Fill all fields");

return;

}

let message =
`*BLUSHORIA ORDER*%0A%0A`;

cart.forEach(item => {

message +=
`${item.name} x${item.quantity}%0A`;

});

message +=
`%0A${totalText.innerText}`;

window.open(
`https://wa.me/2347012620748?text=${message}`,
"_blank"
);

};

renderCart();