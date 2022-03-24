module.exports = app => {
  const user = require("../controllers/user.controller.js");
  var router = require("express").Router();
  // Create a new User
  router.post("/", user.create);
  // Retrieve all Users
  router.get("/", user.findAll);
  // Retrieve all members
  router.get("/members", user.findAllMembers);
  // Retrieve all CA members
  router.get("/CA", user.findAllCA);
  // Retrieve a single User with id
  router.get("/:id", user.findOne);
  // Update a User with id
  router.put("/:id", user.update);
  // Delete a User with id
  router.delete("/:id", user.delete);
  //TODO: check utility
  // // Delete all Users
  // router.delete("/", user.deleteAll);
  app.use('/api/user', router);
};