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
    name: "Luxury Face Mask",
    price: 2000,
    image: "product4.jpg",
    description: "Cute skincare glow ✨"
  },
  {
    name: "Beauty Bundle",
    price: 5000,
    image: "product5.jpg",
    description: "Everything girly in one set 💖"
  }
];

const productContainer = document.getElementById("products");

let cart = [];

products.forEach((product, index) => {
  productContainer.innerHTML += `
    <div class="product-card">
      <img 
        src="${product.image}" 
        alt="${product.name}"
        onerror="this.src='logo.png'"
      >

      <div class="product-info">
        <h2>${product.name}</h2>
        <p>${product.description}</p>

        <div class="price">₦${product.price.toLocaleString()}</div>

        <button onclick="addToCart(${index})">
          Add To Cart
        </button>
      </div>
    </div>
  `;
});

function addToCart(index) {
  cart.push(products[index]);
  updateCart();

  alert(products[index].name + " added to cart 💖");
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  let totalPrice = 0;

  cart.forEach(item => {
    totalPrice += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        ${item.name} - ₦${item.price.toLocaleString()}
      </div>
    `;
  });

  total.innerText = `₦${totalPrice.toLocaleString()}`;
}

function orderWhatsApp() {
  const name = document.getElementById("customer-name").value;
  const address = document.getElementById("customer-address").value;

  if (cart.length === 0) {
    alert("Your cart is empty 💔");
    return;
  }

  let message = "💖 *BLUSHORIA ORDER* %0A%0A";

  message += "👩 Name: " + name + "%0A";
  message += "📍 Address: " + address + "%0A%0A";

  message += "🛍️ Order Items:%0A";

  let total = 0;

  cart.forEach(item => {
    message += "- " + item.name + " (₦" + item.price + ")%0A";
    total += item.price;
  });

  message += "%0A💰 Total: ₦" + total;

  const phone = "2347012620748";

  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank"
  );
}