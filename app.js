let cart = [];

function addToCart(product, price){

  cart.push({
    product,
    price
  });

  updateCart();
}

function updateCart(){

  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("total");

  cartItems.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((item) => {

    totalPrice += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.product}</span>
        <span>₦${item.price.toLocaleString()}</span>
      </div>
    `;
  });

  total.innerText = `Total: ₦${totalPrice.toLocaleString()}`;
}

function checkoutWhatsApp(){

  if(cart.length === 0){
    alert("Your cart is empty");
    return;
  }

  let message = "Hello Blushoria Store,%0A%0AI want to order:%0A";

  let total = 0;

  cart.forEach((item) => {
    message += `- ${item.product} (₦${item.price})%0A`;
    total += item.price;
  });

  message += `%0ATotal: ₦${total}`;

  const whatsappURL =
    `https://wa.me/2347012620748?text=${message}`;

  window.open(whatsappURL, "_blank");
}