// import { updateCartQuantity } from "../scripts/amazon.js";

export const cart = JSON.parse(localStorage.getItem('cart'))? JSON.parse(localStorage.getItem('cart')) : [];

export function addToCart(id) {
  const itemQuantity = Number(document.querySelector(`.js-quantity-selector-${id}`).value);
  let duplicateFound = false;
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    if(cartItem.id === id) {
      duplicateFound = true;
      cartItem.quantity += itemQuantity;
    }
    cartQuantity += cartItem.quantity;
  });

  if(!duplicateFound) {
    cart.push({
      id,
      quantity: itemQuantity,
    });
    duplicateFound = false;
    cartQuantity += itemQuantity;
  }
  
  saveToStorage(cart);
  return cartQuantity;
}

export function getCartQuantity(cart) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function saveToStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(prodId) {
  cart.forEach((cartItem, index) => {
    if (cartItem.id === prodId) {
      cart.splice(index, 1);

      const container = document.querySelector(`.js-cart-item-container-${prodId}`);
      
      saveToStorage(cart);

      container.remove();
    }
  });
}