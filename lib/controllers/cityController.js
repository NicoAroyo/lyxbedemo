import mySqlConnection from "../../index.js";

export const cityController = {
  getCityIdByName: (req, res) => {
    console.log(req);
    mySqlConnection.query(
      `SELECT * FROM lyxbedemo.cities WHERE lyxbedemo.cities.city_name = ?`,
      [req.body.city],
      (err, rows) => {
        console.log(rows[0].city_id); //shows proper value
        const city_id = rows[0].city_id;
        console.log(city_id);
        if (!err) res.json(city_id);
        else res.json(err.code);
      }
    );
  },
};

export default cityController;
