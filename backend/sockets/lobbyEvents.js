const mongoose = require("mongoose");

require("../models/OpenGames");
require("../models/Users");

const OpenGame = mongoose.model("OpenGame");
const Users = mongoose.model("Users");

const lobbyEvents = {
	loadGames(socket) {
		OpenGame.find({ isOpen: true }, (err, allOpenGames) => {
			socket.emit("newGameInfo", allOpenGames);
		});
	},
	newGame(info, socket, io) {
		let Game = new OpenGame();

		Game.players.player1ID = info.playerID;
		Game.players.player1Name = info.playerName;
		Game.players.player1Color = info.color;
		Game.players.player1Rating = info.rating;
		Game.timeToGo = info.time;
		Game.isOpen = true;

		socket.join(Game._id);

		OpenGame.deleteMany({ "players.player1ID": info.playerID }).then(() => {
			Game.save().then(() => {
				OpenGame.find({ isOpen: true }, (err, allOpenGames) => {
					io.sockets.emit("newGameInfo", allOpenGames);
				})
					.catch(err => console.log(err));
			});
		})
			.catch(err => console.log(err));
	},
	connectToGame(player2info, socket, io) {
		OpenGame.findOneAndUpdate({ _id: player2info.gameId }, { $set: { isOpen: false, "players.player2ID":  player2info.player2ID, "players.player2Name": player2info.player2Name, "players.player2Rating": player2info.player2Rating }}, (err, gameFound) => {
			if (err) {
				console.log(err);
			} else {
				//define color for second player
				async function changeColor() {
					if (gameFound.players.player1Color === "white") gameFound.players.player2Color = "black";
					else if (gameFound.players.player1Color === "black") gameFound.players.player2Color = "white";
					else {
						let choise = Math.floor(Math.random() * Math.floor(2));

						if (choise === 1 ) {
							gameFound.players.player1Color = "white";
							gameFound.players.player2Color = "black";
						}
						else {
							gameFound.players.player1Color = "black";
							gameFound.players.player2Color = "white";
						}
					}
				}
				changeColor().then(() => {
					gameFound.save().then((gameSaved) => {
						Users.findOne({_id: gameSaved.players.player1ID}).then(userFound => {
							userFound.activeGame = gameSaved._id;
							userFound.save();
						});
						Users.findOne({_id: player2info.player2ID}).then(userFound => {
							userFound.activeGame = gameSaved._id;
							userFound.save();
						});

						OpenGame.find({ isOpen: true }, (err, allOpenGames) => {
							io.sockets.emit("newGameInfo", allOpenGames);
						});
					}).then(() => {
						OpenGame.find({ _id: player2info.gameId }, (err, game) => {
							socket.join(player2info.gameId);
							io.to(player2info.gameId).emit("startGame", game);
						});
					});
				});
			}
		});
	}
};

module.exports = lobbyEvents;
