import * as cookies from 'js-cookie';
import initCommercelayer from './commerceLayer/init';
import {
  callWpAndCommerceLayerAPIs,
  callWpAndBigCommerceAPIs,
  callWpAndSwellAPIs,
  callWpAndCommerceJsAPIs,
} from './api/unifiers/client';
import { getClientIdCookie } from './utils';
import apiConfig from '../config/apiConfig';

// WP & Commerce Layer Example
if (!getClientIdCookie('clayer')) {
  cookies.remove(`access_token_${apiConfig.clayer.marketId}`);
  document.getElementById('wp-clayer-auth').style.display = 'block';
  document
    .getElementById('wp-clayer-password-button')
    .classList.add('opacity-50', 'cursor-not-allowed');
} else {
  document.getElementById('wp-clayer-auth').style.display = 'none';
}

// The password field
document.addEventListener('input', async function (event) {
  // If the changed element doesn't have the right selector, bail
  if (!event.target.matches('#wp-clayer-password-field')) return;
  if (event.target.value.length > 1) {
    document
      .getElementById('wp-clayer-password-button')
      .classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    document
      .getElementById('wp-clayer-password-button')
      .classList.add('opacity-50', 'cursor-not-allowed');
  }
});

// The load product button
document.addEventListener(
  'click',
  async function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('#wp-clayer-password-button')) return;

    // Toggle the button visibility
    if (document.getElementById('wp-clayer-product').style.display === 'flex') {
      //change the button text
      document.getElementById('wp-clayer-password-button').textContent =
        'Load Product';
      //hide the product box
      document.getElementById('wp-clayer-product').style.display = 'none';
      // remove the data
      document.getElementById('wp-clayer-image').style.backgroundImage = '';
      document.getElementById('wp-clayer-description').innerHTML = '';
      document
        .getElementById('wp-clayer-stock-circle')
        .classList.contains('available')
        ? document
            .getElementById('wp-clayer-stock-circle')
            .classList.remove('available')
        : document
            .getElementById('wp-clayer-stock-circle')
            .classList.remove('out-of-stock');
      document
        .querySelectorAll(
          '#wp-clayer-title, #wp-clayer-price, #wp-clayer-availability'
        )
        .forEach((div) => {
          div.textContent = '';
        });
    } else {
      // init commerce layer
      const cookieValue = document.getElementById(
        'wp-clayer-password-field'
      ).value;
      cookies.set('clayer_client_id', cookieValue, { expires: 1 / 288 }); // 5 mins

      await initCommercelayer(); // will bail if there;s an error

      // hide the form
      document.getElementById('wp-clayer-auth').style.display = 'none';

      // change the button text
      document.getElementById('wp-clayer-password-button').textContent =
        'Hide Product';
      // show the product box
      document.getElementById('wp-clayer-product').style.display = 'flex';

      // call the APIs
      document.getElementById('wp-clayer-loader').style.display = 'block';
      const clayerData = await callWpAndCommerceLayerAPIs();
      document.getElementById('wp-clayer-loader').style.display = 'none';

      // get the WP content
      const clayerWpContent = clayerData[0];
      document.getElementById(
        'wp-clayer-image'
      ).style.backgroundImage = `url('${clayerWpContent[1].acm_fields.image}')`;
      document.getElementById('wp-clayer-title').textContent =
        clayerWpContent[1].acm_fields.name;
      document.getElementById('wp-clayer-description').innerHTML =
        clayerWpContent[1].acm_fields.description;

      // get the Clayer price
      const clayerPrice = clayerData[1];
      document.getElementById('wp-clayer-price').textContent = clayerPrice;

      // get the Clayer stock
      const clayerStock = clayerData[2];
      if (clayerStock > 0) {
        document
          .getElementById('wp-clayer-stock-circle')
          .classList.add('available');
        document.getElementById('wp-clayer-availability').textContent =
          'Available';
      } else {
        document
          .getElementById('wp-clayer-stock-circle')
          .classList.add('out-of-stock');
        document.getElementById('wp-clayer-availability').textContent =
          'Out of stock';
      }
    }
  },
  false
);
///////////////////////////////////////

// WP & BigCommerce Example
// The load product button
document.addEventListener(
  'click',
  async function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('#wp-bigcommerce-password-button')) return;

    // Toggle the button visibility
    if (
      document.getElementById('wp-bigcommerce-product').style.display === 'flex'
    ) {
      //change the button text
      document.getElementById('wp-bigcommerce-password-button').textContent =
        'Load Product';
      //hide the product box
      document.getElementById('wp-bigcommerce-product').style.display = 'none';
      // remove the data
      document.getElementById('wp-bigcommerce-image').style.backgroundImage =
        '';
      document.getElementById('wp-bigcommerce-description').innerHTML = '';
      document
        .getElementById('wp-bigcommerce-stock-circle')
        .classList.contains('available')
        ? document
            .getElementById('wp-bigcommerce-stock-circle')
            .classList.remove('available')
        : document
            .getElementById('wp-bigcommerce-stock-circle')
            .classList.remove('out-of-stock');
      document
        .querySelectorAll(
          '#wp-bigcommerce-title, #wp-bigcommerce-price, #wp-bigcommerce-availability'
        )
        .forEach((div) => {
          div.textContent = '';
        });
    } else {
      // call the APIs
      document.getElementById('wp-bigcommerce-loader').style.display = 'block';
      const bigcommerceData = await callWpAndBigCommerceAPIs();
      document.getElementById('wp-bigcommerce-loader').style.display = 'none';

      // change the button text
      document.getElementById('wp-bigcommerce-password-button').textContent =
        'Hide Product';
      // show the product box
      document.getElementById('wp-bigcommerce-product').style.display = 'flex';

      // get the WP content
      const bigcommerceWpContent = bigcommerceData[0];
      document.getElementById(
        'wp-bigcommerce-image'
      ).style.backgroundImage = `url('${bigcommerceWpContent[0].acm_fields.image}')`;
      document.getElementById('wp-bigcommerce-title').textContent =
        bigcommerceWpContent[0].acm_fields.name;
      document.getElementById('wp-bigcommerce-description').innerHTML =
        bigcommerceWpContent[0].acm_fields.description;

      // get the BigCommerce price
      const bigcommercePrice = bigcommerceData[1][0].price;
      document.getElementById('wp-bigcommerce-price').textContent =
        bigcommercePrice;

      // get the BigCommerce stock
      const bigcommerceStock = bigcommerceData[1][0].availability;
      if (bigcommerceStock === 'available') {
        document
          .getElementById('wp-bigcommerce-stock-circle')
          .classList.add('available');
        document.getElementById('wp-bigcommerce-availability').textContent =
          'Available';
      } else {
        document
          .getElementById('wp-bigcommerce-stock-circle')
          .classList.add('out-of-stock');
        document.getElementById('wp-bigcommerce-availability').textContent =
          'Out of stock';
      }
    }
  },
  false
);
///////////////////////////////////////

// WP & Swell Example
// The load product button
document.addEventListener(
  'click',
  async function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('#wp-swell-password-button')) return;

    // Toggle the button visibility
    if (document.getElementById('wp-swell-product').style.display === 'flex') {
      //change the button text
      document.getElementById('wp-swell-password-button').textContent =
        'Load Product';
      //hide the product box
      document.getElementById('wp-swell-product').style.display = 'none';
      // remove the data
      document.getElementById('wp-swell-image').style.backgroundImage = '';
      document.getElementById('wp-swell-description').innerHTML = '';
      document
        .getElementById('wp-swell-stock-circle')
        .classList.contains('available')
        ? document
            .getElementById('wp-swell-stock-circle')
            .classList.remove('available')
        : document
            .getElementById('wp-swell-stock-circle')
            .classList.remove('out-of-stock');
      document
        .querySelectorAll(
          '#wp-swell-title, #wp-swell-price, #wp-swell-availability'
        )
        .forEach((div) => {
          div.textContent = '';
        });
    } else {
      // call the APIs
      document.getElementById('wp-swell-loader').style.display = 'block';
      const swellData = await callWpAndSwellAPIs();
      document.getElementById('wp-swell-loader').style.display = 'none';

      // change the button text
      document.getElementById('wp-swell-password-button').textContent =
        'Hide Product';
      // show the product box
      document.getElementById('wp-swell-product').style.display = 'flex';

      // get the WP content
      const swellWpContent = swellData[0];
      document.getElementById(
        'wp-swell-image'
      ).style.backgroundImage = `url('${swellWpContent[1].acm_fields.image}')`;
      document.getElementById('wp-swell-title').textContent =
        swellWpContent[1].acm_fields.name;
      document.getElementById('wp-swell-description').innerHTML =
        swellWpContent[1].acm_fields.description;

      if (JSON.stringify(swellData[1]).message !== null) {
        document.getElementById('wp-swell-availability').textContent =
          swellData[1].message;
        document.getElementById('wp-swell-price').textContent =
          swellData[1].message;
      } else {
        // get the Swell price
        const swellPrice = swellData[1].results[0].price;
        document.getElementById('wp-swell-price').textContent = swellPrice;

        // get the Swell stock
        const swellStock = swellData[1].results[0].stock_status;
        if (swellStock === 'out_of_stock') {
          document
            .getElementById('wp-swell-stock-circle')
            .classList.add('out-of-stock');
          document.getElementById('wp-swell-availability').textContent =
            'Out of stock';
        } else {
          document
            .getElementById('wp-swell-stock-circle')
            .classList.add('available');
          document.getElementById('wp-swell-availability').textContent =
            'Available';
        }
      }
    }
  },
  false
);
///////////////////////////////////////

// WP & Commerce JS Example
// The load product button
document.addEventListener(
  'click',
  async function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('#wp-commercejs-password-button')) return;

    // Toggle the button visibility
    if (
      document.getElementById('wp-commercejs-product').style.display === 'flex'
    ) {
      //change the button text
      document.getElementById('wp-commercejs-password-button').textContent =
        'Load Product';
      //hide the product box
      document.getElementById('wp-commercejs-product').style.display = 'none';
      // remove the data
      document.getElementById('wp-commercejs-image').style.backgroundImage = '';
      document.getElementById('wp-commercejs-description').innerHTML = '';
      document
        .getElementById('wp-commercejs-stock-circle')
        .classList.contains('available')
        ? document
            .getElementById('wp-commercejs-stock-circle')
            .classList.remove('available')
        : document
            .getElementById('wp-commercejs-stock-circle')
            .classList.remove('out-of-stock');
      document
        .querySelectorAll(
          '#wp-commercejs-title, #wp-commercejs-price, #wp-commercejs-availability'
        )
        .forEach((div) => {
          div.textContent = '';
        });
    } else {
      // call the APIs
      document.getElementById('wp-commercejs-loader').style.display = 'block';
      const commerceJsData = await callWpAndCommerceJsAPIs();
      console.log(commerceJsData);
      document.getElementById('wp-commercejs-loader').style.display = 'none';

      // change the button text
      document.getElementById('wp-commercejs-password-button').textContent =
        'Hide Product';
      // show the product box
      document.getElementById('wp-commercejs-product').style.display = 'flex';

      // get the WP content
      const commerceJsWpContent = commerceJsData[0];
      document.getElementById(
        'wp-commercejs-image'
      ).style.backgroundImage = `url('${commerceJsWpContent[1].acm_fields.image}')`;
      document.getElementById('wp-commercejs-title').textContent =
        commerceJsWpContent[1].acm_fields.name;
      document.getElementById('wp-commercejs-description').innerHTML =
        commerceJsWpContent[1].acm_fields.description;

      // get the Swell price
      const commerceJsPrice = commerceJsData[1][0].price.formatted_with_symbol;
      document.getElementById('wp-commercejs-price').textContent =
        commerceJsPrice;

      // get the Swell stock
      const commerceJsStock = commerceJsData[1][0].inventory.available;
      if (commerceJsStock === 0) {
        document
          .getElementById('wp-commercejs-stock-circle')
          .classList.add('out-of-stock');
        document.getElementById('wp-commercejs-availability').textContent =
          'Out of stock';
      } else {
        document
          .getElementById('wp-commercejs-stock-circle')
          .classList.add('available');
        document.getElementById('wp-commercejs-availability').textContent =
          'Available';
      }
    }
  },
  false
);
///////////////////////////////////////
