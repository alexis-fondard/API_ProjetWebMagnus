const sql = require("./db.js")
// constructor
const User = function (user) {
  this.userLastName = user.userLastName;
  this.userFirstName = user.userFirstName;
  this.userEmail = user.userEmail;
  this.isCA = user.isCA;
  this.isMember = user.isMember;
  this.userCity = user.userCity;
  this.phoneNumber = user.phoneNumber;
  this.pwdUser = user.pwdUser;
}
User.create = (newUser, result) => {
  console.log(newUser)
  sql.query('INSERT INTO public."User" ("userLastName", "userFirstName", "userEmail", "isCA", "isMember", "userCity", "phoneNumber", "pwdUser") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', newUser, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    console.log("created user: ", { id: res.insertId, ...newUser })
    result(null, { id: res.insertId, ...newUser })
  })
}
User.findById = (id, result) => {
  sql.query('SELECT * FROM public."User" WHERE "id" = $1', id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log("found user: ", res[0])
      result(null, res[0])
      return
    }
    // not found User with the id
    result({ kind: "not_found" }, null)
  })
}
//TODO: check the userCity parameter
User.getAll = (userCity, result) => {
  let query = 'SELECT * FROM public."User"'
  //TODO: search by userCity, always pass through this if
  // if (userCity) {
  //   query += ` WHERE "userCity" LIKE '%$1%'`, userCity
  // }
  // console.log(query)
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log("user: ", res.rows)
    result(null, res)
  })
}
User.getAllMembers = result => {
  sql.query('SELECT * FROM public."User" WHERE "isMember" = true', (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log("user: ", res.rows)
    result(null, res)
  })
}
User.getAllCA = result => {
  sql.query('SELECT * FROM public."User" WHERE "isCA" = true', (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log("user: ", res.rows)
    result(null, res)
  })
}
User.updateById = (id, user, result) => {
  sql.query(
    'UPDATE public."User" SET "userLastName" = $1, "userFirstName" = $2, "userEmail" = $3, "isCA" = $4, "isMember" = $5, "userCity" = $6, "phoneNumber" = $7, "pwdUser" = $8 WHERE "id" = $9',
    [user.userLastName, user.userFirstName, user.userEmail, user.isCA, user.isMember, user.userCity, user.phoneNumber, user.pwdUser, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null)
        return
      }
      console.log("updated user: ", { id: id, ...user })
      result(null, { id: id, ...user })
    }
  )
}
User.remove = (id, result) => {
  sql.query('DELETE FROM public."User" WHERE "id" = $1', id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    if (res.affectedRows == 0 || res.affectedRows == null) {
      // not found User with the id
      console.log("not found User with the id: ", id[0])
      result({ kind: "not_found" }, null)
      return
    }
    console.log("deleted user with id: ", id[0])
    result(null, res)
  })
}
//TODO: check utility
// User.removeAll = result => {
//   sql.query('DELETE FROM public."User"', (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log(`deleted ${res.affectedRows} user`);
//     result(null, res);
//   });
// };
module.exports = User;



// const { DataTypes } = require("sequelize");

// module.exports = (sequelize, Sequelize) => {
//   const User = sequelize.define("user", {
//     userLastName: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     userFirstName: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     isCA: {
//       type: Sequelize.BOOLEAN,
//       allowNull: false
//     },
//     isMember: {
//       type: Sequelize.BOOLEAN,
//       allowNull: false
//     },
//     userCity: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     phoneNumber: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     pwdUser: {
//       type: Sequelize.STRING,
//       allowNull: false
//     }
//   });
//   return User;
// };