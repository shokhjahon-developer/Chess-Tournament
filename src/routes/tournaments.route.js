const { Router } = require("express");
const isAdmin = require("../middlewares/is-admin");
const {
  getTournaments,
  getTournament,
  createTournament,
  updateTournament,
  deleteTournament,
  leaderboard,
} = require("../controllers/tournaments.controller");
const isAuthedMiddleware = require("../middlewares/is-auth");

const router = Router();

router.get("/", isAuthedMiddleware, getTournaments);
router.get("/:id", isAuthedMiddleware, getTournament);
router.get("/leaderboard/:id", isAuthedMiddleware, leaderboard);
router.post("/", isAdmin, createTournament);
router.put("/:id", isAdmin, updateTournament);
router.delete("/:id", isAdmin, deleteTournament);

module.exports = router;
