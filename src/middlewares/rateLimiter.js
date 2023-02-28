import { rateLimit } from "express-rate-limit";

const amount = 100;

export const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: amount,
  message: `You have exceeded the ${amount}requests in 24 hrs limit!`,
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiterUsingThirdParty;
