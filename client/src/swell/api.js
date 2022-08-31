export async function getSwellData() {
  try {
    let res = await fetch(`${process.env.BACKEND_API_BASE_URL}/swell`);
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
}
