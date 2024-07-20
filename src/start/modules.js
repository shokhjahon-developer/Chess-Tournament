require("dotenv/config");
const cookie = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("../middlewares/error.handler");

const authRoute = require("../routes/auth.route");
const playersRoute = require("../routes/players.route");
const tournamentsRoute = require("../routes/tournaments.route");
const matchsRoute = require("../routes/matchs.route");

const modules = async (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookie());

  app.use("/api/auth", authRoute);
  app.use("/api/players", playersRoute);
  app.use("/api/tournaments", tournamentsRoute);
  app.use("/api/matchs", matchsRoute);

  app.use(errorHandler);
};

module.exports = modules;
