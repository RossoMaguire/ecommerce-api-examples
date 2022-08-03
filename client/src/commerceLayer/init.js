import { getSalesChannelToken } from '@commercelayer/js-auth';
import { initCLayer } from '@commercelayer/js-sdk';
import apiConfig from '../../config/apiConfig';
import {
  getAccessTokenCookie,
  setAccessTokenCookie,
  getClientIdCookie,
} from '../utils';

const init = async () => {
  let auth = {};
  if (!getAccessTokenCookie()) {
    auth = await getSalesChannelToken({
      clientId: getClientIdCookie('clayer'),
      endpoint: apiConfig.clayer.baseUrl,
      scope: `market:${apiConfig.clayer.marketId}`,
    });
    setAccessTokenCookie(auth.accessToken, auth.expires);
  } else {
    auth.accessToken = getAccessTokenCookie();
  }

  initCLayer({
    accessToken: auth.accessToken,
    endpoint: apiConfig.clayer.baseUrl,
  });
};
async function initCommercelayer() {
  window.commercelayer = {
    init,
  };
  await init();
}

export default initCommercelayer;
