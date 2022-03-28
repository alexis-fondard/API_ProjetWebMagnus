module.exports = app => {
  const place = require("../controllers/place.controller.js")
  var router = require("express").Router()
  // Create a new Place
  router.post("/", place.create)
  // Retrieve all Places
  router.get("/", place.findAll)
  // Retrieve a single Place with id
  router.get("/:id", place.findOne)
  // Update a Place with id
  router.put("/:id", place.update)
  // Delete a Place with id
  router.delete("/:id", place.delete)
  //TODO: check utility
  // // Delete all Places
  // router.delete("/", place.deleteAll)
  app.use('/api/Place', router)
}