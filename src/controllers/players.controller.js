const Joi = require("joi");
const Player = require("../models/player.model");

const getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json({ message: "Success", data: players });
  } catch (error) {
    next(error);
  }
};

const getPlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ message: "Player not found!" });
    }
    res.json({ message: "Success", data: player });
  } catch (error) {
    next(error);
  }
};

const createPlayer = async (req, res) => {
  try {
    const { name, age, rating, country } = req.body;

    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().integer().min(1).max(100).required(),
      rating: Joi.number().required(),
      country: Joi.string().required(),
    });

    const { error } = schema.validate({ name, age, rating, country });
    if (error) return res.status(400).json({ message: error.message });

    const newPlayer = await Player.create({ name, age, rating, country });
    res.status(201).json({ message: "Success!", data: newPlayer });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, rating, country } = req.body;

    const schema = Joi.object({
      name: Joi.string(),
      age: Joi.number().integer().min(1).max(100),
      rating: Joi.number(),
      country: Joi.string(),
    });

    const { error } = schema.validate({ name, age, rating, country });
    if (error) return res.status(400).json({ message: error.message });

    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      { $set: { name, age, rating, country } },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found!" });
    }

    res.json({ message: "Success", data: updatedPlayer });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlayer = await Player.findByIdAndDelete(id);

    if (!deletedPlayer) {
      return res.status(404).json({ message: "Player not found!" });
    }

    res.json({ message: "Success", deletedPlayer: deletedPlayer });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
