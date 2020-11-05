const mongoose = require("mongoose");

require("../models/OpenGames");

const OpenGame = mongoose.model("OpenGame");

const gameEvents = {
	joinRoom(id, socket, io) {
		socket.join(id);

		OpenGame.find({ _id: id }, (err, game) => {
			if (err) {
				console.log(err);
			} else if (id && game[0]) {
				io.to(id).emit("allMoves", game[0].moves);
				io.to(id).emit("playersChat", game[0].chat);
			}
		});
	},
	move(data, io) {
		OpenGame.updateOne({_id: data.game}, {"$push": { "moves": data.move }}).then(() => {
			io.to(data.game).emit("newMove", data);
		})
			.catch(err => console.log(err));
	},
	gameOver(result, socket) {
		socket.broadcast.to(result.id).emit("gameOver", result.result);
	},
	draw(id, socket) {
		socket.broadcast.to(id).emit("drawProposal");
	},
	resign(id, socket) {
		socket.broadcast.to(id).emit("opponentResign");
	},
	accept(id, socket) {
		socket.broadcast.to(id).emit("drawAccepted");
	}
};

module.exports = gameEvents;
