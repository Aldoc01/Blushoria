import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import { db, storage } from "./firebase-config.js";

const addBtn = document.getElementById("add-product-btn");

const adminProducts = document.getElementById("admin-products");

let editingId = null;

addBtn.addEventListener("click", async ()=>{

  const name = document.getElementById("product-name").value;

  const description = document.getElementById("product-description").value;

  const price = document.getElementById("product-price").value;

  const file = document.getElementById("product-image").files[0];

  if(!name || !price || !file){
    alert("Fill all fields");
    return;
  }

  const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);

  await uploadBytes(storageRef,file);

  const imageUrl = await getDownloadURL(storageRef);

  if(editingId){

    await updateDoc(doc(db,"products",editingId),{

      name,
      description,
      price,
      image:imageUrl
    });

    editingId = null;

    addBtn.innerText = "Upload Product";

  }else{

    await addDoc(collection(db,"products"),{

      name,
      description,
      price,
      image:imageUrl
    });
  }

  alert("Product Saved");

  loadProducts();
});

async function loadProducts(){

  adminProducts.innerHTML = "";

  const querySnapshot = await getDocs(collection(db,"products"));

  querySnapshot.forEach((document)=>{

    const product = document.data();

    adminProducts.innerHTML += `

      <div class="product-card">

        <img src="${product.image}" />

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>${product.description}</p>

          <div class="price">
            UGX ${product.price}
          </div>

          <button class="edit-btn"
            onclick="editProduct(
              '${document.id}',
              '${product.name}',
              '${product.description}',
              '${product.price}'
            )">

            Edit

          </button>

          <button class="delete-btn"
            onclick="deleteProduct('${document.id}')">

            Delete

          </button>

        </div>

      </div>
    `;
  });
}

window.deleteProduct = async(id)=>{

  await deleteDoc(doc(db,"products",id));

  loadProducts();
};

window.editProduct = (id,name,description,price)=>{

  editingId = id;

  document.getElementById("product-name").value = name;

  document.getElementById("product-description").value = description;

  document.getElementById("product-price").value = price;

  addBtn.innerText = "Update Product";
};

loadProducts();