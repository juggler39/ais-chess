const io = require("socket.io");
const mongoose = require("mongoose");

require("../models/Users");
require("../models/GlobalChat");
require("../models/OpenGames");


const GlobalChat = mongoose.model("GlobalChat");
const OpenGame = mongoose.model("OpenGame");
const Users = mongoose.model("Users");

const sockets = (server) => {
	const socketIO = io(server);
    
	socketIO.on("connection", (socket) => {
		socket.on("disconnect", () => {
		});
    
		socket.on("send", (msg) => {
			let Message = new GlobalChat();
			Message.userName = msg.userName;
			Message.user = msg.id;
			Message.message = msg.message;
			Message.time = msg.time;
			Message.save().then(() => {socketIO.sockets.emit("add", msg);})
				.catch(err => console.log(err));
		});
    
		socket.on("move", (data) => {
			OpenGame.updateOne({_id: data.game}, {"$push": { "moves": data.move }}).then(() => {
				socketIO.to(data.game).emit("newMove", data);
			})
				.catch(err => console.log(err));
		});
    
		socket.on("gameOver", result => {
			socket.broadcast.to(result.id).emit("gameOver", result.result);
		});
    
		socket.on("getGlobalChatMessages", () => {
			GlobalChat.find({}, (err, messages) => {
				socketIO.sockets.emit("allMessages", messages);
			});
		});
    
		socket.on("playerMessage", (data) => {
			OpenGame.updateOne({ _id: data.id }, { "$push": { "chat": data.message }}).then(() => {
				socketIO.to(data.id).emit("newMessage", data.message);
			})
				.catch(err => console.log(err));
		});
    
		socket.on("loadGames", () => {
			OpenGame.find({ isOpen: true }, (err, allOpenGames) => {
				socket.emit("newGameInfo", allOpenGames);
			});
		});
    
		socket.on("newGame", (info) => {
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
						socketIO.sockets.emit("newGameInfo", allOpenGames);
					})
						.catch(err => console.log(err));
				});
			})
				.catch(err => console.log(err));
		});
    
		socket.on("connectToGame", player2info => {
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
								socketIO.sockets.emit("newGameInfo", allOpenGames);
							});
						}).then(() => {
							OpenGame.find({ _id: player2info.gameId }, (err, game) => {
								socket.join(player2info.gameId);
								socketIO.to(player2info.gameId).emit("startGame", game);
							});
						});
					});
				}
			});
		});
    
		socket.on("draw", id => {
			socket.broadcast.to(id).emit("drawProposal");
		});
    
		socket.on("resign", id => {
			socket.broadcast.to(id).emit("opponentResign");
		});
    
		socket.on("accept", (id) => {
			socket.broadcast.to(id).emit("drawAccepted");
		});
        
		socket.on("joinRoom", id => {
			socket.join(id);
    
			OpenGame.find({ _id: id }, (err, game) => {
				if (err) {
					console.log(err);
				} else if (id && game[0]) {
					socketIO.to(id).emit("allMoves", game[0].moves);
					socketIO.to(id).emit("playersChat", game[0].chat);
				}
			});
		});
	});
};

module.exports = sockets;
