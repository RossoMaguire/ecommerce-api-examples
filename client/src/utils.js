import * as cookies from 'js-cookie';
import apiConfig from '../config/apiConfig';

export const getAccessTokenCookie = (service) => {
  if (service === 'bigcommerce') {
    return cookies.get('access_token_bigcommerce');
  }
  return cookies.get(`access_token_${apiConfig.clayer.marketId}`);
};
export const setAccessTokenCookie = (access_token, expires) => {
  cookies.set(`access_token_${apiConfig.clayer.marketId}`, access_token, {
    expires,
  });
};
export const getClientIdCookie = (service) => {
  return cookies.get(`${service}_client_id`);
};
