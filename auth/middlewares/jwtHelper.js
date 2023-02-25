import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const verifyAccessToken = (req, res, next) => {
  console.log("hi from");
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(400).json({ error: "user not authenticated" });
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (verified) {
      req.user_name = verified.user_name;
      return next();
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
