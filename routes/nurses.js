import express from "express";
import mySqlConnection from "../index.js";
import nursesController from "../controllers/nursesController.js";
import { check } from "express-validator/check/index.js";
export const nursesRouter = express.Router();

nursesRouter.get("/", (req, res) => nursesController.getAllNurses(req, res));

nursesRouter.get("/:id", (req, res) => {
  nursesController.getNurseById(req, res);
});

nursesRouter.get(
  "/byCity/:city",
  check("city").isString().notEmpty(),
  (req, res) => {
    nursesController.getNurseByCity(req, res);
  }
);

nursesRouter.get(
  "/byName/:name",
  check("name").isString().notEmpty().matches(`/^[A-Za-z`),
  (req, res) => {
    nursesController.getNurseByName(req.res);
  }
);

nursesRouter.post(
  "/",
  check("first_name", "last_name").isString().notEmpty().matches(`/^[A-Za-z`),
  (req, res) => {
    nursesController.createNewNurse(req, res);
  }
);

nursesRouter.patch(
  "/:id",
  check("first_name", "last_name", "city").isString().matches(`/^[A-Za-z`),
  (req, res) => {
    nursesController.updateNurse(req, res);
  }
);

nursesRouter.delete("/:id", (req, res) => {
  nursesController.deleteNurse(req, res);
});

export default nursesRouter;
