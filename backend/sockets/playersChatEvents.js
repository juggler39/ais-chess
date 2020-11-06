const mongoose = require("mongoose");

require("../models/OpenGames");

const OpenGame = mongoose.model("OpenGame");

const playersChatEvents = {
	playerMessage(data, io) {
		OpenGame.updateOne({ _id: data.id }, { "$push": { "chat": data.message }}).then(() => {
			io.to(data.id).emit("newMessage", data.message);
		})
			.catch(err => console.log(err));
	}
};

module.exports = playersChatEvents;
