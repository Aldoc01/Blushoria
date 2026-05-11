const products = [

{
name:"Luxury Lip Gloss",
price:1500,
category:"Lip Gloss",
image:"images/IMG-20260509-WA0044.jpg"
},

{
name:"Face Mask",
price:400,
category:"Mask",
image:"images/IMG-20260509-WA0035.jpg"
},

{
name:"Beauty Powder",
price:2500,
category:"Beauty",
image:"images/IMG-20260510-WA0005.jpg"
},

{
name:"Matte Foundation",
price:5000,
category:"Beauty",
image:"images/IMG-20260509-WA0021.jpg"
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

<button onclick="removeFromCart(${index})">

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

if(cart.length === 0){

alert("Cart is empty");

return;

}

let message =
`Hello Blushoria Store,%0A%0A`;

message +=
`Customer: ${name}%0A`;

message +=
`Phone: ${phone}%0A%0A`;

message +=
`ORDER:%0A`;

let total = 0;

cart.forEach(item=>{

message +=
`- ${item.name} (₦${item.price})%0A`;

total += item.price;

});

message +=
`%0ATotal: ₦${total}`;

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