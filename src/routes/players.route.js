const { Router } = require("express");
const isAdmin = require("../middlewares/is-admin");
const {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/players.controller");
const isAuthedMiddleware = require("../middlewares/is-auth");

const router = Router();

router.get("/", isAuthedMiddleware, getPlayers);
router.get("/:id", isAuthedMiddleware, getPlayer);
router.post("/", isAdmin, createPlayer);
router.put("/:id", isAdmin, updatePlayer);
router.delete("/:id", deletePlayer);

module.exports = router;
