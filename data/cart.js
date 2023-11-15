import { updateCartQuantity } from "../scripts/amazon.js";
const cart = [];

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
  
  updateCartQuantity(cartQuantity);
}