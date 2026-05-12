// app.js

const products = [

  {
    category:"Lip Care 💋",
    name:"Lip Masks",
    price:400,
    image:"product1.jpg",
    description:"Deeply hydrating lip masks designed to moisturize, soften, and smooth dry lips."
  },

  {
    category:"Face Masks 🧖🏽‍♀️",
    name:"Sadoer Face Mask Sheet",
    price:400,
    image:"product2.jpg",
    description:"Refreshing sheet masks made to hydrate and nourish the skin."
  },

  {
    category:"Acne Care ✨",
    name:"Sadoer Salicylic Acid Mask",
    price:400,
    image:"product3.jpg",
    description:"Helps reduce acne, calm irritated skin, and control excess oil."
  },

  {
    category:"Face Masks 🧖🏽‍♀️",
    name:"Sadoer Fruit Face Masks",
    price:400,
    image:"product4.jpg",
    description:"Luxury fruit-infused masks enriched with honey, coconut, oatmeal, and orange."
  },

  {
    category:"Lip Gloss ✨",
    name:"Cute Lipgloss",
    price:1200,
    image:"product5.jpg",
    description:"Cute glossy lip products with soft color and moisturizing shine."
  },

  {
    category:"Lip Gloss ✨",
    name:"Clear Lip Gloss With Mirror",
    price:1500,
    image:"product6.jpg",
    description:"Crystal clear lip gloss with built-in mirror for touch-ups anywhere."
  },

  {
    category:"Lip Gloss ✨",
    name:"Coloured Lipgloss",
    price:1500,
    image:"product7.jpg",
    description:"Pigmented lip gloss with beautiful shades and glossy finish."
  },

  {
    category:"Lip Gloss ✨",
    name:"Mini Lipgloss",
    price:1000,
    image:"product8.jpg",
    description:"Portable mini lip gloss perfect for handbags and pockets."
  },

  {
    category:"Magic Gloss 💖",
    name:"Magic Lipgloss",
    price:1200,
    image:"product9.jpg",
    description:"Color-changing lip gloss that creates a unique glossy tint."
  },

  {
    category:"Magic Gloss 💖",
    name:"Magic Lipgloss With Mirror",
    price:1500,
    image:"product10.jpg",
    description:"Magic glossy lip oil with built-in mirror and color-changing effect."
  }

];

const productsContainer =
document.getElementById("products");

const cartItems =
document.getElementById("cart-items");

const cartTotal =
document.getElementById("cart-total");

let cart = [];

function displayProducts(){

  products.forEach((product,index)=>{

    const card =
    document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}">

      <div class="product-info">

        <span class="category">
          ${product.category}
        </span>

        <h2>${product.name}</h2>

        <p>${product.description}</p>

        <h3>
          ₦${product.price.toLocaleString()}
        </h3>

        <button onclick="addToCart(${index})">
          Add To Cart 💖
        </button>

      </div>
    `;

    productsContainer.appendChild(card);

  });

}

function addToCart(index){

  cart.push(products[index]);

  updateCart();

  alert(products[index].name + " added to cart 💖");

}

function updateCart(){

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item)=>{

    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        ${item.name} — ₦${item.price.toLocaleString()}
      </div>
    `;

  });

  cartTotal.innerText =
  `₦${total.toLocaleString()}`;

}

function orderOnWhatsApp(){

  const name =
  document.getElementById("customer-name").value;

  const address =
  document.getElementById("customer-address").value;

  if(cart.length === 0){

    alert("Your cart is empty");

    return;
  }

  if(!name || !address){

    alert("Please enter your details");

    return;
  }

  let message =
  `✨ BLUSHORIA ORDER ✨%0A%0A`;

  message +=
  `👩 Name: ${name}%0A`;

  message +=
  `📍 Address: ${address}%0A%0A`;

  message +=
  `🛍️ ITEMS:%0A`;

  let total = 0;

  cart.forEach(item=>{

    message +=
    `• ${item.name} - ₦${item.price}%0A`;

    total += item.price;

  });

  message +=
  `%0A💰 TOTAL: ₦${total.toLocaleString()}%0A`;

  message +=
  `%0A🚚 Waybill fee depends on location`;

  const phone =
  "2347012620748";

  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank"
  );

}

displayProducts();