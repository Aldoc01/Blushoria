const products = [
  {
    id: 1,
    name: "Lip Masks",
    price: 400,
    category: "Lip Care",
    image: "images/IMG-20260509-WA0021.jpg",
    description:
      "Hydrating lip masks that moisturize dry lips and leave them soft, smooth, and glossy."
  },

  {
    id: 2,
    name: "Sadoer Face Mask Sheet",
    price: 400,
    category: "Face Masks",
    image: "images/IMG-20260509-WA0034.jpg",
    description:
      "Refreshing Sadoer sheet masks enriched with fruit extracts for glowing and hydrated skin."
  },

  {
    id: 3,
    name: "Sadoer Salicylic Acid Face Mask",
    price: 400,
    category: "Face Masks",
    image: "images/IMG-20260509-WA0035.jpg",
    description:
      "Acne repair salicylic acid facial mask that helps reduce pimples, oil, and dark spots."
  },

  {
    id: 4,
    name: "Sadoer Facial Masks Collection",
    price: 400,
    category: "Face Masks",
    image: "images/IMG-20260509-WA0036.jpg",
    description:
      "Premium facial sheet masks with Vitamin C, Hyaluronic Acid, and Golden Serum."
  },

  {
    id: 5,
    name: "Cute Lip Gloss",
    price: 1200,
    category: "Lip Gloss",
    image: "images/IMG-20260509-WA0041.jpg",
    description:
      "Cute glossy lip oils with soft shimmer and moisturizing formula for shiny lips."
  },

  {
    id: 6,
    name: "Clear Lip Gloss With Mirror",
    price: 1500,
    category: "Lip Gloss",
    image: "images/IMG-20260509-WA0043.jpg",
    description:
      "Elegant clear lip gloss with built-in mirror for quick touch-ups anywhere."
  },

  {
    id: 7,
    name: "Coloured Lip Gloss",
    price: 1500,
    category: "Lip Gloss",
    image: "images/IMG-20260509-WA0044.jpg",
    description:
      "Luxury coloured lip gloss set with smooth texture and beautiful shine."
  },

  {
    id: 8,
    name: "Mini Lip Gloss",
    price: 1000,
    category: "Lip Gloss",
    image: "images/IMG-20260510-WA0003.jpg",
    description:
      "Mini lip gloss collection perfect for handbags and everyday glossy lips."
  },

  {
    id: 9,
    name: "Magic Lip Gloss",
    price: 1200,
    category: "Lip Gloss",
    image: "images/IMG-20260510-WA0004.jpg",
    description:
      "Magic color-changing lip gloss that reacts beautifully on lips."
  },

  {
    id: 10,
    name: "Magic Lip Gloss With Mirror",
    price: 1500,
    category: "Lip Gloss",
    image: "images/IMG-20260510-WA0005.jpg",
    description:
      "Premium magic lip gloss with built-in mirror and long-lasting shine."
  }
];

const productContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cart-count");

let cart = [];

function displayProducts(items) {
  productContainer.innerHTML = "";

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      
      <div class="product-info">
        <h3>${product.name}</h3>
        
        <p class="desc">
          ${product.description}
        </p>

        <div class="price">
          ₦${product.price.toLocaleString()}
        </div>

        <button onclick="addToCart(${product.id})">
          Add To Cart
        </button>
      </div>
    `;

    productContainer.appendChild(card);
  });
}

function addToCart(id) {
  const item = products.find(product => product.id === id);

  cart.push(item);

  cartCount.innerText = cart.length;

  alert(item.name + " added to cart!");
}

searchInput.addEventListener("keyup", e => {
  const value = e.target.value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "Hello Blushoria Store,%0A%0AI want to order:%0A";

  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} - ₦${item.price}%0A`;
    total += item.price;
  });

  message += `%0A*Total: ₦${total}*`;

  window.open(
    `https://wa.me/2340000000000?text=${message}`,
    "_blank"
  );
}

displayProducts(products);