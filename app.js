const products = [

  // FACE MASKS

  {
    name: "Lip Masks",
    price: 400,
    image: "product1.jpg",
    description:
    "Deeply hydrating lip masks designed to moisturize, soften, and smooth dry lips."
  },

  {
    name: "Sadoer Fruit Face Mask Sheets",
    price: 400,
    image: "product2.jpg",
    description:
    "Luxury fruit-infused Sadoer face masks enriched with honey, coconut, raspberry, oatmeal, and orange."
  },

  {
    name: "Sadoer Salicylic Acid Face Mask",
    price: 400,
    image: "product3.jpg",
    description:
    "Helps reduce acne, calm irritated skin, control excess oil, and hydrate the face."
  },

  {
    name: "Sadoer Serum Face Masks",
    price: 400,
    image: "product4.jpg",
    description:
    "Vitamin C, Hyaluronic Acid, and Golden Serum masks that deeply hydrate and brighten the skin."
  },



  // LIP GLOSSES

  {
    name: "Cute Cat Lip Gloss",
    price: 1200,
    image: "product5.jpg",
    description:
    "Adorable cat-themed glossy lip products with moisturizing shine."
  },

  {
    name: "Mini Nude Lip Gloss Set",
    price: 1500,
    image: "product7.jpg",
    description:
    "Beautiful mini nude lip gloss collection with a glossy everyday makeup look."
  },

  {
    name: "Magic Glitter Lip Gloss",
    price: 1500,
    image: "product9.jpg",
    description:
    "Trendy glitter lip gloss with sparkling glossy shine."
  },



  // LIP OILS

  {
    name: "Cherry Fruit Lip Oil",
    price: 1200,
    image: "product6.jpg",
    description:
    "Cute fruit-inspired lip oil that keeps lips soft, glossy, hydrated, and smooth."
  },

  {
    name: "Hydrating Lip Oil",
    price: 1200,
    image: "product8.jpg",
    description:
    "Moisturizing hydrating lip oils that leave lips soft, smooth, glossy, and nourished."
  },

  {
    name: "Fruit Lip Oil Collection",
    price: 1500,
    image: "product10.jpg",
    description:
    "Cute fruit-themed lip oils with moisturizing glossy formulas."
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

        <button
          onclick="addToCart(${index})"
        >
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

  alert(
    products[index].name +
    " added to cart 💖"
  );

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

    alert(
      "Please enter your details"
    );

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
    `• ${item.name} - ₦${item.price.toLocaleString()}%0A`;

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