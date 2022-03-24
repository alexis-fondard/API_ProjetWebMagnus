const sql = require("./db.js");
// constructor
const Place = function (place) {
  this.placeName = place.placeName;
  this.idContactUser = place.idContactUser;
};
Place.create = (newPlace, result) => {
  sql.query("INSERT INTO Place SET ?", newPlace, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created place: ", { id: res.insertId, ...newPlace });
    result(null, { id: res.insertId, ...newPlace });
  });
};
Place.findById = (id, result) => {
  sql.query(`SELECT * FROM Place WHERE idUser = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found place: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Place with the id
    result({ kind: "not_found" }, null);
  });
};
Place.getAll = (placeName, idContactUser, result) => {
  let query = "SELECT * FROM Place";
  if (placeName) {
    if (idContactUser) {
      query += ` WHERE idContactUser = ${idContactUser} AND placeName LIKE '%${placeName}%'`;
    }
    else {
      query += ` WHERE placeName LIKE '%${placeName}%'`;
    }
  }
  if (idContactUser) {
    query += ` WHERE idContactUser = ${idContactUser}`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("place: ", res);
    result(null, res);
  });
};
Place.updateById = (id, place, result) => {
  sql.query(
    "UPDATE Place SET placeName = ?, idContactUser = ? WHERE idPlace = ?",
    [place.placeName, place.idContactUser, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Place with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated place: ", { id: id, ...place });
      result(null, { id: id, ...place });
    }
  );
};
Place.remove = (id, result) => {
  sql.query("DELETE FROM Place WHERE idPlace = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Place with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted place with id: ", id);
    result(null, res);
  });
};
//TODO: check utility
// Place.removeAll = result => {
//   sql.query("DELETE FROM Place", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log(`deleted ${res.affectedRows} place`);
//     result(null, res);
//   });
// };
module.exports = Place;