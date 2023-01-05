import {productData} from "../../product-data";
import router from "../../router/router";
import {toggleProduct} from "../../functions/addProductToCart";
import {ICartProductRecord} from "../../../types/types";

function isProductExistsInCart(id: number, objCart: ICartProductRecord[]): boolean {
  for (let i = 0; i < objCart.length; i++) {
    if (objCart[i].id == id) {
      return true;
    }
  }
  return false;
}

const getCatalog = (): HTMLElement => {
  const catalog = document.createElement('section');

  catalog.className = 'catalog';

  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', '[]');
  }
  const cart = localStorage.getItem('cart');
  if (!cart) {
    throw new Error('cart didn\'t created');
  }
  const objCart = JSON.parse(cart);

  // TODO: filterable copy of productData
  // TODO: move catalog.ts from templates?

  productData.forEach(element => {
    const container = document.createElement('div');
    container.id = `${element.id}`;
    container.className = 'container';
    container.className = 'catalog-card';
    container.innerHTML = `
        <img src="${element.photo}" alt="${element.name}" class="catalog-card__photo">
        <div class="catalog-card__name">${element.name}</div>
        <div class="catalog-card__price">${element.price} €</div>`;

    const isExists = isProductExistsInCart(element.id, objCart);

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'button';
    addToCartButton.innerText = isExists? 'Delete from cart' : 'Add to cart';
    addToCartButton.id = 'buttonFromCatalog' + `${element.id}`;
    container.insertAdjacentElement('beforeend', addToCartButton);
    container.insertAdjacentHTML('beforeend', '</div>');

    catalog.append(container);

    addToCartButton.addEventListener('click', toggleProduct);
    container.onclick = (): void => {
      router.navigateTo(`/catalog/${element.id}`)
    }
  })

  return catalog;
}

export default getCatalog;
