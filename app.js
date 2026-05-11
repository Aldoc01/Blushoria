let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];

const productsContainer =
document.getElementById("products");

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

function addToCart(name,price){

cart.push({
name,
price,
qty:1
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

let total = 0;

let orderItems = "";

cart.forEach(item=>{

orderItems +=
`${item.name} - ₦${item.price}\n`;

total += item.price;

});

db.collection("orders")
.add({

customer:name,
phone:phone,
address:address,
location:location,
items:cart,
total:total,
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
`- ${item.name} (₦${item.price})%0A`;

});

message +=
`%0ATotal:
₦${total}`;

window.open(
`https://wa.me/2347012620748?text=${message}`,
"_blank"
);

}

function openImage(image){

window.open(image,"_blank");

}