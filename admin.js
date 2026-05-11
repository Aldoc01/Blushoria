import {
collection,
addDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
db,
auth
}
from "./firebase.js";

const productsCollection =
collection(db,"products");

/* LOGIN */

document.getElementById("loginBtn")
.addEventListener("click", async()=>{

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Login successful");

}catch(error){

alert(error.message);

}

});

/* ADD PRODUCT */

document.getElementById("addBtn")
.addEventListener("click", async()=>{

const name =
document.getElementById("name").value;

const description =
document.getElementById("description").value;

const category =
document.getElementById("category").value;

const price =
Number(
document.getElementById("price").value
);

const stock =
Number(
document.getElementById("stock").value
);

const img =
document.getElementById("img").value;

await addDoc(productsCollection,{

name,
description,
category,
price,
stock,
img

});

alert("Product Added");

});