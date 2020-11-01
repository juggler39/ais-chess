const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const Users = mongoose.model("Users");
const OpenedGame = mongoose.model("OpenGame");

router.post("/open-game", auth.required, (req, res, next) => {
	const { payload: { id } } = req;

	return Users.findById(id)
		.then((user) => {
			if(!user) {
				return res.json({ user: "Access is denied" });
			}
			//access is allowed
			const newGame = new OpenedGame();
			newGame.players.player1 = user.name;
			newGame.players.player1Rating = user.rating;
			newGame.save().then(() => res.json({ game: newGame.toJSON() }));
		});
});

router.get("/open-game-info", auth.required, (req, res, next) => {
	const { payload: { id } } = req;

	return Users.findById(id)
		.then((user) => {
			if(!user) {
				return res.json({ user: "Access is denied" });
			}
			//access is allowed
			OpenedGame.findById(user.activeGame).then((game) => {
				res.json({game: game.toJSON()});
			})
			.catch(err => console.log(err));
		});
});

router.post("/open-game-message", auth.required, (req, res, next) => {
	const { payload: { id } } = req;
	const { body: { gameUser } } = req;

	return Users.findById(id)
		.then((user) => {
			if(!user) {
				return res.json({ user: "Access is denied" });
			}
			//access is allowed
			OpenedGame.findById(gameUser.id)
				.then((game) => {
					if(!game) {
						return res.json({ game: "Game doesn't exists" });
					}
					//game exists
					let message = {player: user.name, message: gameUser.message};
					let arr = game.chat;

					arr.push(message);
					game.chat = arr;

					game.save()
						.then(() => res.json({ game: game.toJSON() }))
						.catch(err => console.log(err));
				}).catch((err) => {res.json({error: err});});
		}).catch((err) => {res.json({error: err});});
});

router.post("/open-game-move", auth.required, (req, res, next) => {
	const { payload: { id } } = req;
	const { body: { gameUser } } = req;

	return Users.findById(id)
		.then((user) => {
			if(!user) {
				return res.json({ user: "Access is denied" });
			}
			//access is allowed
			OpenedGame.findById(gameUser.id)
				.then((game) => {
					if(!game) {
						return res.json({ game: "Game doesn't exists" });
					}
					//game exists
					let move = { from: gameUser.from, to: gameUser.to };
					let arr = game.moves;

					arr.push(move);
					game.moves = arr;
                
					game.save()
						.then(() => res.json({ game: game.toJSON() }))
						.catch(err => console.log(err));
				}).catch((err) => {res.json({error: err});});
		}).catch((err) => {res.json({error: err});});
});

module.exports = router;
