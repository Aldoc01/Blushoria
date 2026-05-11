const products = [
  {
    name: "Luxury Fashion Item",
    price: "$120",
    image: "images/IMG-20260509-WA0021.jpg"
  },
  {
    name: "Premium Outfit",
    price: "$150",
    image: "images/IMG-20260509-WA0034.jpg"
  },
  {
    name: "Elegant Style",
    price: "$200",
    image: "images/IMG-20260509-WA0035.jpg"
  },
  {
    name: "Modern Fashion",
    price: "$180",
    image: "images/IMG-20260509-WA0036.jpg"
  }
];

const container = document.getElementById("products-container");

products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.price}</p>
  `;

  container.appendChild(card);
});