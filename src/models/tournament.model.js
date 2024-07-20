const { Schema, model } = require("mongoose");

const TournamentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

const Tournament = model("Tournament", TournamentSchema);

module.exports = Tournament;
