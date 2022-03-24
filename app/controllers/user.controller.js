const User = require("../models/user.model.js");
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
  User.create([userLastName, userFirstName, userEmail, isCA, isMember, userCity, phoneNumber, pwdUser], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      })
    else res.status(201).send(data.rows) //TODO: check utility
  })
}
// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const userCity = req.query.userCity;
  User.getAll([userCity], (err, data) => {
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
      });
    else res.status(200).send(data.rows);
  });
};
// Find all CA
exports.findAllCA = (req, res) => {
  User.getAllCA((err, data) => { //TODO: search by userCity ??
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CA."
      });
    else res.status(200).send(data.rows);
  });
};
// Find a single User with a id
exports.findOne = (req, res) => {
  User.findById([req.params.id], (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.status(200).send(data.rows);
  });
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  console.log(req.body)
  const { id, userLastName, userFirstName, userEmail, userCity, phoneNumber, pwdUser } = req.body
  const { isCA, isMember } = req.body || false
  User.updateById(
    [id, userLastName, userFirstName, userEmail, isCA, isMember, userCity, phoneNumber, pwdUser],
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.status(200).send(data.rows);
    }
  );
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.remove([req.params.id], (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.status(200).send({ message: `User was deleted successfully!` });
  });
};
//TODO: check utility
// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all users."
//       });
//     else res.send({ message: `All Users were deleted successfully!` });
//   });
// };





// const db = require("../models");
// const User = db.user;
// const Op = db.Sequelize.Op;
// // Create and Save a new User
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }
//   // Create a User
//   const user = {
//     userLastName: req.body.userLastName,
//     userFirstName: req.body.userFirstName,
//     isCA: req.body.isCA || false,           //TODO: isCA: req.body.isCA ? req.body.isCA : false,
//     isMember: req.body.isMember || false,
//     userCity: req.body.userCity,
//     phoneNumber: req.body.phoneNumber,
//     pwdUser: req.body.pwdUser
//   };
//   // Save User in the database
//   User.create(user)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the User."
//       });
//     });
// };
// // Retrieve all Users from the database.
// exports.findAll = (req, res) => {
//   const userCity = req.query.title;
//   var condition = userCity ? { title: { [Op.iLike]: `%${userCity}%` } } : null;
//   User.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving users."
//       });
//     });
// };
// // Find all members
// exports.findAllMembers = (req, res) => {
//   User.findAll({ where: { isMember: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving members."
//       });
//     });
// };
// // Find all CA
// exports.findAllCA = (req, res) => {
//   User.findAll({ where: { isCA: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving the CA."
//       });
//     });
// };
// // Find a single User with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;
//   User.findByPk(id)
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find User with id=${id}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving User with id=" + id
//       });
//     });
// };
// // Update a User by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }
//   const id = req.params.id;
//   User.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update User with id=${id}. Maybe User was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating User with id=" + id
//       });
//     });
// };
// // Delete a User with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;
//   User.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with id=${id}. Maybe User was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete User with id=" + id
//       });
//     });
// };
// // TODO: check utility
// // // Delete all Users from the database.
// // exports.deleteAll = (req, res) => {
// //   User.destroy({
// //     where: {},
// //     truncate: false
// //   })
// //     .then(nums => {
// //       res.send({ message: `${nums} Users were deleted successfully!` });
// //     })
// //     .catch(err => {
// //       res.status(500).send({
// //         message:
// //           err.message || "Some error occurred while removing all users."
// //       });
// //     });
// // };