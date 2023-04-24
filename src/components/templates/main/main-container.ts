import getFilters from "./filters";
import getCatalog from "./catalog/catalog";

const getMainContainer = (): HTMLElement => {
  const mainContainer = document.createElement('div');

  mainContainer.className = 'main-container';

  mainContainer.append(getFilters(), getCatalog());

  return mainContainer;
}

export default getMainContainer;
