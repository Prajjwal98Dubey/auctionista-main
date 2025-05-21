import { Worker } from "bullmq";
import { fetchNearAuctionProducts } from "../queueFunctions.js";
import { addToFinalPriceQueue } from "../producers/finalPrice.producer.js";

const connection = {
  host: "localhost",
  port: 6379,
};

function getTimeDifferenceWithOneHour(givenTimeMs) {
  const ONE_HOUR_MS = 60 * 60 * 1000;
  const adjustedTime = givenTimeMs + ONE_HOUR_MS + 60 * 1000;
  const currentTime = Date.now();
  const difference = adjustedTime - currentTime;
  return difference;
}

const dailyWorker = new Worker(
  "daily-fetcher",
  async (job) => {
    let products = await fetchNearAuctionProducts();
    for (let prod of products) {
      let delay = getTimeDifferenceWithOneHour(
        new Date(prod.bid_start_time).getTime()
      );
      await addToFinalPriceQueue(prod.product_id, delay);
    }
  },
  {
    connection,
    autorun: false,
  }
);

dailyWorker.run();
