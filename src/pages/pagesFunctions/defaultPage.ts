import getHeader from "../../components/templates/header/header";
import getFooter from "../../components/templates/footer/footer";

const setDefaultPage = (): HTMLElement => {
  const body = document.querySelector('body') as HTMLElement;

  const header = document.createElement('header');
  const main = document.createElement('main');

  header.append(getHeader());

  body.append(header, main, getFooter());

  return body;
}

export default setDefaultPage;
