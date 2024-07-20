const { Schema, model } = require("mongoose");

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Player = model("Player", PlayerSchema);

module.exports = Player;
