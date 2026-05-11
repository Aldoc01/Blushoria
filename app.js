import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase-config.js";

const productsContainer = document.getElementById("products-container");

async function loadProducts(){

  const querySnapshot = await getDocs(collection(db,"products"));

  productsContainer.innerHTML = "";

  querySnapshot.forEach((doc)=>{

    const product = doc.data();

    productsContainer.innerHTML += `

      <div class="product-card">

        <img src="${product.image}" />

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>${product.description}</p>

          <div class="price">
            UGX ${product.price}
          </div>

        </div>

      </div>
    `;
  });
}

loadProducts();