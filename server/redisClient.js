import { createClient } from "redis";

let redisClient;
redisClient = createClient();
const connectRedisServer = async () => {
  redisClient.on("error", (err) => console.log(err));
  await redisClient.connect();
  return redisClient;
};

export { redisClient, connectRedisServer };
