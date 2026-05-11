const buttons = document.querySelectorAll(".order-btn");

buttons.forEach((button)=>{

  button.addEventListener("click",()=>{

    const product =
    button.getAttribute("data-product");

    const price =
    button.getAttribute("data-price");

    const message =
`Hello Blushoria ✨

I want to order:

🛍 Product: ${product}

💵 Price: ${price}

Please tell me the delivery fee to my location in Nigeria 🇳🇬`;

    const whatsappURL =
`https://wa.me/2347012620748?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL,"_blank");

  });

});