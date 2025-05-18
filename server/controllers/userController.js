import auctionPool from "../db/connectDB.js";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/token.js";

export const registerUser = async (req, res) => {
  const {
    user_name,
    user_email,
    user_password,
    user_first_name,
    user_last_name,
    user_contact_no,
    user_address_line,
    user_city,
    user_country,
    user_photo,
  } = req.body;
  let propKeys = Object.keys(req.body);
  let propValues = Object.values(req.body);
  for (let prop of ["user_name", "user_email", "user_password"]) {
    if (propKeys.indexOf(prop) === -1 || !propValues[propKeys.indexOf(prop)]) {
      return res
        .json({ message: "insufficient data", missing: prop })
        .status(401);
    }
  }

  /* check if user with user_name or user_email exists or not */
  let isUserExists = await auctionPool.query(
    "SELECT USER_NAME,USER_EMAIL FROM USERS WHERE USER_NAME = $1 OR USER_EMAIL = $2",
    [user_name.trim(), user_email.toLowerCase().trim()]
  );
  if (isUserExists.rows.length > 0)
    return res.json({ message: "user exists" }).status(201);

  /* TODO: user_name,user_email and user_password VALIDATION */

  let user_id = nanoid();
  let gen_salt = await bcrypt.genSalt(10);
  let encrypted_password = await bcrypt.hash(user_password, gen_salt);
  let refresh_token = generateToken(user_id);
  await auctionPool.query(
    "INSERT INTO USERS VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
    [
      user_id,
      user_name.trim(),
      user_email.toLowerCase().trim(),
      encrypted_password,
      refresh_token,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      false,
      "",
      "",
    ]
  );
  res.cookie("accessToken", refresh_token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 30 * 1000,
    sameSite: "lax",
    secure: false,
  });
  return res
    .json({
      user_email: user_email.toLowerCase().trim(),
      user_name: user_name.trim(),
      user_photo,
    })
    .status(201);
};
export const loginUser = async (req, res) => {
  const { user_cred, user_password } = req.body;
  try {
    if (!user_cred || !user_password)
      return res.json({ message: "insufficient data" }).status(400);
    let user = await auctionPool.query(
      "SELECT USER_NAME,USER_PASSWORD,USER_EMAIL,USER_REFRESH_TOKEN,USER_PHOTO FROM USERS WHERE USER_NAME = $1 OR USER_EMAIL = $1",
      [user_cred]
    );
    if (user.rows.length === 0)
      return res.json({ message: "user does not exists" }).status(400);
    let isCredentialsCorrect = await bcrypt.compare(
      user_password,
      user.rows[0].user_password
    );
    if (!isCredentialsCorrect)
      return res.json({ message: "invalid credentials" }).status(200);
    else {
      res.cookie("accessToken", user.rows[0].user_refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 30 * 1000,
        sameSite: "lax",
        secure: false,
      });
      return res
        .json({
          user_name: user.rows[0].user_name,
          user_email: user.rows[0].user_email,
          user_photo: user.rows[0].user_photo,
        })
        .status(200);
    }
  } catch (error) {
    return res
      .json({
        message: "error",
        error: "internal server error",
      })
      .status(500);
  }
};

/* Google Firebase Login */
export const thirdParyLogin = async (req, res) => {
  const { user_name, user_email, user_photo } = req.body;
  if (!user_name || !user_email)
    return res.json({ message: "insufficient data" }).status(400);
  try {
    const userExists = await auctionPool.query(
      "SELECT USER_NAME FROM USERS WHERE USER_NAME = $1 OR USER_EMAIL = $2",
      [user_name, user_email]
    );
    let userDetails = {};
    if (userExists.rows.length === 0) {
      const user_id = nanoid();
      const refresh_token = generateToken(user_id);
      userDetails = await auctionPool.query(
        "INSERT INTO USERS VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
        [
          user_id,
          user_name.trim(),
          user_email.toLowerCase().trim(),
          "",
          refresh_token,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          true,
          user_photo,
          "",
        ]
      );
      return res
        .cookie("accessToken", refresh_token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 30 * 1000,
        })
        .json({
          message: "third party user register / login",
          user_name,
          user_email,
          user_photo,
        })
        .status(201);
    } else {
      userDetails = await auctionPool.query(
        "SELECT USER_REFRESH_TOKEN FROM USERS WHERE USER_EMAIL=$1",
        [user_email]
      );
    }
    return res
      .cookie("accessToken", userDetails.rows[0].user_refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 30 * 1000,
      })
      .json({
        message: "third party user register / login",
        user_name,
        user_email,
        user_photo,
      })
      .status(201);
  } catch (error) {
    console.log(error);
    return res.json({ message: "error in the third party api" });
  }
};

export const logOutUser = async (_, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
    });
    return res.json({ message: "logout success !!!" });
  } catch (error) {
    return res.json({ message: "error" });
  }
};

export const getLoggedInUserDetails = async (req, res) => {
  const user = req.user;
  try {
    let userDetails = await auctionPool.query(
      "SELECT user_name,user_email,user_first_name,user_last_name,user_contact_no,user_address_line_1,user_city,user_country,user_photo from USERS WHERE USER_ID = $1",
      [user]
    );
    if (!userDetails.rowCount)
      return res.json({ message: "user does not exists" }).status(200);
    return res.json({ ...userDetails.rows[0] }).status(200);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const getUserDetails = async (req, res) => {
  const user_name = req.query.user_name;
  try {
    let userDetails = await auctionPool.query(
      "SELECT user_id,user_name,user_email,user_first_name,user_last_name,users_unique_identifier,user_contact_no,user_address_line_1,user_city,user_country,user_photo,user_role,is_third_party_auth from USERS WHERE USER_NAME = $1",
      [user_name]
    );
    if (!userDetails.rowCount)
      return res.json({ message: "user does not exists" }).status(200);
    return res.json({ message: "success", ...userDetails.rows[0] }).status(200);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const editUser = async (req, res) => {
  const user = req.user;
  /*
    
   if 'UserName' is to be changed then check if the new username does not exists check for contact no for same.
   
    */

  const {
    user_first_name,
    user_last_name,
    user_contact_no,
    user_address_line_1,
    user_city,
    user_photo,
  } = req.body;
  try {
    await auctionPool.query(
      "UPDATE USERS SET user_first_name = $1,user_last_name = $2,user_contact_no = $3,user_address_line_1 = $4,user_city = $5,user_photo = $6 WHERE USER_ID = $7",
      [
        user_first_name,
        user_last_name,
        user_contact_no,
        user_address_line_1,
        user_city,
        user_photo,
        user,
      ]
    );
    return res.json({ message: "user updated" }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const user = req.user;
  try {
    let deletedUser = await auctionPool.query(
      "DELETE FROM USERS WHERE USER_ID = $1 ",
      [user]
    );
    if (!deletedUser.rowCount)
      return res.json({ message: "no user with this id exists." }).status(404);
    return res.json({ message: "user deleted!!!" }).status(200);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const getMyBookMark = async (req, res) => {
  const user = req.user;
  try {
    let bookMarkProductList = await auctionPool.query(
      "SELECT PRODUCT_ID, PRODUCT_SET_PRICE,PRODUCT_TITLE,PRODUCT_USAGE_TIME,BID_START_TIME,PRODUCT_IMAGES,PRODUCT_CATEGORY FROM PRODUCT WHERE PRODUCT_ID IN (SELECT PRODUCT_ID FROM BOOKMARK WHERE USER_ID = $1)",
      [user]
    );
    return res.json(bookMarkProductList.rows).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const addToBookMark = async (req, res) => {
  const user = req.user;
  const { productId } = req.body;
  try {
    const bookmarkId = nanoid();
    await auctionPool.query(
      "INSERT INTO BOOKMARK (BOOKMARK_ID,PRODUCT_ID,USER_ID) VALUES ($1,$2,$3)",
      [bookmarkId, productId, user]
    );
    return res.json({ message: "product added.." }).status(201);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookMark = async (req, res) => {
  const { productId } = req.query;
  try {
    await auctionPool.query("DELETE FROM BOOKMARK WHERE PRODUCT_ID = $1 ", [
      productId,
    ]);
    return res.json({ message: "bookmark deleted !!!" }).status(201);
  } catch (error) {
    console.log(error);
  }
  f;
};
