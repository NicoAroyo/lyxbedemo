import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const verifyAccessToken = (req, res, next) => {
  console.log("hi from verifyAccessToken");
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(400).json({ error: "user not authenticated" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified) {
      req.user_name = verified.user_name;
      console.log(verified);
      return next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
