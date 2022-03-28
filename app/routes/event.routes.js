module.exports = app => {
    const event = require("../controllers/event.controller.js")
    var router = require("express").Router()
    // Create a new Event
    router.post("/", event.create)
    // Retrieve all Events
    router.get("/", event.findAll)
    // Retrieve all members
    router.get("/members", event.findAllMembers)
    // Retrieve all CA members
    router.get("/CA", event.findAllCA)
    // Retrieve a single Event with id
    router.get("/:id", event.findOne)
    // Update a Event with id
    router.put("/:id", event.update)
    // Delete a Event with id
    router.delete("/:id", event.delete)
    //TODO: check utility
    // // Delete all Events
    // router.delete("/", event.deleteAll)
    app.use('/api/Event', router)
  }