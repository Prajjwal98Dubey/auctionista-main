import express from "express";
import {
  addToBookMark,
  deleteBookMark,
  deleteUser,
  editUser,
  getLoggedInUserDetails,
  getMyBookMark,
  getUserDetails,
  loginUser,
  logOutUser,
  registerUser,
  thirdParyLogin,
} from "../controllers/userController.js";
import { authMiddleWare } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/third_party_auth").post(thirdParyLogin);
userRouter.route("/logout").delete(authMiddleWare, logOutUser);
userRouter.route("/my_details").get(authMiddleWare, getLoggedInUserDetails);
userRouter.route("/user_details").get(getUserDetails);
userRouter.route("/edit_user").put(authMiddleWare, editUser);
userRouter.route("/delete_user").delete(authMiddleWare, deleteUser);
userRouter.route("/get_bookmark").get(authMiddleWare, getMyBookMark);
userRouter.route("/add_bookmark").post(authMiddleWare, addToBookMark);
userRouter.route("/delete_bookmark").delete(authMiddleWare, deleteBookMark);

export default userRouter;
