const App = require("express")();
const consign = require("consign");
const db = require("./config/db.js");
const mongoose = require("mongoose");
require("./config/mongodb.js");

App.db = db;
App.mongoose = mongoose;

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./schedule")
  .then("./config/routes.js")
  .into(App);

App.listen(5000, () => {
  console.log("BackEnd executando....");
});
