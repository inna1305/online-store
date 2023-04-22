import clearPage from "./pagesFunctions/clearPage"
import setDefaultPage from "./pagesFunctions/defaultPage";
import getProductCard from "../components/templates/main/product-card";
import { productData } from "../components/product-data";
import {getMainNavigate, goBack} from "../components/router/router";

const getProductPage = (id: number) => {
  window.scroll(0, 0)
  clearPage();
  setDefaultPage();

  const product = productData[id - 1];

  const main = document.querySelector('main') as HTMLElement;

  main.append(getProductCard(product))

  goBack();
  getMainNavigate();
}
export default getProductPage
