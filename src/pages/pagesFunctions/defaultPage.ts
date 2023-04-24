import getHeader from "../../components/templates/header/header";
import getFooter from "../../components/templates/footer/footer";

const setDefaultPage = (): HTMLElement => {
  const body = document.querySelector('body') as HTMLElement;

  const main = document.createElement('main');

  body.append(getHeader(), main, getFooter());

  return body;
}

export default setDefaultPage;
