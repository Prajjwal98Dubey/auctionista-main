import auctionPool from "../db/connectDB.js";

export const addProductsToWatchList = async (req, res) => {
  const { prodId } = req.body;
  const userId = req.user;
  try {
    await auctionPool.query(
      "INSERT INTO USER_WATCHLIST (user_id,product_id) VALUES ($1,$2)",
      [userId, prodId]
    );
    return res.json({ message: "product added to watchlist." }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const removeProductsFromWatchList = async (req, res) => {
  const prodId = req.query.prodId;
  const userId = req.user;
  try {
    await auctionPool.query(
      "DELETE FROM USER_WATCHLIST WHERE USER_ID = $1 AND PRODUCT_ID = $2",
      [userId, prodId]
    );
    return res.json({ message: "product removed from watchlist." }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const getAllWatchListProducts = async (req, res) => {
  const userId = req.user;
  try {
    const watchListItems = await auctionPool.query(
      "SELECT * FROM USER_WATCHLIST WHERE USER_ID = $1",
      [userId]
    );
    if (!watchListItems.rows.length)
      return res.json({ message: "no items." }).status(201);
    return res.json(watchListItems.rows).status(200);
  } catch (error) {
    console.log(error);
  }
};
