const products = [

  {
    name: "Lip Masks",
    price: 400,
    image: "images/IMG-20260509-WA0021.jpg",
    description:
      "Moisturizing collagen lip masks that help soften dry lips and improve smoothness."
  },

  {
    name: "Sadoer Face Mask Sheet",
    price: 400,
    image: "images/IMG-20260509-WA0034.jpg",
    description:
      "Hydrating fruit face sheet masks designed to refresh and nourish the skin."
  },

  {
    name: "Sadoer Salicylic Acid Face Mask",
    price: 400,
    image: "images/IMG-20260509-WA0035.jpg",
    description:
      "Acne care facial sheet mask with salicylic acid for clearer healthier skin."
  },

  {
    name: "Sadoer Face Masks",
    price: 400,
    image: "images/IMG-20260509-WA0036.jpg",
    description:
      "Luxury vitamin and hyaluronic facial masks for glowing and hydrated skin."
  },

  {
    name: "Cute Lipgloss",
    price: 1200,
    image: "images/IMG-20260509-WA0041.jpg",
    description:
      "Cute glitter lip gloss with glossy shine and moisturizing formula."
  },

  {
    name: "Clear Lip Gloss With Mirror",
    price: 1500,
    image: "images/IMG-20260509-WA0043.jpg",
    description:
      "Crystal clear lip gloss with mini mirror design and long lasting shine."
  },

  {
    name: "Coloured Lipgloss",
    price: 1500,
    image: "images/IMG-20260509-WA0044.jpg",
    description:
      "Beautiful nude and pink colored lip gloss collection with smooth finish."
  },

  {
    name: "Mini Lipgloss",
    price: 1000,
    image: "images/IMG-20260510-WA0003.jpg",
    description:
      "Mini cute lip gloss set with fruity flavors and glossy finish."
  },

  {
    name: "Magic Lipgloss",
    price: 1200,
    image: "images/IMG-20260509-WA0042.jpg",
    description:
      "Color changing glossy lip oil with smooth moisturizing effect."
  },

  {
    name: "Magic Lipgloss With Mirror",
    price: 1500,
    image: "images/IMG-20260509-WA0045.jpg",
    description:
      "Luxury glossy lip oil with mirror packaging and sparkling shine."
  }

];

const productGrid = document.getElementById("product-grid");

let cart = [];

products.forEach((product) => {

  const card = document.createElement("div");

  card.classList.add("product-card");

  card.innerHTML = `

    <img src="${product.image}" alt="${product.name}">

    <div class="product-info">

      <h3>${product.name}</h3>

      <p>${product.description}</p>

      <span class="price">
        ₦${product.price.toLocaleString()}
      </span>

      <button onclick="addToCart('${product.name}', ${product.price})">
        Add To Cart
      </button>

    </div>

  `;

  productGrid.appendChild(card);

});

function addToCart(name, price){

  cart.push({
    name,
    price
  });

  alert(name + " added to cart ✨");

}

function orderOnWhatsApp(){

  const name =
    document.getElementById("customerName").value;

  const phone =
    document.getElementById("customerPhone").value;

  const address =
    document.getElementById("customerAddress").value;

  if(
    name === "" ||
    phone === "" ||
    address === ""
  ){

    alert("Please fill all fields");

    return;

  }

  if(cart.length === 0){

    alert("Your cart is empty");

    return;

  }

  let message =
`Hello Blushoria Store ✨

CUSTOMER DETAILS

Name: ${name}
Phone: ${phone}
Address: ${address}

ORDER LIST
`;

  let total = 0;

  cart.forEach((item) => {

    message += `
• ${item.name} - ₦${item.price}
`;

    total += item.price;

  });

  message += `

TOTAL: ₦${total}

Delivery fee depends on customer location in Nigeria 🇳🇬
`;

  const whatsappNumber = "2347012620748";

  const whatsappURL =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");

}