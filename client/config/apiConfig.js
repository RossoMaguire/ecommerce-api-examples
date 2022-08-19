const apiConfig = {
  clayer: {
    marketId: '10404',
    baseUrl: 'https://wp-engine-ross.commercelayer.io',
  },
  wp: {
    baseUrl: 'https://testwooshopstg.wpengine.com/wp-json/wp',
  },
  commerceJs: {
    axiosConfig: {
      headers: {
        'X-Chec-Agent': 'commerce.js/v2',
        'Chec-Version': '2021-09-29',
      },
    },
  },
};

export default apiConfig;
