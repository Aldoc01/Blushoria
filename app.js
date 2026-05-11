let cart = [];
let total = 0;

function addToCart(product, price){

  cart.push({
    product,
    price
  });

  total += price;

  displayCart();
}

function displayCart(){

  const cartItems = document.getElementById("cart-items");

  cartItems.innerHTML = "";

  cart.forEach(item => {

    cartItems.innerHTML += `
      <p>
        ${item.product} - ₦${item.price}
      </p>
    `;
  });

  document.getElementById("total").innerText =
    `Total: ₦${total}`;
}

function checkoutWhatsApp(){

  const name =
    document.getElementById("customerName").value;

  const phone =
    document.getElementById("customerPhone").value;

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  if(name === "" || phone === ""){
    alert("Please enter your name and phone number");
    return;
  }

  let message =
`Hello Blushoria ✨

Customer Name: ${name}

Phone Number: ${phone}

Order Details:
`;

  cart.forEach(item => {
    message += `
${item.product} - ₦${item.price}
`;
  });

  message += `

Total: ₦${total}

Waybill delivery fee will be discussed on WhatsApp.
`;

  const whatsappNumber = "2347012620748";

  const url =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}