import express from "express";
import mySqlConnection from "../../index.js";
import nursesController from "../controllers/nursesController.js";
export const nursesRouter = express.Router();

nursesRouter.get("/", (req, res) => nursesController.getAllNurses(req, res));

nursesRouter.get("/:id", (req, res) => {
  nursesController.getNurseById(req, res);
});

nursesRouter.get("/byCity/:city", (req, res) => {
  nursesController.getNurseByCity(req, res);
});

nursesRouter.get("/byName/:name", (req, res) => {
  nursesController.getNurseByName(req, res);
});

nursesRouter.post("/", (req, res) => {
  nursesController.createNewNurse(req, res);
});

nursesRouter.patch("/:id", (req, res) => {
  nursesController.updateNurse(req, res);
});

nursesRouter.delete("/:id", (req, res) => {
  nursesController.deleteNurse(req, res);
});

export default nursesRouter;
