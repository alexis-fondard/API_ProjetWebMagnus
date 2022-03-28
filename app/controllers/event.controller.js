const Event = require("../models/event.model.js")
// Create and Save a new Event
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  const { eventName, startDate, endDate } = req.body
  // Save Event in the database
  Event.create([eventName, startDate, endDate], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event."
      })
    else res.status(201).send(data.rows) //TODO: check utility
  })
}
// Retrieve all Events from the database (with condition(s)).
exports.findAll = (req, res) => {
    const { eventName, startDate, endDate } = req.body
  Event.getAll([eventName, startDate, endDate], (err, data) => { //TODO: conditions
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all events."
      })
    else res.status(200).send(data.rows)
  })
}
// Find a single Event with a id
exports.findOne = (req, res) => {
  Event.findById([req.params.id], (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found Event with id " + req.params.id
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Event with id " + req.params.id
        })
      }
    } else res.status(200).send(data)
  })
}
// Update an Event identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  const { eventName, startDate, endDate } = req.body
  Event.updateById(
    [eventName, startDate, endDate],
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Not found Event with id " + req.params.id
          })
        } else {
          res.status(500).send({
            message: "Error updating Event with id " + req.params.id
          })
        }
      } else res.status(200).send(data.rows)
    }
  )
}
// Delete an Event with the specified id in the request
exports.delete = (req, res) => {
  Event.remove([req.params.id], (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found Event with id " + req.params.id
        })
      } else {
        res.status(500).send({
          message: "Could not delete Event with id " + req.params.id
        })
      }
    } else res.status(200).send({ message: "Event was deleted successfully!" })
  })
}
//TODO: check utility
// // Delete all Events from the database.
// exports.deleteAll = (req, res) => {
//   Event.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all events."
//       })
//     else res.send({ message: `All Events were deleted successfully!` })
//   })
// }
