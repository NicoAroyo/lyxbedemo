import express from "express";
import mySqlConnection from "../index.js";
import nursesController from "../controllers/nursesController.js";
import { check } from "express-validator/check";
export const nursesRouter = express.Router();

nursesRouter.get("/", (req, res) => nursesController.getAllNurses(req, res));

nursesRouter.get("/:id", (req, res) => {
  nursesController.getNurseById(req, res);
});

nursesRouter.get(
  "/byCity/:city",
  check("city"),
  nursesController.getNurseByCity
);

nursesRouter.get(
  "/byName/:name",
  check("name"),
  nursesController.getNurseByName
);

nursesRouter.post(
  "/",
  check("first_name", "last_name"),
  nursesController.createNewNurse
);

nursesRouter.patch(
  "/:id",
  check("first_name", "last_name", "city"),
  nursesController.updateNurse
);

nursesRouter.delete("/:id", nursesController.deleteNurse);

export default nursesRouter;
