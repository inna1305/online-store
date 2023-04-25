import { IProductData } from "../../../../types/IProductData";
import {productData} from "../../../../base/product-data";
import getProductCardInCart from "./product-card-in-cart";
import getModalForPay from "./modal-for-pay/modal-for-pay";
import getBreadCrumbs from '../bread-crumbs';
import createElement from '../../../../helpers/createElement';
import getPriceTable from './price-table';

const getCart = (): HTMLElement => {
  const cart = createElement('section', { class: 'cart-container' });

  const productsInCartPage: IProductData[] = [];
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', '[]');
  }
  const storageCart2 = localStorage.getItem('cart');
  const objCart = JSON.parse(storageCart2!);

  for (let i = 0; i < objCart.length; i++) {
    productsInCartPage.push(productData[objCart[i].id - 1]);
  }

  //фон для модалки
  const darkBackground = createElement('div', { class: 'dark-background', id: 'darkBackground' });
  document.body.prepend(darkBackground, getModalForPay());

  const title = createElement('h2', { class: 'title' });
  title.innerHTML = 'My Cart';

  cart.append(getBreadCrumbs('Cart'), title);

  //карточки добавленных в корзину товаров
  const productsAndTotal = createElement('div', { class: 'products-total-container' });

  const products = createElement('div', { class: 'products' });
  productsInCartPage.forEach(element => {
    products.append(getProductCardInCart(element))
    });
  productsAndTotal.append(products);

  productsAndTotal.append(getPriceTable());
  cart.append(productsAndTotal);

  return cart;
}

export default getCart;
