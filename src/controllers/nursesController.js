import mySqlConnection from "../../index.js";
import { citiesService } from "../services/citiesService.js";
import { nursesService } from "../services/nursesService.js";

export const nursesController = {
  //returns all nurses
  getAllNurses: async (req, res) => await nursesService.getAllNurses(res),
  //get a specific nurse by her id
  getNurseById: async (req, res) => {
    const rows = await nursesService.getNurseById(req.params.id);
    res.json(rows);
  },
  getNurseByCity: async (req, res) => {
    const cityName = req.params.city;
    const cityId = await citiesService.getCityIdByName(cityName);
    const rows = await nursesService.getNurseByCity(cityId);
    res.json(rows);
  },
  getNurseByName: async (req, res) => {
    const name = req.params.name;
    const rows = await nursesService.getNurseByName(name);
    res.json(rows);
  },
  createNewNurse: async (req, res) => {
    const cityName = req.params.city;
    const cityId = await citiesService.getCityIdByName(cityName);
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const rows = await nursesService.createNewNurse(
      firstName,
      lastName,
      cityId
    );
    res.json(rows);
  },
  deleteNurse: async (req, res) => {
    const rows = await nursesService.deleteNurse(req.params.id);
    res.json(rows);
  },
  //updates the fields by which fields are passed in the request body and by the id in the request paramaters
  updateNurse: async (req, res) => {
    let rows = [];
    if (req.body.city != null) {
      const cityName = req.params.city;
      const cityId = await citiesService.getCityIdByName(cityName);
      const newRow = await nursesService.updateNurseCity(cityId, req.params.id);
      rows.push(newRow);
    }
    if (req.body.first_name != null) {
      const newRow = await nursesService.updateNurseFirstName(
        req.body.first_name,
        req.params.id
      );
      rows.push(newRow);
    }
    if (req.body.last_name != null) {
      const newRow = await nursesService.updateNurseLastName(
        req.body.last_name,
        req.params.id
      );
      rows.push(newRow);
    }
    res.json(...rows);
  },
};

export default nursesController;
