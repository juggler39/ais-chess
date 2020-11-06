const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
const sockets = require("./sockets/main");
const { UserRefreshClient } = require("google-auth-library");

require("dotenv").config();

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

//Initiate our app
const app = express();
let server;
if (isProduction) {
	const https = require("https");
	const fs = require("fs");
	const options = {
		key: fs.readFileSync(
			"/etc/letsencrypt/live/chess.edu2020.devais.work/privkey.pem"
		),
		cert: fs.readFileSync(
			"/etc/letsencrypt/live/chess.edu2020.devais.work/fullchain.pem"
		),
	};
	server = https.createServer(options, app);
} else {
	const http = require("http");
	server = http.createServer(app);
}

sockets(server, isProduction);

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

let port = process.env.PORT;
let host = process.env.HOST;

server.listen(port, host, () => console.log(`Server running on http://${host}:${port}/`));
