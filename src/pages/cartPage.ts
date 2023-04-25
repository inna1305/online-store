import clearPage from "./pagesFunctions/clearPage";
import setDefaultPage from "./pagesFunctions/defaultPage";
import getCart from "../components/templates/main/cart/cart";

const getCartPage = () => {
  clearPage();
  setDefaultPage();

  const main = document.querySelector('main') as HTMLElement;

  main.append(getCart());
}

export default getCartPage;
