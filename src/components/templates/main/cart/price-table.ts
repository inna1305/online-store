import createElement from '../../../../helpers/createElement';
import {getTotalCount} from '../../header/updateCount';
import {applyPromoToSum, getCartSum} from '../../header/updateSum';
import {handlePromoInput, setPromoElement} from '../../../functions/cart_functions/handlePromoInput';
import {IPromoCode} from '../../../../types/IPromoCode';
import {getArrayFromLS} from '../../../functions/localStorage';
import {handleOrderButton} from '../../../functions/cart_functions/handleOrderButton';

const getPriceTable = (): HTMLElement => {
  const total = createElement('div', { class: 'total' });
  const table = createElement('table', { class: 'total__counting' });
  const tbody = document.createElement('tbody');

  const rowProduct = document.createElement('tr');
  const rowProductHead = document.createElement('th');
  rowProductHead.innerText = 'Product(s), item(s)';

  const rowProductData = createElement('td', { class: 'total__sum-without-discount' });

  const pcs = createElement('span', { id: 'pcs' });
  pcs.innerText = `${getTotalCount()} pc(s),`;

  const sum = createElement('span', { id: 'prevSum' });
  sum.innerText = `${getCartSum()}€`;

  rowProductData.append(pcs, sum);

  rowProduct.append(rowProductHead, rowProductData);

  const rowPromo = document.createElement('tr');

  const rowPromoHead = document.createElement('th');
  rowPromoHead.innerText = 'Promo code';

  const rowPromoData = document.createElement('td');
  const promoInput = createElement('input', { type: 'text', name: 'promo-code', class: 'promocode' });
  promoInput.addEventListener('input', handlePromoInput);
  rowPromoData.insertAdjacentElement('beforeend', promoInput);

  rowPromo.append(rowPromoHead, rowPromoData);

  const rowApplied = document.createElement('tr');
  rowApplied.insertAdjacentHTML('afterbegin', '<th>Applied:</th>');


  const totalPromoContainer = createElement('div', { class: 'total__promo-container' });
  totalPromoContainer.innerHTML = `<span class="promo-error">already applied</span>`;

  const tdForTotal = document.createElement('td');
  tdForTotal.insertAdjacentElement("beforeend", totalPromoContainer);
  rowApplied.append(tdForTotal);

  const promosInLocalStorage: IPromoCode[] = getArrayFromLS('promocodes');
  if (getTotalCount() > 0) {
    promosInLocalStorage.forEach(elem => {
      totalPromoContainer.append(setPromoElement(elem.promoword));
    });
  }

  tbody.append(rowProduct, rowPromo, rowApplied);

  const tfoot = document.createElement('tfoot');
  tfoot.classList.add('total__sum');

  const rowTotal = document.createElement('tr');

  const rowTotalHead = document.createElement('th');
  rowTotalHead.innerText = 'Total to pay';

  const rowTotalData = document.createElement('td');
  rowTotalData.id = 'totalToPay';

  const oldSum = document.createElement('div');
  oldSum.innerText = `${getCartSum()}€`;


  if (promosInLocalStorage.length > 0) {
    oldSum.classList.add('old-sum');
    rowTotalData.append(oldSum);
    rowTotalData.insertAdjacentHTML('beforeend', `<div>${applyPromoToSum(getCartSum())}€</div>`);
  } else {
    oldSum.classList.remove('old-sum');
  }
  rowTotalData.append(oldSum);


  rowTotal.append(rowTotalHead, rowTotalData);

  tfoot.append(rowTotal);
  table.append(tbody, tfoot);

  //кнопка заказа
  const orderButton = createElement('button', { class: 'button_color', id: 'order' });
  orderButton.innerText = 'place order';
  orderButton.addEventListener('click', () => {
    orderButton.addEventListener('click', handleOrderButton);
  });
  total.append(table);
  total.append(orderButton);
  return total;
}
export default getPriceTable;
