import { addToCart, getCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../scripts/utils/money.js"
/*const products = [{
  image: "images/products/athletic-cotton-socks-6-pairs.jpg",
  name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
  rating: {
    stars: 4.5,
    count: 87},
  priceCents: 1090
},
{
  image: "images/products/intermediate-composite-basketball.jpg",
  name: "Intermediate Size Basketball",
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095
},
{
  image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
  name: "Adults Plain Cotton T-Shirt - 2 Pack",
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799
},
{
  image: "images/products/black-2-slot-toaster.jpg",
  name: "2 Slot Toaster - Black",
  rating: {
    stars: 5,
    count: 2197
  },
  priceCents: 1899
}];
*/
document.querySelector('.js-cart-quantity')
  .innerHTML = JSON.parse(localStorage.getItem('cart'))? getCartQuantity(JSON.parse(localStorage.getItem('cart'))) : 0;

function updateCartQuantity(cartQuantity) {
  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

const productsGrid = document.querySelector(".products-grid");

products.forEach((product, index) => {
  const createDiv = document.createElement('div');
  createDiv.classList.add('product-container');
  createDiv.innerHTML = `
    <div class="product-image-container">
    <img class="product-image"
      src=${product.image}>
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${formatCurrency(product.priceCents)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <!-- Adding a dataset to the button -->
    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name='${product.name}'>
      Add to Cart
    </button>
  `;

  productsGrid.appendChild(createDiv);
  /*const productContainerTemplate = `
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src=${product.image}>
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary">
        Add to Cart
      </button>
    </div>
  `;

  productsGrid.innerHTML += productContainerTemplate;
  */
});

document.querySelectorAll(".js-add-to-cart").forEach((button, index) => {
  button.addEventListener('click', () => {
    // console.log(button.dataset.productName);
    const {id} = products[index];

    updateCartQuantity(addToCart(id));
  });
});