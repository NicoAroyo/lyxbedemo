import express from "express";
import cors from "cors";
import mySql from "mysql2";
import nursesRouter from "./src/routes/nurses.js";
import env from "dotenv";
import { rateLimiterUsingThirdParty } from "./src/middlewares/rateLimiter.js";
import citiesRouter from "./src/routes/cities.js";
import { loginRouter } from "./src/routes/login.js";

const app = express();
const PORT = 3000;
console.log("hi");
app.use(cors());
app.use(express.json());
env.config();
app.use(rateLimiterUsingThirdParty);

app.listen(PORT, () => {
  console.log(`API Server Started at http://localhost:${PORT}/`);
});

//ROUTES:
app.use(`/nurses`, nursesRouter);
app.use(`/cities`, citiesRouter);
app.use(`/login`, loginRouter);

//establishing database connection
const mySqlConnection = mySql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  multipleStatements: true,
});

export const dbName = process.env.DB;

mySqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

export default mySqlConnection;
