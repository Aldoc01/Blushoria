const products = [
  {
    name: "Magic Lipgloss",
    price: 1500,
    image: "./product1.jpg",
    desc: "Glossy pink mirror lip oil ✨"
  },
  {
    name: "Mini Perfume",
    price: 3000,
    image: "./product2.jpg",
    desc: "Soft feminine fragrance 💕"
  },
  {
    name: "Girlie Lip Balm",
    price: 1800,
    image: "./product3.jpg",
    desc: "Soft pink glossy lips 🎀"
  },
  {
    name: "Lip Mask",
    price: 1200,
    image: "./product4.jpg",
    desc: "Cute overnight lip care 💖"
  },
  {
    name: "Beauty Mask",
    price: 2500,
    image: "./product5.jpg",
    desc: "Luxury skincare glow ✨"
  },
  {
    name: "Soft Gloss",
    price: 2000,
    image: "./product6.jpg",
    desc: "Shiny soft pink gloss 💗"
  },
  {
    name: "Cherry Balm",
    price: 1700,
    image: "./product7.jpg",
    desc: "Cherry sweet lips 🍒"
  },
  {
    name: "Pink Serum",
    price: 3500,
    image: "./product8.jpg",
    desc: "Smooth glowing skin 🌸"
  },
  {
    name: "Aesthetic Kit",
    price: 5000,
    image: "./product9.jpg",
    desc: "Cute beauty essentials 🎀"
  },
  {
    name: "Glow Package",
    price: 6500,
    image: "./product10.jpg",
    desc: "Luxury feminine bundle ✨"
  }
];

const productContainer = document.getElementById("products");

products.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img 
      src="${product.image}" 
      alt="${product.name}"
      onerror="this.src='logo.png'"
    />

    <div class="product-info">
      <h2>${product.name}</h2>
      <p>${product.desc}</p>

      <div class="price">
        ₦${product.price.toLocaleString()}
      </div>

      <button onclick="addToCart('${product.name}', ${product.price})">
        Add To Cart
      </button>
    </div>
  `;

  productContainer.appendChild(card);
});

let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });

  updateCart();

  alert(name + " added to cart 💖");
}

function updateCart() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  document.getElementById("cart-total").innerText =
    "₦" + total.toLocaleString();
}

function orderWhatsApp() {
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;

  if (!name || !phone) {
    alert("Please fill your details 💕");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty 🛒");
    return;
  }

  let message = `💖 BLUSHORIA ORDER 💖%0A%0A`;

  message += `Name: ${name}%0A`;
  message += `Phone: ${phone}%0A%0A`;

  message += `Items:%0A`;

  cart.forEach((item) => {
    message += `• ${item.name} - ₦${item.price}%0A`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  message += `%0ATotal: ₦${total}`;

  window.open(
    `https://wa.me/234XXXXXXXXXX?text=${message}`,
    "_blank"
  );
}