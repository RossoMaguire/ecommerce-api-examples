import apiConfig from '../../config/apiConfig';

export async function getWordPressData() {
  try {
    let res = await fetch(`${apiConfig.wp.baseUrl}/v2/products`);
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
