import Router from 'vanilla-router';
import getMainPage from '../../pages/mainPage';
import { productData } from '../product-data';
import getProductPage from '../../pages/productPage';
import getCartPage from '../../pages/cartPage';

const router = new Router({
  mode: 'history',
  root: '/',
  page404: function (path) {
    alert('/' + path + ' Page not found');
  },
})
export default router;


router.add(router.root, getMainPage)
productData.forEach(product => {
  router.add(`/catalog/${product.id}`, () => {
    getProductPage(product.id)
  })
})
router.add('/cart', getCartPage)
