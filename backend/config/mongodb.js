const { mongoUrl } = require("../.env");
const mongoose = require("mongoose");
mongoose.connect(mongoUrl, { useNewUrlParser: true }).catch((e) => {
  const msg = "Não foi conectado ao mongoDB";
  console.log("\x1b[41m%s\x1b[32m", msg, "\x1b[0m");
});
