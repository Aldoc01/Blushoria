const products = [

{
name:"Lip Masks",
price:400,
category:"Mask",
description:"Soft pink hydrating lip mask.",
badge:"HOT 🔥",
stock:"In Stock",
image:"images/IMG-20260509-WA0034.jpg"
},

{
name:"Sadoer Face Mask Sheet",
price:400,
category:"Mask",
description:"Refreshing skincare sheet mask.",
badge:"NEW",
stock:"Only 3 Left",
image:"images/IMG-20260509-WA0035.jpg"
},

{
name:"Cute Lip Gloss",
price:1200,
category:"Lip Gloss",
description:"Cute glossy shine lip gloss.",
badge:"BEST SELLER",
stock:"In Stock",
image:"images/IMG-20260509-WA0041.jpg"
},

{
name:"Magic Lip Gloss",
price:1200,
category:"Lip Gloss",
description:"Magic colour changing lip gloss.",
badge:"LIMITED",
stock:"Only 2 Left",
image:"images/IMG-20260510-WA0005.jpg"
}

];

let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];

const productsContainer =
document.getElementById("products");

function renderProducts(filteredProducts){

productsContainer.innerHTML = "";

filteredProducts.forEach((product,index)=>{

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

<div class="quantity-controls">

<button onclick="changeQty(${index},-1)">
-
</button>

<span id="qty-${index}">
1
</span>

<button onclick="changeQty(${index},1)">
+
</button>

</div>

<button
class="add-btn"
onclick="addToCart(
'${product.name}',
${product.price},
${index}
)">

Add To Cart

</button>

</div>

</div>

`;

});

}

renderProducts(products);

let quantities = {};

function changeQty(index,change){

if(!quantities[index]){
quantities[index] = 1;
}

quantities[index] += change;

if(quantities[index] < 1){
quantities[index] = 1;
}

document.getElementById(
`qty-${index}`
).innerText = quantities[index];

}

function addToCart(name,price,index){

const qty = quantities[index] || 1;

cart.push({
name,
price,
qty
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
document.getElementById("cartItems");

const subtotal =
document.getElementById(
"cartSubtotal"
);

const total =
document.getElementById(
"cartTotal"
);

cartItems.innerHTML = "";

let grandTotal = 0;

cart.forEach((item,index)=>{

const itemTotal =
item.price * item.qty;

grandTotal += itemTotal;

cartItems.innerHTML += `

<div class="cart-item">

<div>

${item.name}

x${item.qty}

</div>

<div>

₦${itemTotal.toLocaleString()}

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
`Subtotal: ₦${grandTotal.toLocaleString()}`;

total.innerText =
`Grand Total: ₦${grandTotal.toLocaleString()}`;

}

updateCart();

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

alert(
"Thank you for shopping with Blushoria ✨"
);

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

const itemTotal =
item.price * item.qty;

message +=
`- ${item.name}
x${item.qty}
(₦${itemTotal})%0A`;

total += itemTotal;

});

message +=
`%0ATotal Product Cost:
₦${total.toLocaleString()}`;

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

function openImage(image){

window.open(image,"_blank");

}