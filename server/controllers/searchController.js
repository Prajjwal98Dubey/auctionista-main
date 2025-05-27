import { redisClient } from "../redisClient.js";
import { searchProducts, searchUsers } from "../search/getSearch.js";

export const getSearchItems = async (req, res) => {
  const content = req.query.content;
  let result = [];
  try {
    const isPresentInCache = await redisClient.get(`search:${content}`);
    if (isPresentInCache) {
      return res.json({ result: JSON.parse(isPresentInCache) }).status(200);
    }
    let products = await searchProducts(content);
    let users = await searchUsers(content);
    products.forEach((prod) => {
      result.push({
        product_title: prod._source.product_title,
        product_id: prod._source.product_id,
        item_category: "product",
      });
    });
    users.forEach((user) => {
      result.push({
        user_name: user._source.user_name,
        user_id: user._source.user_id,
        item_category: "people",
      });
    });
    await redisClient.set("foo", JSON.stringify(result));
    await redisClient.set(`search:${content}`, JSON.stringify(result));
    return res.json({ result }).status(200);
  } catch (error) {
    console.log(error);
  }
};
