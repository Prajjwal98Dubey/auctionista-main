import { Queue } from "bullmq";

const connection = {
  host: "localhost",
  port: "6379",
};

const finalPriceQueue = new Queue("product-final-price", { connection });

export const addToFinalPriceQueue = async (prodId, delay) => {
  await finalPriceQueue.add(
    "set_final_product_price",
    {
      prodId,
    },
    { removeOnComplete: true, removeOnFail: true, delay }
  );
};
