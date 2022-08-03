import { Price, StockItem } from '@commercelayer/js-sdk';

export async function getCommerceLayerPrice() {
  let price = await Price.all();
  price = price.__collection[1].formattedAmount;
  return price;
}

export async function getCommerceLayerStock() {
  let stock = await StockItem.all();
  stock = stock.__collection[1].quantity;
  return stock;
}
