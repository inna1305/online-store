import { IProductData } from "../../../../types/IProductData";
import {productData} from "../../../product-data";
import getProductCardInCart from "./product-card-in-cart";
import getModalForPay from "./modal-for-pay/modal-for-pay";
import {getArrayFromLS} from "../../../functions/localStorage";
import {IPromoCode} from "../../../../types/IPromoCode";
import {setPromoElement} from "../../../functions/cart_functions/handlePromoInput";
import {getCartSum, applyPromoToSum} from "../../header/updateSum";
import {getTotalCount} from "../../header/updateCount";
import getBreadCrumbs from '../bread-crumbs';
import createElement from '../../../../helpers/createElement';

const getCart = (): HTMLElement => {
  const productsInCartPage: IProductData[] = [];
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', '[]');
  }
  const storageCart = localStorage.getItem('cart');
  const objCart = JSON.parse(storageCart!);

  for (let i = 0; i < objCart.length; i++) {
    productsInCartPage.push(productData[objCart[i].id - 1]);
  }

  const promocodes = getArrayFromLS('promocodes');


  const cart = createElement('section', { class: 'cart-container' });

  //фон для модалки
  const darkBackground = document.createElement('div');
  darkBackground.className = 'dark-background';
  darkBackground.id = 'darkBackground';
  document.body.prepend(darkBackground);
  document.body.prepend(getModalForPay());


  cart.append(getBreadCrumbs('Cart'));


  const title = createElement('h2', { class: 'title' });
  title.innerHTML = 'My Cart';
  cart.append(title);


  //карточки добавленных в корзину товаров
  const productsAndTotal = document.createElement('div');
  productsAndTotal.className = 'products-total-container';

  const products = document.createElement('div');
  products.className = 'products';
  productsInCartPage.forEach(element => {
    products.append(getProductCardInCart(element))
    });
  productsAndTotal.append(products);


  //сумма заказа, скидки, промокоды
  const total = document.createElement('div');
  total.className = 'total';

  const table = document.createElement('table');
  table.classList.add('total__counting');
  const tbody = document.createElement('tbody');

  const rowProduct = document.createElement('tr');
  const rowProductHead = document.createElement('th');
  rowProductHead.innerText = 'Product(s), item(s)';

  const rowProductData = document.createElement('td');
  rowProductData.classList.add('total__sum-without-discount');

  const pcs = document.createElement('span');
  const sum = document.createElement('span');
  pcs.innerText = `${getTotalCount()} pc(s),`;
  pcs.id = 'pcs';
  sum.innerText = `${getCartSum()}€`;
  sum.id = 'prevSum';
  rowProductData.append(pcs, sum);

  rowProduct.append(rowProductHead, rowProductData);

  const rowPromo = document.createElement('tr');

  const rowPromoHead = document.createElement('th');
  rowPromoHead.innerText = 'Promo code';

  const rowPromoData = document.createElement('td');
  rowPromoData.insertAdjacentHTML('beforeend', `<input type="text" name="promo-code" class="promocode"/>`);
  rowPromo.append(rowPromoHead, rowPromoData);

  const rowApplied = document.createElement('tr');
  rowApplied.insertAdjacentHTML('afterbegin', '<th>Applied:</th>');


  const totalPromoContainer = document.createElement('div');
  totalPromoContainer.classList.add('total__promo-container');

  totalPromoContainer.innerHTML = `<span class="promo-error">already applied</span>`;

  const tdForTotal = document.createElement('td');
  tdForTotal.insertAdjacentElement("beforeend", totalPromoContainer);
  rowApplied.append(tdForTotal);


  const promosInLocalStorage: IPromoCode[] = getArrayFromLS('promocodes');
  if (getTotalCount() > 0) {
    promosInLocalStorage.forEach(elem => {
      totalPromoContainer.append(setPromoElement(elem.promoword));
    });
  }

    tbody.append(rowProduct, rowPromo, rowApplied);

    const tfoot = document.createElement('tfoot');
    tfoot.classList.add('total__sum');

    const rowTotal = document.createElement('tr');

    const rowTotalHead = document.createElement('th');
    rowTotalHead.innerText = 'Total to pay';

    const rowTotalData = document.createElement('td');
    rowTotalData.id = 'totalToPay';

    const oldSum = document.createElement('div');
    oldSum.innerText = `${getCartSum()}€`;

  if (promocodes.length > 0) {
    oldSum.classList.add('old-sum');
    rowTotalData.append(oldSum);
    rowTotalData.insertAdjacentHTML('beforeend', `<div>${applyPromoToSum(getCartSum())}€</div>`);
  } else {
    oldSum.classList.remove('old-sum');
  }
  rowTotalData.append(oldSum);


    rowTotal.append(rowTotalHead, rowTotalData);

    tfoot.append(rowTotal);
  table.append(tbody, tfoot);


  //кнопка заказа
  const orderButton = document.createElement('button');
  orderButton.id = 'order';
  orderButton.className = 'button_color';
  orderButton.innerHTML = 'place order';
  total.append(table);
  total.append(orderButton);
  productsAndTotal.append(total);
  cart.append(productsAndTotal);

  return cart;
}

export default getCart;
