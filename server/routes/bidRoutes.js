import express from "express";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import {
  addNewBid,
  getBidStatus,
  getMyPreviousBid,
  removeMyBid,
  reviseMyBid,
} from "../controllers/bidController.js";

const bidRouter = express.Router();

bidRouter.route("/add_new_bid").post(authMiddleWare, addNewBid);
bidRouter.route("/get_bid_status").get(getBidStatus);
bidRouter.route("/get_previous_bid").get(authMiddleWare, getMyPreviousBid);
bidRouter.route("/revise_bid").put(authMiddleWare, reviseMyBid);
bidRouter.route("/remove_bid").delete(authMiddleWare, removeMyBid);

export default bidRouter;
