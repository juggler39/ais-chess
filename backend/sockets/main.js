const io = require("socket.io");
const mongoAdapter = require("socket.io-adapter-mongo");
const gameEvents = require("./gameEvents");
const lobbyEvents = require("./lobbyEvents");
const globalChatEvents = require("./globalChatEvents");
const playersChatEvents = require("./playersChatEvents");

const sockets = (server) => {
	
	const socketIO = io(server);
	socketIO.adapter(mongoAdapter(process.env.MONGO_URL));
    
	socketIO.on("connection", (socket) => {

		socket.on("playerMessage", data => playersChatEvents.playerMessage(data, socketIO));

		socket.on("loadGames", () => lobbyEvents.loadGames(socket));
		socket.on("newGame", data => lobbyEvents.newGame(data, socket, socketIO));
		socket.on("connectToGame", data => lobbyEvents.connectToGame(data, socket, socketIO));

		socket.on("joinRoom", data => gameEvents.joinRoom(data, socket, socketIO));
		socket.on("move", data => gameEvents.move(data, socketIO));
		socket.on("gameOver", data => gameEvents.gameOver(data, socket));
		socket.on("draw", data => gameEvents.draw(data, socket));
		socket.on("resign", data => gameEvents.resign(data, socket));
		socket.on("accept", data => gameEvents.accept(data, socket));

		socket.on("send", data => globalChatEvents.send(data, socketIO));
		socket.on("getGlobalChatMessages", data => globalChatEvents.getGlobalChatMessages(socketIO));
	});
};

module.exports = sockets;
