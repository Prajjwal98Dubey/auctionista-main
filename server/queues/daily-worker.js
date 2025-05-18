import { Queue, Worker } from "bullmq";
import { fetchNearAuctionProducts } from "./queueFunctions.js";

const connection = {
  host: "127.0.0.1",
  port: 6379,
};

const dailyWorker = new Worker(
  "fetch-daily-products",
  async () => {
    try {
      let res = await fetchNearAuctionProducts();
      const nearAuctionQueue = new Queue("near-auction-products", {
        connection,
      });
      console.log("inside the daily-worker function");
      console.log(res);
      res.forEach(async (prod) => {
        await nearAuctionQueue.add(
          "to-be-auctioned",
          {
            ...prod,
          },
          {
            removeOnComplete: true,
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  },
  {
    connection,
  }
);
