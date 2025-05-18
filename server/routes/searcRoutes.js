import express from "express";
import { getSearchItems } from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.route("/q").get(getSearchItems);

export default searchRouter;
