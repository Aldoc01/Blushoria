const products = [

  {
    name:"Magic Lipgloss With Mirror",
    price:1500,
    image:"product1.jpg",
    description:
    "Trendy magic lip gloss with built in mirror and beautiful color changing effect."
  },

  {
    name:"Mini Perfume",
    price:3000,
    image:"product2.jpg",
    description:
    "Soft feminine fragrance with luxurious long lasting scent."
  },

  {
    name:"Girlie Lip Balm",
    price:1800,
    image:"product3.jpg",
    description:
    "Cute glossy lip balm for soft hydrated pink lips."
  },

  {
    name:"Beauty Bundle",
    price:5000,
    image:"product4.jpg",
    description:
    "Complete beauty essentials package for every soft girl."
  },

  {
    name:"Luxury Perfume Oil",
    price:4500,
    image:"product5.jpg",
    description:
    "Premium perfume oil with sweet rich feminine aroma."
  },

  {
    name:"Blushoria Special Box",
    price:8000,
    image:"product6.jpg",
    description:
    "Luxury beauty package filled with premium goodies."
  },

  {
    name:"Lip Care Set",
    price:2500,
    image:"product7.jpg",
    description:
    "Cute lip care essentials for smooth glossy lips."
  },

  {
    name:"Pink Glow Oil",
    price:3500,
    image:"product8.jpg",
    description:
    "Body glow oil for radiant smooth glowing skin."
  },

  {
    name:"Soft Girl Package",
    price:7000,
    image:"product9.jpg",
    description:
    "Luxury soft girl package with premium feminine vibes."
  },

  {
    name:"Cherry Lip Oil",
    price:2000,
    image:"product10.jpg",
    description:
    "Sweet cherry lip oil for juicy glossy lips."
  }

];

const productsContainer =
document.getElementById("products");

const cartTotal =
document.getElementById("cart-total");

let cart = [];

/* DISPLAY PRODUCTS */

function displayProducts(){

  productsContainer.innerHTML = "";

  products.forEach((product,index)=>{

    const card =
    document.createElement("div");

    card.className =
    "product-card";

    card.innerHTML = `

      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <div class="product-info">

        <h2>
          ${product.name}
        </h2>

        <p>
          ${product.description}
        </p>

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

/* ADD TO CART */

function addToCart(index){

  cart.push(products[index]);

  updateCart();

  alert(
    products[index].name +
    " added to cart 💕"
  );

}

/* UPDATE TOTAL */

function updateCart(){

  let total = 0;

  cart.forEach(item=>{

    total += item.price;

  });

  cartTotal.innerText =
  `₦${total.toLocaleString()}`;

}

/* WHATSAPP ORDER */

function orderOnWhatsApp(){

  const name =
  document.getElementById(
    "customer-name"
  ).value;

  const address =
  document.getElementById(
    "customer-address"
  ).value;

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
  `%0A🚚 Delivery fee depends on location`;

  const phone =
  "2347012620748";

  window.open(

    `https://wa.me/${phone}?text=${message}`,

    "_blank"

  );

}

/* START */

displayProducts();