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
    name: "Glow Face Mask",
    price: 1200,
    image: "product4.jpg",
    description: "Soft skincare glow masks 🌸"
  },

  {
    name: "Cute Beauty Set",
    price: 4500,
    image: "product5.jpg",
    description: "Luxury beauty essentials ✨"
  },

  {
    name: "Pink Makeup Kit",
    price: 5500,
    image: "product6.jpg",
    description: "Everything cute and feminine 💖"
  },

  {
    name: "Soft Girl Package",
    price: 7000,
    image: "product7.jpg",
    description: "Aesthetic beauty combo 🎀"
  },

  {
    name: "Luxury Spa Set",
    price: 8500,
    image: "product8.jpg",
    description: "Relax and glow ✨"
  },

  {
    name: "Princess Collection",
    price: 9500,
    image: "product9.jpg",
    description: "Girlie luxury products 👑"
  },

  {
    name: "Blushoria Premium Box",
    price: 12000,
    image: "product10.jpg",
    description: "Ultimate feminine collection 💕"
  }
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartTotal = document.getElementById("cart-total");

function displayProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = document.createElement("div");

    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      
      <div class="product-info">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <h3>₦${product.price.toLocaleString()}</h3>

        <button onclick="addToCart(${index})">
          Add To Cart
        </button>
      </div>
    `;

    productsContainer.appendChild(productCard);
  });
}

function addToCart(index) {
  cart.push(products[index]);

  updateCart();

  alert(products[index].name + " added to cart 💕");
}

function updateCart() {
  let total = 0;

  cart.forEach(item => {
    total += item.price;
  });

  cartTotal.innerText = `₦${total.toLocaleString()}`;
}

function orderOnWhatsApp() {
  const name = document.getElementById("customer-name").value;
  const phone = document.getElementById("customer-phone").value;

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let message = `🛍️ *NEW ORDER - BLUSHORIA* %0A%0A`;

  message += `👩 Name: ${name}%0A`;
  message += `📞 Phone: ${phone}%0A%0A`;

  message += `✨ ORDER ITEMS ✨%0A`;

  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} - ₦${item.price}%0A`;

    total += item.price;
  });

  message += `%0A💰 Total: ₦${total.toLocaleString()}%0A`;
  message += `%0A📍 Delivery fee depends on location`;

  const whatsappNumber = "234XXXXXXXXXX";

  window.open(
    `https://wa.me/${whatsappNumber}?text=${message}`,
    "_blank"
  );
}

displayProducts();