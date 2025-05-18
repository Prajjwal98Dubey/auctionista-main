import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import { connectRedisServer } from "./redisClient.js";
import searchRouter from "./routes/searcRoutes.js";
import watchListRouter from "./routes/watchListRouters.js";
import bidRouter from "./routes/bidRoutes.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    // origin: "*",
    credentials: true,
  })
);

/* AUTH */
app.use("/api/v1/auth", userRouter);

/* PRODUCT */
app.use("/api/v1/product", productRouter);

/* SEARCH */
app.use("/api/v1/search", searchRouter);

/* WATCHLIST */
app.use("/api/v1/watchlist", watchListRouter);

/* BIDS */

app.use("/api/v1/bid", bidRouter);

app.listen(process.env.PORT || 5001, async () => {
  console.log(`app listening at ${process.env.PORT || 5001}`);
  await connectRedisServer();
});
