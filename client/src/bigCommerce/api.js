export async function getBigCommerceData() {
  try {
    let res = await fetch(`${process.env.BACKEND_API_BASE_URL}/bigcommerce`);
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
