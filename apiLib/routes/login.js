import express from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const loginRouter = express.Router();

loginRouter.post(`/`, (req, res) => {
  const user = req.body.user_name;
  const accesToken = jwt.sign(user, process.env.JWT_SECRET_KEY);
  res.json(accesToken);
});

export default loginRouter;
