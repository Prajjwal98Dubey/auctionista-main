import { Queue } from "bullmq";
const connection = {
  host: "localhost",
  port: 6379,
};

const dailyProducer = new Queue("daily-fetcher", { connection });

const addDailyAuctionProductsToQueue = async () => {
  await dailyProducer.upsertJobScheduler(
    "daily-auction-products",
    {
      pattern: "0 15 23 * * *", // everyday at 23:15 p.m
    },
    {
      name: "fetch-daily-products",
      data: {},
    }
  );
};

addDailyAuctionProductsToQueue();
