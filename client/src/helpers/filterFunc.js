import { auctionDateTag } from "./dateFormatter";

export const filterByTag = (options, products) => {
  const { tag } = options;
  return products.filter(
    (prod) =>
      auctionDateTag(prod.bid_start_time).tag.toLowerCase() == tag.toLowerCase()
  );
};

export const filterByRecentlyAdded = (products) => {
  // considering product added within a month
  let currTime = Date.now();
  return products.filter(
    (prod) =>
      (currTime - new Date(prod.createdAt).getTime()) /
        (24 * 60 * 60 * 30 * 1000) <=
      1
  );
};

export const filterByLowToHighPrice = (products) => {
  let filteredProducts = products.sort(
    (a, b) => parseInt(a.product_set_price) - parseInt(b.product_set_price)
  );
  return filteredProducts;
};
