const products = [
  {
    id: 1,
    name: "Magic Lipgloss",
    price: 1500,
    image: "product1.jpg",
    desc: "Glossy pink mirror lip oil ✨"
  },
  {
    id: 2,
    name: "Mini Perfume",
    price: 3000,
    image: "product2.jpg",
    desc: "Soft feminine fragrance 💕"
  },
  {
    id: 3,
    name: "Girlie Lip Balm",
    price: 1800,
    image: "product3.jpg",
    desc: "Soft pink glossy lips 🎀"
  },
  {
    id: 4,
    name: "Lip Mask",
    price: 1200,
    image: "product4.jpg",
    desc: "Overnight lip repair 💖"
  },
  {
    id: 5,
    name: "Facial Mask Pack",
    price: 2500,
    image: "product5.jpg",
    desc: "Cute skincare bundle ✨"
  },
  {
    id: 6,
    name: "Pink Beauty Set",
    price: 5000,
    image: "product6.jpg",
    desc: "Luxury girly collection 💕"
  },
  {
    id: 7,
    name: "Soft Gloss Oil",
    price: 1700,
    image: "product7.jpg",
    desc: "Hydrating glossy lips 💄"
  },
  {
    id: 8,
    name: "Beauty Essentials",
    price: 4000,
    image: "product8.jpg",
    desc: "Cute aesthetic essentials 🎀"
  },
  {
    id: 9,
    name: "Pink Glow Kit",
    price: 4500,
    image: "product9.jpg",
    desc: "Glow-up skincare combo ✨"
  },
  {
    id: 10,
    name: "Luxury Beauty Box",
    price: 7000,
    image: "product10.jpg",
    desc: "Full feminine beauty package 💕"
  }
];

const productContainer = document.getElementById("products");
const cartTotal = document.getElementById("cart-total");

let cart = [];

function renderProducts() {
  productContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h2>${product.name}</h2>
        <p>${product.desc}</p>
        <h3>₦${product.price.toLocaleString()}</h3>
        <button onclick="addToCart(${product.id})">
          Add To Cart
        </button>
      </div>
    `;

    productContainer.appendChild(card);
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);

  cart.push(item);

  updateCart();
}

function updateCart() {
  let total = 0;

  cart.forEach(item => {
    total += item.price;
  });

  cartTotal.innerText = `₦${total.toLocaleString()}`;
}

function orderWhatsApp() {
  const name = document.getElementById("customer-name").value;
  const phone = document.getElementById("customer-phone").value;

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "🌸 BLUSHORIA ORDER 🌸%0A%0A";

  message += `👩 Name: ${name}%0A`;
  message += `📞 Phone: ${phone}%0A%0A`;

  message += "🛍 Products:%0A";

  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} - ₦${item.price}%0A`;
    total += item.price;
  });

  message += `%0A💰 Total: ₦${total}`;

  const whatsappNumber = "234XXXXXXXXXX";

  window.open(
    `https://wa.me/${whatsappNumber}?text=${message}`,
    "_blank"
  );
}

renderProducts();