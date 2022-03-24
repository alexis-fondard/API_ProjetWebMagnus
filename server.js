require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// // initialize sequelize, call to sync() method
// const db = require("./app/models")
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.")
// })
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Lexay's application." })
})
require("./app/routes/user.routes")(app)
// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})