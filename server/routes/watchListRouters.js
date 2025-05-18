import express from "express";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import {
  addProductsToWatchList,
  getAllWatchListProducts,
  removeProductsFromWatchList,
} from "../controllers/watchListController.js";

const watchListRouter = express.Router();

watchListRouter
  .route("/add_products")
  .post(authMiddleWare, addProductsToWatchList);
watchListRouter
  .route("/remove_product")  
  .delete(authMiddleWare, removeProductsFromWatchList);
watchListRouter
  .route("/watchlist_products")
  .get(authMiddleWare, getAllWatchListProducts);

export default watchListRouter;
