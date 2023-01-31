import Commerce from '@chec/commerce.js';
import apiConfig from '../../config/apiConfig';

const commerceJs = new Commerce(
  process.env.COMMERCE_JS_PUBLIC_KEY,
  false,
  apiConfig.commerceJs
);

export async function getCommerceJsData() {
  return commerceJs.products
    .list()
    .then((products) => {
      return products.data;
    })
    .catch((error) => {
      console.log('There was an error fetching the products', error);
      return error;
    });
}
