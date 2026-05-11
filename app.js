const products = [
  {
    name: "Magic Lipgloss",
    price: 1500,
    image: "product1.jpg",
    desc: "Glossy pink mirror lip oil ✨"
  },

  {
    name: "Mini Perfume",
    price: 3000,
    image: "product2.jpg",
    desc: "Soft feminine fragrance 💕"
  },

  {
    name: "Girlie Lip Balm",
    price: 1800,
    image: "product3.jpg",
    desc: "Soft pink glossy lips 🎀"
  },

  {
    name: "Beauty Bundle",
    price: 5000,
    image: "product4.jpg",
    desc: "Everything girly in one set 💖"
  },

  {
    name: "Luxury Perfume Oil",
    price: 4500,
    image: "product5.jpg",
    desc: "Long lasting sweet fragrance ✨"
  },

  {
    name: "Blushoria Special Box",
    price: 8000,
    image: "product6.jpg",
    desc: "Premium beauty collection 💕"
  },

  {
    name: "Cute Lip Oil",
    price: 2500,
    image: "product7.jpg",
    desc: "Hydrating shiny lips 💋"
  },

  {
    name: "Soft Girl Package",
    price: 7000,
    image: "product8.jpg",
    desc: "Luxury girly essentials ✨"
  },

  {
    name: "Pink Gloss Set",
    price: 3500,
    image: "product9.jpg",
    desc: "Cute glossy collection 💖"
  },

  {
    name: "Aesthetic Beauty Pack",
    price: 9000,
    image: "product10.jpg",
    desc: "Everything soft feminine 🎀"
  }
];

const productContainer = document.getElementById("products");

let cart = [];
let total = 0;

products.forEach((product) => {

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    
    <div class="card-content">
      <h2>${product.name}</h2>
      <p>${product.desc}</p>
      <div class="price">₦${product.price.toLocaleString()}</div>

      <button onclick="addToCart('${product.name}', ${product.price})">
        Add To Cart
      </button>
    </div>
  `;

  productContainer.appendChild(card);
});

function addToCart(name, price){

  cart.push(name);

  total += price;

  document.getElementById("total").innerText =
    `Total: ₦${total.toLocaleString()}`;
}

function orderWhatsApp(){

  const name =
    document.getElementById("customerName").value;

  const address =
    document.getElementById("customerAddress").value;

  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  let message =
`Hello Blushoria 💖

My Name: ${name}

Address: ${address}

I want to order:

${cart.join(", ")}

Total: ₦${total.toLocaleString()}
`;

  const phone = "2347012620748";

  const url =
`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}