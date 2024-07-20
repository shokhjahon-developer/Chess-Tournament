const { Router } = require("express");
const isAdmin = require("../middlewares/is-admin");
const {
  getMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
} = require("../controllers/matchs.controller");
const isAuthedMiddleware = require("../middlewares/is-auth");

const router = Router();

router.get("/", isAuthedMiddleware, getMatches);
router.get("/:id", isAuthedMiddleware, getMatch);
router.post("/", isAdmin, createMatch);
router.put("/:id", isAdmin, updateMatch);
router.delete("/:id", isAdmin, deleteMatch);

module.exports = router;
