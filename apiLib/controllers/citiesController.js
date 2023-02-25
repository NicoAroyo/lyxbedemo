import mySqlConnection from "../../index.js";
import express from "express";
import { citiesService } from "../services/citiesService.js";

export const cityController = {
  getCityIdByName: async (req, res) => {
    const cityId = await citiesService.getCityIdByName(req.params.name);

    res.json(cityId);
  },
};

export default cityController;
