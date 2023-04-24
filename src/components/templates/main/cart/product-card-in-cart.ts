import { IProductData } from "../../../../types/IProductData";
import {plusMinusDeleteHandler} from "../../../functions/cart_functions/buttonsHandlers";
import {getArrayFromLS} from "../../../functions/localStorage";
import createElement from '../../../../helpers/createElement';


  function getCountOfProduct(id: number): number {
    const objCart = getArrayFromLS('cart');
    let count = 0;
    for (let i = 0; i < objCart.length; i++) {
      if (objCart[i].id == id) {
        count = objCart[i].count;
      }
      }
    return count;
  }



const getProductCardInCart = (product: IProductData): HTMLElement => {
  const productCardInCart = document.createElement('div');

  productCardInCart.className = 'product';
  productCardInCart.id = `${product.id}`;
  productCardInCart.setAttribute('data-count', `${product.stock}`);
  productCardInCart.setAttribute('data-price', `${product.price}`);



  productCardInCart.innerHTML = `
        <img src="${product.collection[0]}" alt="${product.name}" class="product__photo">
        <div class="product__name">"${product.name}"</div>
        <div class="product__price">${product.price}€</div>`

    const btnGroup = document.createElement('div');
    btnGroup.className = 'product-card__btn-group';
    const plusButton = createElement('button', { class: 'plus-minus-button plus' });
    plusButton.innerText = '+';

  const minusButton = createElement('button', { class: 'plus-minus-button minus' });
  minusButton.innerText = '-';

  btnGroup.append(plusButton, minusButton);

  productCardInCart.insertAdjacentElement('beforeend', btnGroup);

  const counter = createElement('div', { class: 'product__counter counter-number' });
  counter.innerText = `${getCountOfProduct(product.id)}`;
  productCardInCart.append(counter);

  const stock = createElement('div', { class: 'product__counter' });
  stock.innerText = `out of ${product.stock}`;
  productCardInCart.append(stock);

  const deleteButton = createElement('button', { class: 'delete-button' });
  const deleteImg = createElement('img', { alt: 'delete icon', src: '../../../../assets/trash.svg', class: 'delete-icon' });
  deleteButton.append(deleteImg);
  productCardInCart.append(deleteButton);

  plusButton.addEventListener('click', plusMinusDeleteHandler);
  minusButton.addEventListener('click', plusMinusDeleteHandler);
  deleteButton.addEventListener('click', plusMinusDeleteHandler);

  return productCardInCart;
}

export default getProductCardInCart;
