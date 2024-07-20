const { Schema, model } = require("mongoose");

const MatchSchema = new Schema({
  tournament: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
  player1: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  player2: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    default: null, // Can be null in case of a bye
  },
  result: {
    type: String,
    enum: ["1-0", "0-1", "0.5-0.5", "pending"],
    default: "pending",
  },
  isBye: {
    type: Boolean,
    default: false,
  },
});

const Match = model("Match", MatchSchema);

module.exports = Match;
