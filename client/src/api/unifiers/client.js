import { getWordPressData } from '../../wordpress/api';
import {
  getCommerceLayerPrice,
  getCommerceLayerStock,
} from '../../commerceLayer/api';
import { getBigCommerceData } from '../../bigCommerce/api';
import { getSwellData } from '../../swell/api';
import { getCommerceJsData } from '../../commerceJs/api';

/**
 * Calls all the endpoints for the WordPress & Commerce Layer Example
 * Returns an array of data responses from each API
 */
export function callWpAndCommerceLayerAPIs() {
  return Promise.all([
    getWordPressData(),
    getCommerceLayerPrice(),
    getCommerceLayerStock(),
  ]).then((data) => {
    return data;
  });
}

/**
 * Calls all the endpoints for the WordPress & Big Commerce Example
 * Returns an array of data responses from each API
 */
export function callWpAndBigCommerceAPIs() {
  return Promise.all([getWordPressData(), getBigCommerceData()]).then(
    (data) => {
      return data;
    }
  );
}

/**
 * Calls all the endpoints for the WordPress & Swell Example
 * Returns an array of data responses from each API
 */
export function callWpAndSwellAPIs() {
  return Promise.all([getWordPressData(), getSwellData()]).then((data) => {
    return data;
  });
}

/**
 * Calls all the endpoints for the WordPress & Commerce JS Example
 * Returns an array of data responses from each API
 */
export function callWpAndCommerceJsAPIs() {
  return Promise.all([getWordPressData(), getCommerceJsData()]).then((data) => {
    return data;
  });
}
