import express from "express";
import citiesController from "../controllers/citiesController.js";

export const citiesRouter = express.Router();

citiesRouter.get(`/getCityIdByName/:name`, (req, res) => {
  citiesController.getCityIdByName(req, res);
});
export default citiesRouter;
