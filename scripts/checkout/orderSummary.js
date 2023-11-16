import { cart, removeFromCart, getCartQuantity, saveToStorage } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, convertDeliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let deliveryOptionsHtml;

export function formatDate(numberOfDays) {
  const today = dayjs();
  return today
    .add(numberOfDays, 'days')
    .format('dddd, MMMM D');
}

export function renderCheckOutPage() {
  let cartGenerated = '';

  cart.forEach((cartItem, index) => {

    products.forEach((product) => {
      if (product.id === cartItem.id) {
        const { image, name, priceCents } = product;
  
        cartGenerated +=`<div class="cart-item-container js-cart-item-container-${product.id}">
              <div class="delivery-date js-delivery-date">
                Delivery date: ${cartItem.deliveryOptionId ? convertDeliveryOptions(cartItem.deliveryOptionId) : ''}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    "${name}"
                  </div>
                  <div class="product-price">
                    $${formatCurrency(priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${cartItem.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${generateDeliveryOptions(cartItem, index)}
                </div>
              </div>
            </div>
          `;
      }
    });
  });

  document.querySelector('.js-order-summary').innerHTML = cartGenerated;

  document.querySelectorAll('.js-delivery-option-input').forEach((deliveryOption) => {
    deliveryOption.addEventListener('click', () => {
      cart.forEach((cartItem, index) => {
        if(cartItem.id === deliveryOption.dataset.productId) {
          cartItem.deliveryOptionId = deliveryOption.dataset.deliveryOption;
          // document.querySelectorAll('.js-delivery-date')[index].innerHTML = `Delivery date: ${convertDeliveryOptions(deliveryOption.dataset.deliveryOption)}`;
          saveToStorage(cart);
          renderCheckOutPage();
        }
      });
    });
  });

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      removeFromCart(link.dataset.productId);
    });
  });

  document.querySelector('.js-payment-summary-row')
  .innerHTML = `Items (${getCartQuantity(cart)}):`;

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${getCartQuantity(cart)} Items`;
}

function generateDeliveryOptions(cartItem, index) {
  deliveryOptionsHtml = '';
  deliveryOptions.forEach((deliveryOption) => {
    const formattedDeliveryPrice = formatCurrency(deliveryOption.priceCents);
    let deliveryCost =  (formattedDeliveryPrice > 0) ? 
    `$${formattedDeliveryPrice} -` : 'FREE';

    const isChecked = (cartItem.deliveryOptionId === deliveryOption.id) ? 'checked' : '';
    deliveryOptionsHtml += 
        `<div class="delivery-option">
          <input type="radio" ${isChecked}
            class="delivery-option-input js-delivery-option-input"
            name="delivery-option-${index}" data-product-id="${cartItem.id}" data-delivery-option=${deliveryOption.id}>
          <div>
            <div class="delivery-option-date">
              ${formatDate(deliveryOption.deliveryDays)}
            </div>
            <div class="delivery-option-price">
              ${deliveryCost} Shipping
            </div>
          </div>
        </div>`;
  });

  return deliveryOptionsHtml;
}