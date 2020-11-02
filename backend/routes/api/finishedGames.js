const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const Users = mongoose.model("Users");
const FinishedGame = mongoose.model("FinishedGame");
const OpenedGame = mongoose.model("OpenGame");

router.post("/finish-game", auth.required, (req, res, next) => {
	const { payload: { id } } = req;
	const { body: { game } } = req;

	return Users.findById(id, (err, user) => {
		if(!user || err) {
			return res.json({ user: "Access is denied" });
		}
		//access is allowed
		OpenedGame.findByIdAndDelete(game.id, async (err, gameFound) => {
			if (err){
				console.log(err);  
			}
			const newGame = new FinishedGame();
			newGame.players = gameFound.players;
			newGame.moves = gameFound.moves;
			newGame.timeToGo = gameFound.timeToGo;
			newGame.timeWhite = game.timeWhite;
			newGame.timeBlack = game.timeBlack;
			newGame.winner = game.winner;

			let gameSaved = await newGame.save();

			Users.findOne({_id: gameSaved.players.player1ID}).then(userFound => {
				userFound.activeGame = "";
				userFound.rating = game.finalElo1;
				userFound.save();
			});

			Users.findOne({_id: gameSaved.players.player2ID}).then(userFound => {
				userFound.activeGame = "";
				userFound.rating = game.finalElo2;
				userFound.save();
			});

			res.json({ game: gameSaved.toJSON() });
		});
	});			
});

router.post("/get-finish-game", auth.required, (req, res, next) => {
	const { payload: { id } } = req;
	const { body: { gameId } } = req;

	return Users.findById(id)
		.then((user) => {
			if(!user) {
				return res.json({ user: "Access is denied" });
			}
			//access is allowed
			FinishedGame.findById(gameId.id)
				.then((game) => {
					if(!game) {
						return res.json({ game: "Game doesn't exists" });
					}
					//game exists
					res.json({ game: game.toJSON() });
				}).catch((err) => {res.json({error: err});});
		}).catch((err) => {res.json({error: err});});
});

router.get("/get-played-games", auth.required, (req, res, next) => {
	const { payload: { id } } = req;

	return Users.findById(id)
		.then((user) => {
			if(!user) {
				return res.json({ user: "Access is denied" });
			}
			//access is allowed
			FinishedGame.find({"$or": [{"players.player1ID": user._id}, {"players.player2ID": user._id}]})
				.then((gamesPlayed) => {
					if(gamesPlayed.length === 0) {
						return res.json({ games: ["No played games"]});
					}
					//games exists
					res.json({ games: gamesPlayed });
				}).catch((err) => {res.json({error: err});});
		}).catch((err) => {res.json({error: err});});
});

module.exports = router;
