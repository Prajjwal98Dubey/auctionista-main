import jwt from "jsonwebtoken";
export const generateToken = (userId) => {
  return jwt.sign({ user_id: userId }, process.env.JWT_SECRET_KEY);
};
