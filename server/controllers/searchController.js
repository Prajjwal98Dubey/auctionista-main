import { searchProducts, searchUsers } from "../search/getSearch.js";

export const getSearchItems = async (req, res) => {
  const content = req.query.content;
  let result = [];
  try {
    let products = await searchProducts(content);
    let users = await searchUsers(content);
    products.forEach((prod) => {
      result.push({
        product_title: prod._source.product_title,
        item_category: "product",
      });
    });
    users.forEach((user) => {
      result.push({
        user_name: user._source.user_name,
        item_category: "people",
      });
    });
    return res.json({ result }).status(200);
  } catch (error) {
    console.log(error);
  }
};
