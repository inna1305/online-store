import clearPage from "./pagesFunctions/clearPage";
import setDefaultPage from "./pagesFunctions/defaultPage";
import getCart from "../components/templates/main/cart/cart";
import {handleOrderButton} from "../components/functions/cart_functions/handleOrderButton";
import {handlePromoInput} from "../components/functions/cart_functions/handlePromoInput";

const getCartPage = () => {
  clearPage();
  setDefaultPage();

  const main = document.querySelector('main') as HTMLElement;

  main.append(getCart());
  const orderButton = document.querySelector('#order');
  if (orderButton) {
    orderButton.addEventListener('click', handleOrderButton);
  }
  const promoInput = document.querySelector('.promocode') as HTMLInputElement;
  if (promoInput) {
    promoInput.addEventListener('input', handlePromoInput);
  }
}

export default getCartPage;
