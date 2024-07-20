const Joi = require("joi");
const Tournament = require("../models/tournament.model");
const Player = require("../models/player.model");
const getTournaments = async (req, res, next) => {
  try {
    const tournaments = await Tournament.find().populate("participants");
    res.json({ message: "Success", data: tournaments });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTournament = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findById(id).populate("participants");
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found!" });
    }
    res.json({ message: "Success", data: tournament });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const leaderboard = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tournament = await Tournament.findById(id).populate("participants");

    if (!tournament || !Array.isArray(tournament.participants)) {
      return res.status(404).json({ message: "No participants found!" });
    }

    const participantsWithRatings = tournament.participants
      .map((player) => ({
        name: player.name,
        rating: player.rating,
      }))
      .sort((a, b) => a.rating - b.rating);

    res.json({ message: "Success", data: participantsWithRatings });
  } catch (error) {
    next(error);
  }
};

const createTournament = async (req, res, next) => {
  try {
    const { name, startDate, endDate, participants } = req.body;

    const schema = Joi.object({
      name: Joi.string().required(),
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().required(),
      participants: Joi.array().items(Joi.string().hex().length(24)).required(),
    });

    const { error } = schema.validate({
      name,
      startDate,
      endDate,
      participants,
    });
    if (error) return res.status(400).json({ message: error.message });

    const existingParticipants = await Player.find({
      _id: { $in: participants },
    });
    if (existingParticipants.length !== participants.length) {
      return res
        .status(404)
        .json({ message: "One or more participants not found!" });
    }

    const newTournament = await Tournament.create({
      name,
      startDate,
      endDate,
      participants,
    });

    res.status(201).json({
      message: "Tournament created successfully!",
      data: newTournament,
    });
  } catch (error) {
    next(error);
  }
};

const updateTournament = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, startDate, endDate, participants } = req.body;

    const schema = Joi.object({
      name: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
      participants: Joi.array().items(Joi.string().hex().length(24)),
    });

    const { error } = schema.validate({
      name,
      startDate,
      endDate,
      participants,
    });
    if (error) return res.status(400).json({ message: error.message });

    const updatedTournament = await Tournament.findByIdAndUpdate(
      id,
      { $set: { name, startDate, endDate, participants } },
      { new: true }
    );

    if (!updatedTournament) {
      return res.status(404).json({ message: "Tournament not found!" });
    }

    res.json({ message: "Success", data: updatedTournament });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteTournament = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTournament = await Tournament.findByIdAndDelete(id);

    if (!deletedTournament) {
      return res.status(404).json({ message: "Tournament not found!" });
    }

    res.json({ message: "Success", data: deletedTournament });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getTournaments,
  getTournament,
  leaderboard,
  createTournament,
  updateTournament,
  deleteTournament,
};
