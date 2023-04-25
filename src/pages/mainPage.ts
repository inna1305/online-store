import setDefaultPage from "./pagesFunctions/defaultPage";
import getMainBanner from "../components/templates/main/main-banner";
import getSortContainer from "../components/templates/main/sort-container";
import getMainContainer from "../components/templates/main/main-container";
import clearPage from "./pagesFunctions/clearPage";
import filterCatalog from "../components/functions/filterCatalog";
import getContacts from '../components/templates/main/contacts/contacts';

const getMainPage = () => {
  clearPage();
  setDefaultPage();

  const main = document.querySelector('main') as HTMLElement;

  main.append(getContacts(), getMainBanner(), getSortContainer(), getMainContainer());

  filterCatalog();
}

export default getMainPage;
