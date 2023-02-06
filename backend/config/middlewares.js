const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = (App) => {
  App.use(bodyParser.json());
  App.use(cors());
};
