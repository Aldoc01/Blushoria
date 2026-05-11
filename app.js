const products = [
  {
    name: "Magic Lipgloss",
    price: 1500,
    image: "product1.jpg",
    description: "Glossy pink mirror lip oil ✨"
  },

  {
    name: "Mini Perfume",
    price: 3000,
    image: "product2.jpg",
    description: "Soft feminine fragrance 💕"
  },

  {
    name: "Girlie Lip Balm",
    price: 1800,
    image: "product3.jpg",
    description: "Soft pink glossy lips 🎀"
  },

  {
    name: "Beauty Bundle",
    price: 5000,
    image: "product4.jpg",
    description: "Everything girly in one set 💖"
  },

  {
    name: "Luxury Perfume Oil",
    price: 4500,
    image: "product5.jpg",
    description: "Long lasting sweet fragrance ✨"
  },

  {
    name: "Blushoria Special Box",
    price: 8000,
    image: "product6.jpg",
    description: "Premium beauty collection 💕"
  },

  {
    name: "Lip Care Set",
    price: 2500,
    image: "product7.jpg",
    description: "Cute lip care essentials 💋"
  },

  {
    name: "Pink Glow Oil",
    price: 3500,
    image: "product8.jpg",
    description: "Shiny smooth glow skin ✨"
  },

  {
    name: "Soft Girl Package",
    price: 7000,
    image: "product9.jpg",
    description: "Luxury soft girl vibes 💕"
  },

  {
    name: "Cherry Lip Oil",
    price: 2000,
    image: "product10.jpg",
    description: "Sweet cherry glossy lips 🍒"
  }
];

const productsContainer =
document.getElementById("products");

const cartTotal =
document.getElementById("cart-total");

let cart = [];

function displayProducts(){

  productsContainer.innerHTML = "";

  products.forEach((product,index)=>{

    const card =
    document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">

      <div class="product-info">

        <h2>${product.name}</h2>

        <p>${product.description}</p>

        <h3>
          ₦${product.price.toLocaleString()}
        </h3>

        <button onclick="addToCart(${index})">
          Add To Cart
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

  let total = 0;

  cart.forEach(item=>{

    total += item.price;

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