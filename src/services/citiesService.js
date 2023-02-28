import mySqlConnection from "../../index.js";

export const citiesService = {
  getCityIdByName: (name) => {
    return new Promise((resolve, reject) => {
      mySqlConnection.query(
        `SELECT * FROM lyxbedemo.cities WHERE lyxbedemo.cities.city_name = ?`,
        [name],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows[0].city_id);
        }
      );
    });
  },
};
