import mySqlConnection from "../index.js";
import { citiesService } from "../services/citiesService.js";

export const nursesController = {
  //returns all nurses
  getAllNurses: (req, res) =>
    mySqlConnection.query(`SELECT * FROM lyxbedemo.nurses`, (err, rows) => {
      if (!err) res.json(rows);
      else res.json(err.code);
    }),
  //get a specific nurse by her id
  getNurseById: (req, res) => {
    mySqlConnection.query(
      `SELECT * FROM lyxbedemo.nurses WHERE lyxbedemo.nurses.nurse_id = ?`,
      [req.params.id],
      (err, rows) => {
        if (!err) res.json(rows);
        else res.json(err.code);
      }
    );
  },
  getNurseByCity: async (req, res) => {
    const cityName = req.params.city;
    const city_id = await citiesService.getCityIdByName(cityName);
    mySqlConnection.query(
      `SELECT * FROM lyxbedemo.nurses WHERE lyxbedemo.nurses.city_id = ?`,
      [city_id],
      (err, row) => {
        if (!err) res.json(row);
        else res.json(err.code);
      }
    );
  },
  getNurseByName: (req, res) => {
    const name = req.params.name;
    console.log(name);
    mySqlConnection.query(
      `SELECT * FROM lyxbedemo.nurses WHERE lyxbedemo.nurses.first_name LIKE ? OR lyxbedemo.nurses.last_name LIKE ?`,
      ["%" + name + "%", "%" + name + "%"],
      (err, rows, fields) => {
        console.log(rows);
        if (!err) res.json(rows);
        else res.json(err.code);
      }
    );
  },
  createNewNurse: async (req, res) => {
    const cityName = req.params.city;
    const city_id = await citiesService.getCityIdByName(cityName);
    mySqlConnection.query(
      `INSERT INTO  lyxbedemo.nurses VALUES (default, ? , ? , ?`,
      [req.body.first_name, req.body.last_name, city_id],
      (err) => {
        if (!err) res.json("ok");
        else res.json(err.code);
      }
    );
  },
  deleteNurse: (req, res) => {
    mySqlConnection.query(
      `DELETE FROM lyxbedemo.nurses WHERE nurse_id = ?`,
      [req.params.id],
      (err) => {
        if (!err) res.json("ok");
        else res.json(err.code);
      }
    );
  },
  //updates the fields by which fields are passed in the request body and by the id in the request paramaters
  updateNurse: async (req, res) => {
    if (req.body.city != null) {
      const cityName = req.params.city;
      const city_id = await citiesService.getCityIdByName(cityName);

      mySqlConnection.query(
        `UPDATE lyxbedemo.nurses
              SET lyxbedemo.nurses.city_id = '${city_id}'
              WHERE lyxbedemo.nurses.nurse_id = ?`,
        [req.params.id]
      );
    }
    if (req.body.first_name != null) {
      mySqlConnection.query(
        `UPDATE lyxbedemo.nurses
          SET lyxbedemo.nurses.first_name = ?
          WHERE lyxbedemo.nurses.nurse_id = ? `,
        [req.body.first_name, req.params.id]
      );
    }
    if (req.body.last_name != null) {
      mySqlConnection.query(
        `UPDATE lyxbedemo.nurses
          SET lyxbedemo.nurses.last_name = ?
          WHERE lyxbedemo.nurses.nurse_id = ?`,
        [req.body.last_name, req.params.id]
      );

      res.json("ok");
    }
  },
};

export default nursesController;
