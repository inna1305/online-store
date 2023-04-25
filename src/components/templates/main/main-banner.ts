import createElement from '../../../helpers/createElement';

const getMainBanner = (): HTMLElement => {
  const mainBanner = createElement('article', { class: 'main-banner' });

const decor1 = createElement('img', { src: 'assets/oval1.svg', alt: 'decor', class: 'main-banner__decor1' });
const bannerPicture = createElement('img', { src: 'assets/yarn-macrame.png', alt: 'three yarn moths', class: 'main-banner__pic' });
const description = createElement('div', { class: 'main-banner__description' });
const descTitle = createElement('h2', { class: 'main-banner__product-name' });
descTitle.innerText = 'Yarn Macrametr';
const descriptionText = createElement('p', { class: 'main-banner__text' });
descriptionText.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n' +
  'incididunt ut\n' +
  'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
  'aliquip ex ea\n' +
  'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\n' +
  'pariatur.\n' +
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est\n' +
  'laborum.';

  const button = createElement('button', { class: 'button_color' });
  button.innerText = 'View all';
  button.onclick = () => {
    window.scroll(0, 800)
  }

  const decor2 = createElement('img', { src: 'assets/oval2.svg', alt: 'decor', class: 'main-banner__decor2' });
  description.append(descTitle, descriptionText, button, decor2);
  mainBanner.append(decor1, bannerPicture, description);

  return mainBanner;
}

export default getMainBanner;
