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
  sql.query('INSERT INTO public."User" ("userLastName", "userFirstName", "userEmail", "isCA", "isMember", "userCity", "phoneNumber", "pwdUser") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    newUser,
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(err, null)
        return
      }
      console.log("created user: ", { id: res.insertId, ...newUser })
      result(null, { id: res.insertId, ...newUser })
    })
}
User.login = (userLogin, result) => {
  sql.query('SELECT * FROM public."User" WHERE "userEmail" = $1 AND "pwdUser" = $2', userLogin, (err,res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    if (res.rows.length) {
      console.log("found user login: ", res.rows[0])
      result(null, res.rows[0])
      return
    }
    // email & pwd aren't the good ones
    result({ kind: "not_found" }, null)
  })
}
User.findById = (id, result) => {
  sql.query('SELECT * FROM public."User" WHERE "id" = $1', id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    if (res.rows.length) {
      console.log("found user: ", res.rows[0])
      result(null, res.rows[0])
      return
    }
    // not found User with the id
    result({ kind: "not_found" }, null)
  })
}
User.getAll = (userCity, result) => {
  let query = 'SELECT * FROM public."User"'
  let toSearch = []
  if (userCity) {
    if (userCity[0]) {
      query = 'SELECT * FROM public."User" WHERE "userCity" LIKE $1'
      toSearch = ['%' + userCity + '%']
    }
  }
  sql.query(query, toSearch, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log("user(s): ", res.rows)
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
User.updateById = (user, result) => {
  let column = ["userLastName", "userFirstName", "userEmail", "isCA", "isMember", "userCity", "phoneNumber", "pwdUser"]
  let query = 'UPDATE public."User" SET'
  let toUpdate = []
  let alreadyUse = false
  for (let i = 0; i < user.length - 1; i++) { //-1 pour échapper l'id
    if (user[i] != null) {
      if (alreadyUse) {
        query += ','
      }
      else {
        alreadyUse = true
      }
      query += ' "' + column[i] + '" = $' + toUpdate.push(user[i])
    }
  }
  query += ' WHERE "id" = $' + toUpdate.push(user[user.length - 1])  //push l'id
  console.log(query)
  sql.query(query,
    toUpdate,
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }
      if (res.rowCount == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null)
        return
      }
      console.log("updated user: ", { id: user[user.length - 1], ...user })
      result(null, { id: user[user.length - 1], ...user })
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
    console.log(res)
    if (res.rowCount == 0 || res.rowCount == null) {
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
//       console.log("error: ", err)
//       result(null, err)
//       return
//     }
//     console.log(`deleted ${res.affectedRows} user`)
//     result(null, res)
//   })
// }
module.exports = User
