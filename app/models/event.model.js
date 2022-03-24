const sql = require("./db.js");
// constructor
const Event = function (event) {
  this.eventName = event.eventName;
  this.startDate = event.startDate;
  this.endDate = event.endDate;
};
Event.create = (newEvent, result) => {
  sql.query("INSERT INTO Event SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created event: ", { id: res.insertId, ...newEvent });
    result(null, { id: res.insertId, ...newEvent });
  });
};
Event.findById = (id, result) => {
  sql.query(`SELECT * FROM Event WHERE idEvent = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found event: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Event with the id
    result({ kind: "not_found" }, null);
  });
};
Event.getAll = (eventName, startDate, endDate, result) => {
  let query = "SELECT * FROM Event";
  if (eventName || startDate || endDate) {
    query += ` WHERE`;
    if (eventName) {
      query += ` eventName LIKE '%${eventName}%'`;
    }
    if (startDate) {
      if (eventName) {
        query += ` AND`;
      }
      query += ` startDate = ${startDate}`;
    }
    if (endDate) {
      if (eventName || startDate) {
        query += ` AND`;
      }
      query += ` endDate = ${endDate}`;
    }
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("event: ", res);
    result(null, res);
  });
};
Event.updateById = (id, event, result) => {
  sql.query(
    "UPDATE Event SET eventName = ?, startDate = ?, endDate = ? WHERE idEvent = ?",
    [event.eventName, event.startDate, event.endDate, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Event with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated event: ", { id: id, ...event });
      result(null, { id: id, ...event });
    }
  );
};
Event.remove = (id, result) => {
  sql.query("DELETE FROM Event WHERE idEvent = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Event with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted event with id: ", id);
    result(null, res);
  });
};
//TODO: check utility
// Event.removeAll = result => {
//   sql.query("DELETE FROM Event", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log(`deleted ${res.affectedRows} event`);
//     result(null, res);
//   });
// };
module.exports = Event;