import { Worker } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

let UPDATE_PRODUCT_FINAL_DETAILS =
  "http://localhost:5001/api/v1/product/final_product_details";

const finalPriceWorker = new Worker(
  "product-final-price",
  async (job) => {
    try {
      await fetch(UPDATE_PRODUCT_FINAL_DETAILS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prodId: job.data.prodId }),
      });
    } catch (err) {
      console.log(err);
    }
  },
  {
    connection,
    autorun: false,
  }
);

finalPriceWorker.run();
