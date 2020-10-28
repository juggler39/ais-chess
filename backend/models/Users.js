const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const UsersSchema = new Schema({
	email: String,
	name: String,
	login: String,
	hash: String,
	salt: String,
	activeGame: String,
	logo: Object,
	bio: String
});

UsersSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 256, "sha512").toString("hex");
};

UsersSchema.methods.validatePassword = function(password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 256, "sha512").toString("hex");
	return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 7);

	return jwt.sign({
		login: this.login,
		id: this._id,
		exp: parseInt(expirationDate.getTime() / 1000, 10),
	}, "secret");
};

UsersSchema.methods.toAuthJSON = function() {
	return {
		id: this._id,
		name: this.name,
		email: this.email,
		token: this.generateJWT(),
		activeGame: this.activeGame,
		logo: this.logo,
		bio: this.bio
	};
};

UsersSchema.index({ login: 1 });
UsersSchema.index({ email: 1 });

<<<<<<< HEAD
<<<<<<< HEAD
mongoose.model("Users", UsersSchema);
=======
mongoose.model("Users", UsersSchema);
>>>>>>> refactor: add and apply eslint
=======
mongoose.model("Users", UsersSchema);
>>>>>>> refactor: add and apply eslint (backend)
