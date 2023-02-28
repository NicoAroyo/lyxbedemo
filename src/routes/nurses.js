import express from "express";
import mySqlConnection from "../../index.js";
import { check, validationResult } from "express-validator/check/index.js";
import { verifyAccessToken } from "../middlewares/jwtHelper.js";
import nursesController from "../controllers/nursesController.js";
export const nursesRouter = express.Router();

nursesRouter.get("/", verifyAccessToken, (req, res) =>
  nursesController.getAllNurses(req, res)
);

nursesRouter.get("/:id", verifyAccessToken, (req, res) => {
  nursesController.getNurseById(req, res);
});

nursesRouter.get(
  "/byCity/:city",
  check("city").isString().notEmpty(),
  verifyAccessToken,
  async (req, res) => {
    await nursesController.getNurseByCity(req, res);
  }
);

nursesRouter.get(
  "/byName/:name",
  check("name").notEmpty().matches(new RegExp("/^[A-Za-z]*$/")),
  verifyAccessToken,
  (req, res) => {
    console.log(validationResult);
    if (validationResult) nursesController.getNurseByName(req, res);
    else res.json(validationResult);
  }
);

nursesRouter.post(
  "/",
  check("first_name", "last_name")
    .notEmpty()
    .matches(new RegExp("^[a-zA-Z ]+$")),
  verifyAccessToken,
  (req, res) => {
    if (validationResult) nursesController.createNewNurse(req, res);
    else res.json(validationResult);
  }
);

nursesRouter.patch(
  "/:id",
  check("first_name", "last_name", "city").matches(new RegExp("^[a-zA-Z ]+$")),
  verifyAccessToken,
  (req, res) => {
    if (validationResult) nursesController.updateNurse(req, res);
    else res.json(validationResult);
  }
);

nursesRouter.delete("/:id", verifyAccessToken, (req, res) => {
  nursesController.deleteNurse(req, res);
});

export default nursesRouter;
