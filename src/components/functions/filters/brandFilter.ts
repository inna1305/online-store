import { IProductData } from "../../../types/IProductData";
import { productData } from "../../../base/product-data";
import convertNameToPath from "./convertNameToPath";
import nothingFound from "./nothingFound";

const brandFilter = () => {
  const filterableData: IProductData[] = productData;
  const productCatalog = document.querySelector('.catalog') as HTMLElement;
  const fullCatalog = document.querySelectorAll('.catalog-card');
  const output: Element[] = [];
  let capturedLength = 0;

  const brands: NodeListOf<HTMLInputElement> = document.querySelectorAll('.brand-filter');

  brands.forEach((brand: HTMLInputElement) => {
    brand.addEventListener('change', () => {
      const brandFiltered = filterableData.filter(element => element.brand === brand.name);
      const filteredIds = brandFiltered.map(element => `${element.id}`);
      const catalog = document.querySelectorAll('.catalog-card');
      const catalogQueue = Array.from(catalog);

      while (productCatalog.firstChild) {
        productCatalog.removeChild(productCatalog.firstChild);
      }

      if (brand.checked === true) {
        if (output.length === 0) {
          catalogQueue.forEach(element => {
            if (filteredIds.includes(element.id)) {
              output.push(element)
              output.forEach(node => productCatalog.append(node))
              capturedLength = output.length
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
        history.pushState(null, '', `${window.location.search}/?brand=${brand.name.toLowerCase()}`)
      }
      else if (brand.checked === false) {
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
        const brandUnselected = convertNameToPath(`/?brand=${brand.name.toLowerCase()}`)
        const re = new RegExp(brandUnselected, 'g')
        const replaceable = `${window.location.search}`.replace(re, '').slice(0, -2)
        history.replaceState(null, '', `${window.location.pathname}`);
        history.pushState(null, '', replaceable);
      }
    })
  })
}
export default brandFilter;
