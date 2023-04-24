import {IPromoCode} from "../../../types/IPromoCode";
import {getArrayFromLS} from "../localStorage";
import {promocodeData} from "../../../base/promocode-data";
import {updatePrevSum, updateSumWithPromo} from "../../templates/header/updateSum";
import {updateCounterInTotal} from "../../templates/header/updateCount";

export function handlePromoInput(event: Event) {
  const promoInput = event.target as HTMLInputElement;

  const containerPromo = document.querySelector('.total__promo-container');
  const promoData: IPromoCode[] = promocodeData;
  const promoArr: IPromoCode[] = getArrayFromLS('promocodes');
  const matchedInDataItem = getMatchedItem(promoInput.value, promoData);
  const matchedInLSItem = getMatchedItem(promoInput.value, promoArr);
  const error = document.querySelector(".promo-error") as HTMLElement;
  error.style.visibility = matchedInLSItem ? 'visible' : 'hidden';


  if (matchedInDataItem && containerPromo && !matchedInLSItem) {
      containerPromo.append(setPromoElement(matchedInDataItem.promoword));
      promoArr.push(matchedInDataItem);
      localStorage.setItem('promocodes', JSON.stringify(promoArr));
      promoInput.value = "";
      updateSumWithPromo();
      updatePrevSum();
      updateCounterInTotal();
  }
}


 export function getMatchedItem(promoword: string, array: IPromoCode[]): IPromoCode | null {
    let item = null;
    for (let i = 0; i < array.length; i++) {
      if (array[i].promoword === promoword) {
        item = array[i];
      }
    }
    return item;
  }


export function setPromoElement(promoname: string): HTMLElement {
  const promo = document.createElement('div');

  promo.className = 'total__promo-word';

  const crossButtonInput = document.createElement('img');
  crossButtonInput.src = '../../../assets/cross.svg';
  crossButtonInput.width = 30;
  crossButtonInput.alt = 'cross button';

  const word = document.createElement('span');
  word.innerHTML = promoname;

  promo.setAttribute('data-promoname', `${word.textContent}`);

  promo.append(word, crossButtonInput);
  crossButtonInput.addEventListener('click', deletePromo);

  return promo;
}

function deletePromo(event: Event) {
  const target = event.target as HTMLElement;
  const promocodes: IPromoCode[] = getArrayFromLS('promocodes');
  for (let i = 0; i < promocodes.length; i++) {
    if (target.parentElement && promocodes[i].promoword === target.parentElement.getAttribute('data-promoname')) {
      promocodes.splice(i,1);
      localStorage.setItem('promocodes', JSON.stringify(promocodes));
      target.parentElement.remove();
      updateSumWithPromo();
      updateCounterInTotal();
      updatePrevSum();
    }
  }
}
