let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];

const productsContainer =
document.getElementById("products");

/* LOAD PRODUCTS */

function loadProducts(){

productsContainer.innerHTML = "";

db.collection("products")
.onSnapshot(snapshot=>{

productsContainer.innerHTML = "";

snapshot.forEach(doc=>{

const product = doc.data();

productsContainer.innerHTML += `

<div class="card">

<img
src="${product.image}"
onclick="openImage('${product.image}')">

<div class="card-content">

<div class="badge">
${product.badge}
</div>

<h3>${product.name}</h3>

<p class="desc">
${product.description}
</p>

<p class="price">
₦${product.price.toLocaleString()}
</p>

<p class="stock">
${product.stock}
</p>

<button
class="add-btn"
onclick="addToCart(
'${product.name}',
${product.price}
)">

Add To Cart

</button>

</div>

</div>

`;

});

});

}

loadProducts();

/* CART */

function addToCart(name,price){

cart.push({
name,
price
});

saveCart();
updateCart();

}

function removeFromCart(index){

cart.splice(index,1);

saveCart();
updateCart();

}

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}

function updateCart(){

const cartItems =
document.getElementById(
"cartItems"
);

const subtotal =
document.getElementById(
"cartSubtotal"
);

const total =
document.getElementById(
"cartTotal"
);

cartItems.innerHTML = "";

if(cart.length === 0){

cartItems.innerHTML = `

<p class="empty-cart">

Your cart is empty 🛒

</p>

`;

}

let grandTotal = 0;

cart.forEach((item,index)=>{

grandTotal += item.price;

cartItems.innerHTML += `

<div class="cart-item">

<div>

${item.name}

</div>

<div>

₦${item.price}

<button
class="remove-btn"
onclick="removeFromCart(${index})">

❌

</button>

</div>

</div>

`;

});

subtotal.innerText =
`Subtotal: ₦${grandTotal}`;

total.innerText =
`Grand Total: ₦${grandTotal}`;

}

updateCart();

/* CHECKOUT */

function checkoutWhatsApp(){

const name =
document.getElementById(
"customerName"
).value;

const phone =
document.getElementById(
"customerPhone"
).value;

const address =
document.getElementById(
"customerAddress"
).value;

const location =
document.getElementById(
"deliveryLocation"
).value;

if(cart.length === 0){

alert("Cart is empty");

return;

}

let total = 0;

db.collection("orders")
.add({

customer:name,
phone:phone,
address:address,
location:location,
items:cart,
createdAt:new Date()

});

let message =
`Hello Blushoria Store,%0A%0A`;

message +=
`Customer: ${name}%0A`;

message +=
`Phone: ${phone}%0A`;

message +=
`Address: ${address}%0A`;

message +=
`Location: ${location}%0A`;

message +=
`Waybill Fee: To Be Discussed%0A%0A`;

message +=
`ORDER:%0A`;

cart.forEach(item=>{

message +=
`- ${item.name}
(₦${item.price})%0A`;

total += item.price;

});

message +=
`%0ATotal:
₦${total}`;

window.open(
`https://wa.me/2347012620748?text=${message}`,
"_blank"
);

}

/* SEARCH */

function searchProducts(){

const search =
document.getElementById(
"searchInput"
).value.toLowerCase();

db.collection("products")
.get()
.then(snapshot=>{

productsContainer.innerHTML = "";

snapshot.forEach(doc=>{

const product = doc.data();

if(
product.name.toLowerCase()
.includes(search)
){

displayProduct(product);

}

});

});

}

/* CATEGORY */

function filterCategory(category){

db.collection("products")
.get()
.then(snapshot=>{

productsContainer.innerHTML = "";

snapshot.forEach(doc=>{

const product = doc.data();

if(
category === "All" ||
product.category === category
){

displayProduct(product);

}

});

});

}

/* DISPLAY PRODUCT */

function displayProduct(product){

productsContainer.innerHTML += `

<div class="card">

<img
src="${product.image}"
onclick="openImage('${product.image}')">

<div class="card-content">

<div class="badge">
${product.badge}
</div>

<h3>${product.name}</h3>

<p class="desc">
${product.description}
</p>

<p class="price">
₦${product.price}
</p>

<p class="stock">
${product.stock}
</p>

<button
class="add-btn"
onclick="addToCart(
'${product.name}',
${product.price}
)">

Add To Cart

</button>

</div>

</div>

`;

}

/* REVIEWS */

function addReview(){

const review =
document.getElementById(
"reviewInput"
).value;

if(review === "") return;

document.getElementById(
"reviewsContainer"
).innerHTML += `

<div class="review-card">

★★★★★ ${review}

</div>

`;

document.getElementById(
"reviewInput"
).value = "";

}

/* OPEN IMAGE */

function openImage(image){

window.open(image,"_blank");

}