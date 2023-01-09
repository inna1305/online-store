//функции для работы с продуктом из страницы корзины
import {ICartProductRecord} from "../../../types/ICartProductRecord";
import {updateCartCounter} from "../../templates/header/updateCount";
import {updateSum} from "../../templates/header/updateSum";
import {getArrayFromLS} from "../localStorage";

function getProductFromEvent(event: Event): HTMLElement {
  const button = event.target as HTMLElement;
  if (!button) {
    throw new Error('button is not found');
  }
  if (!(button.parentElement) || !(button.parentElement.parentElement)) {
    throw new Error('card is not found');
  }
  const product = button.parentElement.parentElement;
  if (!product.id) {
    throw new Error('id card is not found');
  }
  return product;
}


export function plusMinusDeleteHandler(event: Event) {
  const product = getProductFromEvent(event);
  const idCard = product.id;
  const stock = Number(product.getAttribute('data-count'));
  if (!stock) {
    throw new Error('stock is not found');
  }

  let counter: HTMLElement | null = null;
  const productElements = product.children;
  for (const child of productElements) {
    if (child.classList.contains('counter-number')) {
      counter = child as HTMLElement;
      break;
    }
  }
  if (!counter) {
    throw new Error('counter is not found!');
  }

  let cartProductRecord: ICartProductRecord;
  const target = event.target as HTMLElement;

  const objCart = getArrayFromLS('cart');
  for (let i = 0; i < objCart.length; i++) {
    if (objCart[i].id == idCard) {
      cartProductRecord = objCart[i];
      if (target.classList.contains('plus') && stock > cartProductRecord.count) {
        cartProductRecord.count = cartProductRecord.count + 1;
        counter.innerText = `${cartProductRecord.count}`;
      }
      else if (target.classList.contains('minus') && cartProductRecord.count > 1) {
        cartProductRecord.count = cartProductRecord.count - 1;
        counter.innerText = `${cartProductRecord.count}`;
      }
      else if (cartProductRecord.count === 1) {
        objCart.splice(i, 1);

        if (product.parentElement) {
          product.parentElement.removeChild(product);
        }
      }
      else if (target.parentElement && target.parentElement.classList.contains('delete-button')) {
        objCart.splice(i, 1);

        if (product.parentElement) {
          product.parentElement.removeChild(product);
        }
      }
      localStorage.setItem('cart', JSON.stringify(objCart));
      updateCartCounter();
      updateSum();
      updateSumWithPromo();

      break;
    }
  }
}
