// import { updateCartQuantity } from "../scripts/amazon.js";

export const cart = [{
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 1
}, {
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 2
}];

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
      quantity: itemQuantity
    });
    duplicateFound = false;
    cartQuantity += itemQuantity;
  }
  
  return cartQuantity;
}

export function removeFromCart(prodId) {
  cart.forEach((cartItem, index) => {
    if (cartItem.id === prodId) {
      cart.splice(index, 1);
    }

    const container = document.querySelector(`.js-cart-item-container-${prodId}`);

    container.remove();
  });
}