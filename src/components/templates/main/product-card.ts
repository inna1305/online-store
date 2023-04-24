import { IProductData } from "../../../types/IProductData";
import {toggleProduct} from "../../functions/addProductToCart";
import {handleOrderButton} from "../../functions/cart_functions/handleOrderButton";
import getModalForPay from "./cart/modal-for-pay/modal-for-pay";
import {isProductExistsInCart} from "./catalog/updateButtonsText";
import breadCrumbs from './bread-crumbs';


const getProductCard = (product: IProductData): HTMLElement => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', '[]');
  }
  const cart = localStorage.getItem('cart');
  if (!cart) {
    throw new Error('cart didn\'t created');
  }
  const objCart = JSON.parse(cart);



  //модалка
  const darkBackground = document.createElement('div');
  darkBackground.className = 'dark-background';
  darkBackground.id = 'darkBackground';
  document.body.prepend(darkBackground);
  document.body.prepend(getModalForPay());


  const productInfo = document.createElement('div');
  productInfo.className = 'product-info';

  productInfo.append(breadCrumbs(product.name));


  const productCard = document.createElement('section');
  productCard.className = 'product-card';
  productCard.innerHTML = `
   <div class="photo-set">
    <div class="product-card__photos">
        <img src="${product.collection[0]}" alt="first product photo" class="product-card__photo">
        <img src="${product.collection[1]}" alt="second product photo" class="product-card__photo">
        <img src="${product.collection[2]}" alt="third product photo" class="product-card__photo">
    </div>
  </div>`

    const description = document.createElement('div');
  description.className = 'product-card__description';
  description.innerHTML = `
  <div>
    <h2 class="product-card__product-name">${product.name}</h2>
    <p class="product-card__description">${product.description}</p>
    </div>
         <table class="product-card__table">
        <caption>Parameters</caption>
        <tbody>
            <tr>
                <th>Brand</th>
                <td>${product.brand}</td>
            </tr>
            <tr>
                <th>Category</th>
                <td>${product.category}</td>
            </tr>
            <tr>
                <th>Structure</th>
                <td>100% cotton</td>
            </tr>
            <tr>
                <th>Stock</th>
                <td>${product.stock}</td>
            </tr>
        </tbody>
    </table>`
  const options = document.createElement('div');
  options.className = 'product-card__cart-options';
  options.id = `${product.id}`;
  options.setAttribute('data-price', `${product.price}`);

    const price = document.createElement('div');
    price.className = 'product-card__price';
    price.innerText = `${product.price} €`;

    const buyNowButton = document.createElement('button');
  buyNowButton.innerText = 'Buy now';
  buyNowButton.className = 'button_color';
  buyNowButton.id = 'buyNowButton';

  const isExists = isProductExistsInCart(product.id, objCart);


  const addingButton = document.createElement('button');
  addingButton.className = 'button';
  addingButton.innerText = isExists? 'Delete from cart' : 'Add to cart';
  addingButton.id = 'addingButton';


  options.append(price);
  options.append(addingButton);
  options.append(buyNowButton);
  description.append(options);
  productCard.append(description);
  productInfo.append(productCard);

  addingButton.addEventListener('click', toggleProduct);
  buyNowButton.addEventListener('click', handleOrderButton);

  return productInfo;
}

export default getProductCard;
