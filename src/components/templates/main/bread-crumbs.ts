import createElement from '../../../helpers/createElement';
import router from '../../router/router';

const getBreadCrumbs = (finalPoint: string): HTMLElement => {
  const container = createElement('div', { class: 'path-to-section' });

  const back = createElement('span', { class: 'path-to-section__item', id: 'back' });
  back.innerText = 'Back';
  back.addEventListener('click', () => {
    router.back();
  });

  const arrow = createElement('span', { class: 'arrow' });
  arrow.innerText = '→';
  const arrow2 = createElement('span', { class: 'arrow' });
  arrow2.innerText = '→';

  const main = createElement('span', { class: 'path-to-section__item' });
  main.innerText = 'Main';
  main.addEventListener('click', () => {
    router.navigateTo('/');
  });

  const final = createElement('span', { class: 'path-to-section__item' });
  final.innerText = finalPoint;

  container.append(back, arrow, main, arrow2, final);

  return container;
}
export default getBreadCrumbs;
