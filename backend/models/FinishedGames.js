const mongoose = require('mongoose');

const { Schema } = mongoose;

const FinishedGameSchema = new Schema({
  gameDate: { type: Date, default: Date.now },
  players: {player1ID: String, player1Name: String, player1Color: String, player2ID: String, player2Name: String, player2Color: String},
  moves: [String],
  winner: String
});

FinishedGameSchema.methods.toJSON = function() {
    return {
      id: this._id,
      gameDate: this.gameDate,
      players: this.players,
      moves: this.moves,
      winner: this.winner
    };
};

FinishedGameSchema.index({ players: 1, startDate: -1 });

mongoose.model('FinishedGame', FinishedGameSchema);