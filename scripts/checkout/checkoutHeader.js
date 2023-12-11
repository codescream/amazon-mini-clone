import { cart, getCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  console.log('helper');
  document.querySelector('.js-checkout-header').innerHTML = `
        <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="index.html">
            <img class="amazon-logo" src="images/markogiloLogo.svg">
            <img class="amazon-mobile-logo" src="images/markogiloLogo.svg">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-return-to-home-link"
            href="index.html">${getCartQuantity(cart)} Items</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    `;
}

renderCheckoutHeader();