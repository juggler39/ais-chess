const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const Users = mongoose.model("Users");
const FinishedGame = mongoose.model("FinishedGame");
const OpenedGame = mongoose.model("OpenGame");

router.post("/finish-game", auth.required, (req, res, next) => {
	const { payload: { id } } = req;
	const { body: { game } } = req;

	return Users.findById(id)
		.then((user) => {
			if(!user) {
				return res.json({ user: "Access is denied" });
			}
			//access is allowed
			OpenedGame.findByIdAndDelete(game.id, async (err, gameFound) => {
				if (err){
					console.log(err);  
				} else {
					const newGame = new FinishedGame();
					newGame.players = gameFound.players;
					newGame.moves = gameFound.moves;
					newGame.timeToGo = gameFound.timeToGo;
					newGame.timeWhite = game.timeWhite;
					newGame.timeBlack = game.timeBlack;
					newGame.winner = game.winner;

					newGame.save().then(async (gameSaved) => {
						let R1, R2, E1, E2, S1, S2;
						console.log(gameSaved.players.player1Rating);
						console.log(gameSaved.players.player2Rating);

						R1 = Math.pow(10, gameSaved.players.player1Rating/400);
						R2 = Math.pow(10, gameSaved.players.player2Rating/400);
						console.log(R1 + " " + R2);

						console.log(gameSaved.players.player1Rating);
						console.log(gameSaved.players.player2Rating);

						E1 = gameSaved.players.player1Rating / (gameSaved.players.player1Rating + gameSaved.players.player2Rating);
						E2 = gameSaved.players.player2Rating / (gameSaved.players.player1Rating + gameSaved.players.player2Rating);

						console.log(E1 + " " + E2);
						if (gameSaved.players.player1Color === gameSaved.winner) { 
							S1 = 1;
							S2 = 0;
						} else if ((gameSaved.players.player2Color === gameSaved.winner)) {
							S1 = 0;
							S2 = 1;
						}
						else {
							S1 = 0.5;
							S2 = 0.5;
						}
						console.log(S1 + " " + S2);

						let finalElo1 = Math.round(gameSaved.players.player1Rating + 32 * (S1 - E1));
						let finalElo2 = Math.round(gameSaved.players.player2Rating + 32 * (S2 - E2));
						console.log(finalElo1 + " " + finalElo2);

						await  Users.findOne({_id: gameFound.players.player1ID}).then(userFound => {
							userFound.activeGame = "";
							userFound.rating = finalElo1;
							userFound.save();
						});
						await  Users.findOne({_id: gameFound.players.player2ID}).then(userFound => {
							userFound.activeGame = "";
							userFound.rating = finalElo2;
							userFound.save();
						});
						
						gameSaved.players.player1Rating = finalElo1;
						gameSaved.players.player2Rating = finalElo2;

						res.json({ game: gameSaved.toJSON() });
					});
				}
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
