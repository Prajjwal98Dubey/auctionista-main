// functions used in job processing.
import auctionPool from "../db/connectDB.js";
import { categoryToDBCategory } from "../helpers/mapping.js";
import { connectRedisServer, redisClient } from "../redisClient.js";

export const fetchNearAuctionProducts = async () => {
  let products = await auctionPool.query(
    "SELECT * FROM PRODUCT WHERE (BID_START_TIME::TIMESTAMP >= NOW()::TIMESTAMP) AND (BID_START_TIME::TIMESTAMP - NOW()::TIMESTAMP) <= INTERVAL '24 hours'"
  );
  return products.rows;
};

export const updateHighestBidCommonProductByQueue = async (productId) => {
  let client = redisClient;
  if (client.isOpen == false) {
    client = await connectRedisServer();
  }

  let clientKey = await client.get(productId);
  if (clientKey == null) return;
  try {
    await auctionPool.query(
      "UPDATE PRODUCT SET HIGHEST_BID = $1 WHERE PRODUCT_ID = $2",
      [parseInt(clientKey), productId]
    );
    console.log("update highest bid in first function..");
  } catch (error) {
    console.log(error);
  }
};

export const updateHighestBidSpecificProductByQueue = async (
  productId,
  category
) => {
  let client = redisClient;

  if (client.isOpen == false) {
    client = await connectRedisServer();
  }

  let clientKey = await client.get(productId);
  if (clientKey == null) return;
  try {
    await auctionPool.query(
      `UPDATE ${categoryToDBCategory[category]} SET HIGHEST_BID = $1 WHERE PRODUCT_ID = $2`,
      [parseInt(clientKey), productId]
    );
    console.log("update highest bid in second function..");
  } catch (err) {
    console.log(err);
  }
};

export const cacheCleanByPattern = async (pattern) => {
  if (!redisClient.isOpen) {
    await connectRedisServer();
  }
  let cursor = 0;
  let deletedCount = 0;
  do {
    const reply = await redisClient.scan(cursor, {
      MATCH: pattern,
      COUNT: 100,
    });

    cursor = reply.cursor;
    const keys = reply.keys;

    if (keys.length > 0) {
      const deleted = await redisClient.del(keys);
      deletedCount += deleted;
    }
  } while (cursor !== 0);
};
