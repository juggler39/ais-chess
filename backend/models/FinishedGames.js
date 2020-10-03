const mongoose = require('mongoose');

const { Schema } = mongoose;

const FinishedGameSchema = new Schema({
  gameDate: { type: Date, default: Date.now },
  players: {player1: String, player2: String},
  moves: [String],
});

FinishedGameSchema.methods.toJSON = function() {
    return {
      gameDate: this.gameDate,
      players: this.players,
      moves: this.moves,
    };
};

FinishedGameSchema.index({ players: 1, startDate: -1 });

mongoose.model('FinishedGame', FinishedGameSchema);