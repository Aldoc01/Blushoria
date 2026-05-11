import { db, storage }
from "./firebase.js";

import {
collection,
addDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const uploadBtn =
document.getElementById("uploadBtn");

uploadBtn.addEventListener(
"click",
async ()=>{

const name =
document.getElementById("name").value;

const description =
document.getElementById("description").value;

const price =
document.getElementById("price").value;

const file =
document.getElementById("imageFile").files[0];

if(!file){
alert("Select image");
return;
}

document.getElementById("status")
.innerHTML = "Uploading...";

try{

const storageRef =
ref(storage,
"products/" + Date.now());

await uploadBytes(
storageRef,
file
);

const imageURL =
await getDownloadURL(storageRef);

await addDoc(
collection(db,"products"),
{
name,
description,
price,
image:imageURL
}
);

document.getElementById("status")
.innerHTML =
"✅ Product uploaded successfully";

}
catch(error){

document.getElementById("status")
.innerHTML =
error.message;

}

});