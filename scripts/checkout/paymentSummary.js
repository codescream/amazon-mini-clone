import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let totalItemCost = 0;
  let totalShippingCost = 0;
  let totalItems = 0;

  console.log(cart);

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.id);
    totalItemCost += product.priceCents * cartItem.quantity;
    totalShippingCost += getDeliveryOption(cartItem.deliveryOptionId) ?
    getDeliveryOption(cartItem.deliveryOptionId).priceCents : 
    0;
    totalItems += cartItem.quantity;
  });

  const totalBeforeTaxCents = totalItemCost + totalShippingCost;
  const taxCents = Number(totalBeforeTaxCents) * 0.13;
  const totalCostCents = Number(totalBeforeTaxCents) + Number(taxCents);

  const paymentSummaryHtml = `
    <div class="payment-summary-title">
      Order Summary
    </div>
    <div class="payment-summary-row js-payment-summary-row">
    <div>Item (${totalItems}):</div>
    <div class="payment-summary-money">$${formatCurrency(totalItemCost)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(totalShippingCost)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCostCents)}</div>
    </div>
    <button class="place-order-button button-primary">
      Place your order
    </button>
    `;

    document.querySelector('.payment-summary')
      .innerHTML = paymentSummaryHtml;
}