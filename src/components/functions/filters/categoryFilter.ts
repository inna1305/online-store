import { IProductData } from "../../../types/IProductData";
import { productData } from "../../../base/product-data";
import convertNameToPath from "./convertNameToPath";
import nothingFound from "./nothingFound";

const categoryFilter = () => {
  const filterableData: IProductData[] = productData;
  const productCatalog = document.querySelector('.catalog') as HTMLElement;
  const fullCatalog = document.querySelectorAll('.catalog-card');
  const output: Element[] = [];
  let capturedLength = 0;

  const categories: NodeListOf<HTMLInputElement> = document.querySelectorAll('.category-filter');

  categories.forEach((category: HTMLInputElement) => {
    category.addEventListener('change', () => {
      const categoryFiltered = filterableData.filter(element => element.category === category.name);
      const filteredIds = categoryFiltered.map(element => `${element.id}`);
      const catalog = document.querySelectorAll('.catalog-card');
      const catalogQueue = Array.from(catalog);

      while (productCatalog.firstChild) {
        productCatalog.removeChild(productCatalog.firstChild);
      }

      if (category.checked === true) {
        if (output.length === 0) {
          catalogQueue.forEach(element => {
            if (filteredIds.includes(element.id)) {
              capturedLength = catalogQueue.length;
              output.push(element)
              output.forEach(node => productCatalog.append(node))
            }
          })
        } else {
          filteredIds.forEach(id => {
            output.push(fullCatalog[Number(id) - 1])
            output.forEach(node => productCatalog.append(node))
            capturedLength = output.length
          })
        }
        if (productCatalog.childNodes.length === 0) {
          nothingFound();
        }
        history.pushState(null, '', `${window.location.search}/?category=${category.name.toLowerCase()}`)
      }
      else if (category.checked === false) {
        output.forEach(element => {
          if (filteredIds.includes(element.id)) {
            output.splice(output.indexOf(element), filteredIds.length)
            output.forEach(node => productCatalog.append(node))
            capturedLength = output.length
          }
        })
        if (capturedLength === 0) {
          fullCatalog.forEach(node => {
            productCatalog.append(node)
          })
        } else {
          output.forEach(node => {
            productCatalog.append(node)
          })
        }
        const categoryUnselected = convertNameToPath(`/?category=${category.name.toLowerCase()}`);
        const re = new RegExp(categoryUnselected, 'g');
        const replaceable = `${window.location.search}`.replace(re, '').slice(0, -2);
        history.replaceState(null, '', `${window.location.pathname}`);
        history.pushState(null, '', replaceable);
      }
    })
  })
}
export default categoryFilter;
