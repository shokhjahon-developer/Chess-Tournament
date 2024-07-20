const Joi = require("joi");
const Match = require("../models/match.model");
const Tournament = require("../models/tournament.model");
const Player = require("../models/player.model");

const getMatches = async (req, res, next) => {
  try {
    const matches = await Match.find()
      .populate("tournament", "name")
      .populate("player1", "name")
      .populate("player2", "name");
    res.json({ message: "Success", data: matches });
  } catch (error) {
    next(error);
  }
};

const getMatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id)
      .populate("tournament", "name")
      .populate("player1", "name")
      .populate("player2", "name");
    if (!match) {
      return res.status(404).json({ message: "Match not found!" });
    }
    res.json({ message: "Success", data: match });
  } catch (error) {
    next(error);
  }
};

const createMatch = async (req, res, next) => {
  try {
    const { tournament, round } = req.body;

    const tournamentData = await Tournament.findById(tournament).populate(
      "participants"
    );

    if (!tournamentData) {
      return res.status(404).json({ message: "Tournament not found!" });
    }

    const participants = tournamentData.participants;
    const ratingGroups = {};

    participants.forEach((player) => {
      const rating = player.rating;
      if (!ratingGroups[rating]) {
        ratingGroups[rating] = [];
      }
      ratingGroups[rating].push(player);
    });

    let pairings = [];
    let unpairedPlayers = [];

    Object.keys(ratingGroups).forEach((rating) => {
      const group = ratingGroups[rating];
      for (let i = 0; i < group.length; i += 2) {
        if (group[i + 1]) {
          pairings.push({
            tournament: tournament,
            round: round,
            player1: group[i]._id,
            player2: group[i + 1]._id,
          });
        } else {
          unpairedPlayers.push(group[i]);
        }
      }
    });

    while (unpairedPlayers.length > 1) {
      const player1 = unpairedPlayers.pop();
      const player2 = unpairedPlayers.pop();
      pairings.push({
        tournament: tournament,
        round: round,
        player1: player1._id,
        player2: player2._id,
      });
    }

    if (unpairedPlayers.length === 1) {
      const player = unpairedPlayers.pop();
      pairings.push({
        tournament: tournament,
        round: round,
        player1: player._id,
        player2: null,
        result: "pending",
        isBye: true,
      });
    }

    console.log("Pairings to be inserted:", pairings);

    const createdMatches = await Match.insertMany(pairings);

    res.status(201).json({
      message: "Matches created successfully!",
      data: createdMatches,
    });
  } catch (error) {
    next(error);
  }
};

const updateMatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tournament, round, player1, player2, result } = req.body;

    const schema = Joi.object({
      tournament: Joi.string().hex().length(24),
      round: Joi.number().integer().min(1),
      player1: Joi.string().hex().length(24),
      player2: Joi.string().hex().length(24),
      result: Joi.string().valid("1-0", "0-1", "0.5-0.5", "pending"),
    });

    const { error } = schema.validate({
      tournament,
      round,
      player1,
      player2,
      result,
    });
    if (error) return res.status(400).json({ message: error.message });

    if (tournament) {
      const existingTournament = await Tournament.findById(tournament);
      if (!existingTournament) {
        return res.status(404).json({ message: "Tournament not found!" });
      }
    }

    if (player1) {
      const existingPlayer1 = await Player.findById(player1);
      if (!existingPlayer1) {
        return res.status(404).json({ message: "Player 1 not found!" });
      }
    }

    if (player2) {
      const existingPlayer2 = await Player.findById(player2);
      if (!existingPlayer2) {
        return res.status(404).json({ message: "Player 2 not found!" });
      }
    }

    const updatedMatch = await Match.findByIdAndUpdate(
      id,
      { $set: { tournament, round, player1, player2, result } },
      { new: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found!" });
    }

    res.json({ message: "Success", data: updatedMatch });
  } catch (error) {
    next(error);
  }
};

const deleteMatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMatch = await Match.findByIdAndDelete(id);

    if (!deletedMatch) {
      return res.status(404).json({ message: "Match not found!" });
    }

    res.json({ message: "Success", data: deletedMatch });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
};
