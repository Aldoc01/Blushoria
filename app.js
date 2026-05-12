const products = [

  {
    name: "Lip Masks",
    price: 400,
    image: "product1.jpg",

    description:
    "Deeply hydrating lip masks designed to moisturize, soften, and smooth dry lips. Infused with fruity ingredients for soft glossy lips."
  },

  {
    name: "Sadoer Face Mask Sheet",
    price: 400,
    image: "product2.jpg",

    description:
    "Refreshing Sadoer sheet masks made to hydrate and nourish the skin while giving your face a soft glowing look."
  },

  {
    name: "Sadoer Salicylic Acid Face Mask",
    price: 400,
    image: "product3.jpg",

    description:
    "A soothing salicylic acid face mask that helps reduce acne, calm irritated skin, and control excess oil."
  },

  {
    name: "Sadoer Face Masks",
    price: 400,
    image: "product4.jpg",

    description:
    "Luxury fruit infused Sadoer face masks enriched with honey, coconut, raspberry, oatmeal, and orange."
  },

  {
    name: "Cute Lipgloss",
    price: 1200,
    image: "product5.jpg",

    description:
    "Adorable glossy lip products with cute stylish packaging that give lips a shiny smooth finish."
  },

  {
    name: "Clear Lip Gloss With Mirror",
    price: 1500,
    image: "product6.jpg",

    description:
    "Crystal clear lip gloss with built in mirror for quick touch ups anywhere."
  },

  {
    name: "Coloured Lipgloss",
    price: 1500,
    image: "product7.jpg",

    description:
    "Beautiful pigmented lip gloss available in lovely shades that add shine and moisture."
  },

  {
    name: "Mini Lipgloss",
    price: 1000,
    image: "product8.jpg",

    description:
    "Small portable lip gloss perfect for handbags and pockets with smooth glossy shine."
  },

  {
    name: "Magic Lipgloss",
    price: 1200,
    image: "product9.jpg",

    description:
    "Color changing magic lip gloss that creates a beautiful glossy tint while hydrating lips."
  },

  {
    name: "Magic Lipgloss With Mirror",
    price: 1500,
    image: "product10.jpg",

    description:
    "Trendy magic lip gloss with built in mirror and beautiful color changing effect."
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

    card.className = "product-card";

    card.innerHTML = `

      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <div class="product-info">

        <h2>${product.name}</h2>

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
    " added to cart 💖"
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
  `✨ BLUSHORIA STORE ORDER ✨%0A%0A`;

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

displayProducts();