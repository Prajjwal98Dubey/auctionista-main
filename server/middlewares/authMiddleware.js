import jwt from "jsonwebtoken";
export const authMiddleWare = async (req, res, next) => {
  if (
    req.headers &&
    req.headers.cookie &&
    req.headers.cookie
      .split(";")
      .some((s) => s.split("=")[0].trim() === "accessToken")
  ) {
    try {
      let [token] = req.headers.cookie
        .split(";")
        .filter((s) => s.split("=")[0].trim() === "accessToken");
      let accessToken = jwt.verify(
        token.split("=")[1],
        process.env.JWT_SECRET_KEY
      );
      req.user = accessToken.user_id;
      next();
    } catch (error) {
      return res.json({ message: "error in token/middleware" });
    }
  } else {
    return res.json({ message: "invalid request" }).status(400);
  }
};
