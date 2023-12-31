import { formatDate } from "../scripts/checkout/orderSummary.js";

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function convertDeliveryOptions(deliveryOption) {
  let date;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOption) {
      date = formatDate(option.deliveryDays)
    }
  });

  return date;
}

export function getDeliveryOption(deliveryId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryId) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
}