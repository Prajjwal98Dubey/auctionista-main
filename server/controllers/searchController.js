import { redisClient } from "../redisClient.js";
import { searchProducts, searchUsers } from "../search/getSearch.js";

export const getSearchItems = async (req, res) => {
  const content = req.query.content;
  let prodResult = [];
  let userResult = [];
  try {
    const isPresentInCache = await redisClient.get(`search:${content}`);
    if (isPresentInCache) {
      return res.json({ result: JSON.parse(isPresentInCache) }).status(200);
    }
    let products = await searchProducts(content);
    let users = await searchUsers(content);
    products.forEach((prod) => {
      prodResult.push({
        product_title: prod._source.product_title,
        product_id: prod._source.product_id,
        item_category: "product",
      });
    });
    users.forEach((user) => {
      userResult.push({
        user_name: user._source.user_name,
        user_id: user._source.user_id,
        item_category: "people",
      });
    });
    if (users.length)
      await redisClient.set(
        `search:user:${content}`,
        JSON.stringify(userResult)
      );
    if (products.length)
      await redisClient.set(
        `search:product:${content}`,
        JSON.stringify(prodResult)
      );
    return res.json({ result: [...userResult, ...prodResult] }).status(200);
  } catch (error) {
    console.log(error);
  }
};
