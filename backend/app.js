const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
const http = require("http");
const io = require("socket.io");
const { UserRefreshClient } = require("google-auth-library");

require("dotenv").config();

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

//Initiate our app
const app = express();
const server = http.createServer(app);
const socketIO = io(server);

//Configure our app
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: process.env.SECRET_SESSION, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
	app.use(errorHandler());
}

mongoose.Promise = global.Promise;
mongoose.set("debug", true);
mongoose.connection
	.on("error",error => console.log(error))
	.on("close", ()=>console.log("DB connection closed."))
	.once("open", () => {
		const info = mongoose.connections[0];
		console.log(`Connection to ${info.host}:${info.port}/${info.name}`);
	});
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false});

//Models & routes
require("./models/Users");
require("./models/GlobalChat");
require("./models/FinishedGames");
require("./models/OpenGames");
require("./config/passport");
app.use(require("./routes"));

//Error handlers & middlewares
if(!isProduction) {
	app.use((err, req, res) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message,
				error: err,
			},
		});
	});
}

app.use((err, req, res) => {
	res.status(err.status || 500);
	res.json({
		errors: {
			message: err.message,
			error: {},
		},
	});
});

app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		return res.json({
			success: false,
			message: "No token provided."
		});
	}
});

const GlobalChat = mongoose.model("GlobalChat");
const OpenGame = mongoose.model("OpenGame");
const Users = mongoose.model("Users");

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
		socketIO.to(result.id).emit("gameOver", result.result);
	})

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
		OpenGame.findOneAndUpdate({ _id: player2info.gameId }, { $set: { isOpen: false, "players.player2ID":  player2info.player2ID, "players.player2Name": player2info.player2Name}}, (err, gameFound) => {
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

	socket.on('accept', (id) => {
		socket.broadcast.to(id).emit('drawAccepted');
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

let port = process.env.PORT;
let host = process.env.HOST;

server.listen(port, host, () => console.log(`Server running on http://${host}:${port}/`));
