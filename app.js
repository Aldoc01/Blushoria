const products = [

{
name:"Lip Masks",
price:400,
category:"Mask",
description:"Soft pink hydrating lip mask.",
image:"images/IMG-20260509-WA0034.jpg"
},

{
name:"Sadoer Face Mask Sheet",
price:400,
category:"Mask",
description:"Refreshing skincare sheet mask.",
image:"images/IMG-20260509-WA0035.jpg"
},

{
name:"Sadoer Salicylic Face Mask",
price:400,
category:"Mask",
description:"Deep cleansing acne control mask.",
image:"images/IMG-20260509-WA0036.jpg"
},

{
name:"Cute Lip Gloss",
price:1200,
category:"Lip Gloss",
description:"Cute glossy shine lip gloss.",
image:"images/IMG-20260509-WA0041.jpg"
},

{
name:"Clear Lip Gloss With Mirror",
price:1500,
category:"Lip Gloss",
description:"Luxury gloss with mini mirror.",
image:"images/IMG-20260509-WA0044.jpg"
},

{
name:"Coloured Lip Gloss",
price:1500,
category:"Lip Gloss",
description:"Long lasting colourful lip gloss.",
image:"images/IMG-20260510-WA0003.jpg"
},

{
name:"Mini Lip Gloss",
price:1000,
category:"Lip Gloss",
description:"Portable mini beauty gloss.",
image:"images/IMG-20260510-WA0004.jpg"
},

{
name:"Magic Lip Gloss",
price:1200,
category:"Lip Gloss",
description:"Magic colour changing lip gloss.",
image:"images/IMG-20260510-WA0005.jpg"
}

];

let cart = [];

const productsContainer =
document.getElementById("products");

function renderProducts(filteredProducts){

productsContainer.innerHTML = "";

filteredProducts.forEach(product => {

productsContainer.innerHTML += `

<div class="card">

<img src="${product.image}">

<div class="card-content">

<h3>${product.name}</h3>

<p class="desc">
${product.description}
</p>

<p class="price">
₦${product.price.toLocaleString()}
</p>

<button onclick="addToCart(
'${product.name}',
${product.price}
)">
Add To Cart
</button>

</div>

</div>

`;

});

}

renderProducts(products);

function addToCart(name,price){

cart.push({name,price});

updateCart();

}

function removeFromCart(index){

cart.splice(index,1);

updateCart();

}

function updateCart(){

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `

<div class="cart-item">

<span>
${item.name}
</span>

<span>

₦${item.price.toLocaleString()}

<button
class="remove-btn"
onclick="removeFromCart(${index})">

❌

</button>

</span>

</div>

`;

});

cartTotal.innerText =
`Total: ₦${total.toLocaleString()}`;

}

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

let message =
`Hello Blushoria Store,%0A%0A`;

message +=
`Customer: ${name}%0A`;

message +=
`Phone: ${phone}%0A`;

message +=
`Address: ${address}%0A`;

message +=
`Customer Location: ${location}%0A`;

message +=
`Waybill Fee: To Be Discussed%0A%0A`;

message +=
`ORDER:%0A`;

let total = 0;

cart.forEach(item=>{

message +=
`- ${item.name} (₦${item.price})%0A`;

total += item.price;

});

message +=
`%0ATotal Product Cost: ₦${total.toLocaleString()}`;

window.open(
`https://wa.me/2347012620748?text=${message}`,
"_blank"
);

}

function searchProducts(){

const search =
document.getElementById(
"searchInput"
).value.toLowerCase();

const filtered =
products.filter(product =>

product.name.toLowerCase()
.includes(search)

);

renderProducts(filtered);

}

function filterCategory(category){

if(category === "All"){

renderProducts(products);

return;

}

const filtered =
products.filter(product =>

product.category === category

);

renderProducts(filtered);

}