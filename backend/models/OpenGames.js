const mongoose = require("mongoose");

const { Schema } = mongoose;

const OpenGameSchema = new Schema({
	players: { player1ID: String, player1Name: String, player1Color: String, player2ID: String, player2Name: String, player2Color: String },
	startDate: { type: Date, default: Date.now },
	timeToGo: Number,
	moves: [ Object ],
	chat: [{ userName: String, user: String, message: String, time: String }],
	isOpen: Boolean
});

OpenGameSchema.methods.toJSON = function() {
	return {
		id: this._id,
		players: this.players,
		startDate: this.startDate,
		timeToGo: this.timeToGo,
		moves: this.moves,
		chat: this.chat,
		isOpen: this.isOpen
	};
};

OpenGameSchema.index({ players: 1, startDate: -1 });

mongoose.model("OpenGame", OpenGameSchema);