const ADMIN_PASSWORD = "blushoriaadmin";

function loginAdmin(){

const password =
document.getElementById(
"adminPassword"
).value;

if(password === ADMIN_PASSWORD){

document.getElementById(
"adminPanel"
).style.display = "block";

loadProducts();

}else{

alert("Wrong Password");

}

}

function addProduct(){

const product = {

name:
document.getElementById(
"productName"
).value,

price:Number(
document.getElementById(
"productPrice"
).value
),

category:
document.getElementById(
"productCategory"
).value,

description:
document.getElementById(
"productDescription"
).value,

badge:
document.getElementById(
"productBadge"
).value,

stock:
document.getElementById(
"productStock"
).value,

image:
document.getElementById(
"productImage"
).value

};

db.collection("products")
.add(product)

.then(()=>{

alert("Product Added");

loadProducts();

});

}

function loadProducts(){

const container =
document.getElementById(
"adminProducts"
);

container.innerHTML = "";

db.collection("products")
.get()

.then(snapshot=>{

snapshot.forEach(doc=>{

const product = doc.data();

container.innerHTML += `

<div class="review-card">

<h3>${product.name}</h3>

<p>₦${product.price}</p>

<p>${product.category}</p>

<button onclick="deleteProduct('${doc.id}')">

Delete

</button>

</div>

`;

});

});

}

function deleteProduct(id){

db.collection("products")
.doc(id)
.delete()

.then(()=>{

loadProducts();

});

}