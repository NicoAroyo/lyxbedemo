import mySqlConnection from "../../index.js";

export const nursesService = {
  //returns all nurses
  getAllNurses: (res) => {
    return new Promise((resolve, reject) => {
      mySqlConnection.query(`SELECT * FROM lyxbedemo.nurses`, (err, rows) => {
        if (!err) res.json(rows);
        else res.json(err.code);
      });
    });
  },
  //get a specific nurse by her id
  getNurseById: (id) => {
    return new Promise((resolve, reject) => {
      mySqlConnection.query(
        `SELECT * FROM lyxbedemo.nurses WHERE lyxbedemo.nurses.nurse_id = ?`,
        [id],
        (err, rows) => {
          if (!err) resolve(rows);
          else reject(err);
        }
      );
    });
  },
  getNurseByCity: (cityId) => {
    return new Promise((resolve, reject) => {
      mySqlConnection.query(
        `SELECT * FROM lyxbedemo.nurses WHERE lyxbedemo.nurses.city_id = ?`,
        [cityId],
        (err, row) => {
          if (!err) resolve(row);
          else reject(err);
        }
      );
    });
  },
  getNurseByName: (name) => {
    return new Promise((resolve, reject) =>
      mySqlConnection.query(
        `SELECT * FROM lyxbedemo.nurses WHERE lyxbedemo.nurses.first_name LIKE ? OR lyxbedemo.nurses.last_name LIKE ?`,
        ["%" + name + "%", "%" + name + "%"],
        (err, rows) => {
          console.log(rows);
          if (!err) resolve(rows);
          else reject(err);
        }
      )
    );
  },
  createNewNurse: async (firstName, lastName, cityId) => {
    return new Promise((resolve, reject) => {
      mySqlConnection.query(
        `INSERT INTO  lyxbedemo.nurses VALUES (default, ? , ? , ?`,
        [firstName, lastName, cityId],
        (err) => {
          if (!err) resolve("Nurse added successfully");
          else reject(err);
        }
      );
    });
  },
  deleteNurse: (id) => {
    return new Promise((resolve, reject) => {
      mySqlConnection.query(
        `DELETE FROM lyxbedemo.nurses WHERE nurse_id = ?`,
        [id],
        (err) => {
          if (!err) resolve("Nurse deleted successfully");
          else reject(err);
        }
      );
    });
  },
  //updates the fields by which fields are passed in the request body and by the id in the request paramaters
  updateNurseCity: async (cityId, id) => {
    return new Promise((resolve, reject) => {
      mySqlConnection.query(
        `UPDATE lyxbedemo.nurses
                SET lyxbedemo.nurses.city_id = ?
                WHERE lyxbedemo.nurses.nurse_id = ?`,
        [cityId, id],
        (err) => {
          if (!err) resolve("Nurse city updated sucssesfully");
          else reject(err);
        }
      );
    });
  },
  updateNurseFirstName: async (firstName, id) => {
    return new Promise((resolve, reject) => {
      {
        mySqlConnection.query(
          `UPDATE lyxbedemo.nurses
                  SET lyxbedemo.nurses.first_name = ?
                  WHERE lyxbedemo.nurses.nurse_id = ? `,
          [firstName, id]
        ),
          (err) => {
            if (!err) resolve("Nurse first name updated succseesfully");
            else reject(err);
          };
      }
    });
  },
  updateNurseLastName: (lastName, id) => {
    return new Promise((resolve, reject) => {
      mySqlConnection.query(
        `UPDATE lyxbedemo.nurses
                SET lyxbedemo.nurses.last_name = ?
                WHERE lyxbedemo.nurses.nurse_id = ?`,
        [lastName, id]
      ),
        (err) => {
          if (!err) resolve("Nurse last name updated successfully");
          else reject(err);
        };
    });
  },
};

export default nursesService;
