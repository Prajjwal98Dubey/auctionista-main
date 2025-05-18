import { nanoid } from "nanoid";
import auctionPool from "../db/connectDB.js";

export const addNewBid = async (req, res) => {
  const { prodId, bidPrice } = req.body;
  const userId = req.user;
  try {
    if (!prodId || !bidPrice) return res.json({ message: "insufficient info" });
    const statusId = nanoid();
    await auctionPool.query(
      "INSERT INTO BID_STATUS (STATUS_ID,PRODUCT_ID,USER_ID,BID_PRICE) VALUES ($1,$2,$3,$4)",
      [statusId, prodId, userId, bidPrice]
    );
    return res.status(201).json({ message: "bid has been added." });
  } catch (error) {
    console.log(error);
  }
};

export const getBidStatus = async (req, res) => {
  const { prodId } = req.query;
  try {
    let bidStatus = await auctionPool.query(
      "SELECT COUNT(*) AS COUNT,MAX(BID_PRICE) AS MAX_PRICE FROM BID_STATUS WHERE PRODUCT_ID = $1",
      [prodId]
    );
    return res
      .json({
        bidCount: bidStatus.rows[0].count,
        maxPrice: bidStatus.rows[0].max_price ? bidStatus.rows[0].max_price : 0,
      })
      .status(200);
  } catch (error) {
    console.log(error);
  }
};

export const getMyPreviousBid = async (req, res) => {
  const { prodId } = req.query;
  const userId = req.user;
  try {
    let previousBid = await auctionPool.query(
      "SELECT * FROM BID_STATUS WHERE USER_ID = $1 AND PRODUCT_ID=$2",
      [userId, prodId]
    );
    if (previousBid.rowCount)
      return res.json({
        isPrevious: true,
        price: previousBid.rows[0].bid_price,
      });
    return res.json({ isPrevious: false });
  } catch (error) {
    console.log(error);
  }
};

export const reviseMyBid = async (req, res) => {
  const { prodId, newPrice } = req.body;
  const userId = req.user;
  try {
    await auctionPool.query(
      "UPDATE BID_STATUS SET BID_PRICE = $1 WHERE USER_ID = $2 AND PRODUCT_ID = $3",
      [newPrice, userId, prodId]
    );
    return res.json({ message: "bid updated!!!" }).status(201);
  } catch (error) {
    console.log(error);
  }
};

export const removeMyBid = async (req, res) => {
  const { prodId } = req.query;
  const userId = req.user;
  try {
    await auctionPool.query(
      "DELETE FROM BID_STATUS WHERE USER_ID = $1 AND PRODUCT_ID = $2",
      [userId, prodId]
    );
    return res.json({ message: "bid removed !!!" });
  } catch (error) {
    console.log(error);
  }
};
