const User = require("../models/user.model.js")
const {SHA256} = require('../security/hash')
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  const { userLastName, userFirstName, userEmail, userCity, phoneNumber, pwdUser } = req.body
  const { isCA, isMember } = req.body || false
  // Save User in the database
  User.create(
    [userLastName, userFirstName, userEmail, isCA, isMember, userCity, phoneNumber, SHA256(pwdUser)],
    (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      })
    else res.status(201).send(data.rows)
  })
}
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  const { userEmail, pwdUser } = req.body
  User.login(
    [userEmail, SHA256(pwdUser)],
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while logining the User."
        })
      else res.status(201).send(data)
    }
  )
}
// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const userCity = req.query.userCity
  User.getAll(userCity, (err, data) => { //TODO: userCity
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all users."
      })
    else res.status(200).send(data.rows)
  })
}
// Find all members
exports.findAllMembers = (req, res) => {
  User.getAllMembers((err, data) => { //TODO: search by userCity ??
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving members."
      })
    else res.status(200).send(data.rows)
  })
}
// Find all CA
exports.findAllCA = (req, res) => {
  User.getAllCA((err, data) => { //TODO: search by userCity ??
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CA."
      })
    else res.status(200).send(data.rows)
  })
}
// Find a single User with a id
exports.findOne = (req, res) => {
  User.findById([req.params.id], (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found User with id " + req.params.id
        })
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        })
      }
    } else res.status(200).send(data)
  })
}
// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  console.log("t", req.body)
  const { userLastName, userFirstName, userEmail, userCity, phoneNumber, pwdUser } = req.body
  const { isCA, isMember } = req.body || false
  User.updateById(
    [userLastName, userFirstName, userEmail, isCA, isMember, userCity, phoneNumber, SHA256(pwdUser), req.params.id],
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Not found User with id " + req.params.id
          })
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          })
        }
      } else res.status(200).send(data.rows)
    }
  )
}
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.remove([req.params.id], (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found User with id " + req.params.id
        })
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        })
      }
    } else res.status(200).send({ message: "User was deleted successfully!" })
  })
}
//TODO: check utility
// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all users."
//       })
//     else res.send({ message: `All Users were deleted successfully!` })
//   })
// }
