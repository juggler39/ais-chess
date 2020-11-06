const mongoose = require("mongoose");

require("../models/GlobalChat");

const GlobalChat = mongoose.model("GlobalChat");

const globalChatEvents = {
	send(msg, io) {
		let Message = new GlobalChat();
		Message.userName = msg.userName;
		Message.user = msg.id;
		Message.message = msg.message;
		Message.time = msg.time;
		Message.save().then(() => {io.sockets.emit("add", msg);})
			.catch(err => console.log(err));
	},
	getGlobalChatMessages(io) {
		GlobalChat.find({}, (err, messages) => {
			io.sockets.emit("allMessages", messages);
		});
	}
};

module.exports = globalChatEvents;
