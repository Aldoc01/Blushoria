import {
  db
} from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const productsContainer =
document.getElementById("products");

async function loadProducts(){

  const querySnapshot =
  await getDocs(collection(db,"products"));

  productsContainer.innerHTML = "";

  querySnapshot.forEach((doc)=>{

    const product = doc.data();

    productsContainer.innerHTML += `

    <div class="product-card">

      <img src="${product.image}" />

      <div class="product-info">

        <h3>${product.name}</h3>

        <p class="price">
        $${product.price}
        </p>

        <p>
        ${product.description}
        </p>

        <br>

        <button class="buy-btn">
        Add To Cart
        </button>

      </div>

    </div>

    `;
  });
}

loadProducts();