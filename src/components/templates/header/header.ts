import router from "../../router/router";
import {getCartSum} from "./updateSum";
import {getTotalCount} from "./updateCount";
import createElement from '../../../helpers/createElement';

const getHeader = (): HTMLElement => {
  const background = createElement('div', { class: 'header-background' });

  const headerContainer = createElement('div', { class: 'content-container' });

  const logo = createElement('h1', { class: 'logo' });
  logo.innerText = 'Hobby Art';
  logo.addEventListener('click', () => router.navigateTo('/'));

  const headerElements = createElement('div', { class: 'header-elements' });

  const button = createElement('button', { class: 'button cart-button', type: 'button', id: 'cartButton' });
  button.innerText = getCartSum() > 0 ? `${getCartSum()}` : 'Cart';

  const counter = createElement('span', { class: 'cart-counter', id: 'cartCounter' });
  counter.innerText = `${getTotalCount()}`;

  headerElements.append(logo, button, counter);
  headerContainer.append(headerElements);
  background.append(headerContainer);


  if (button) {
    button.onclick = (): void => {
      router.navigateTo('/cart')
    }
  }

return background;
}

export default getHeader;
