const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const FinishedGame = mongoose.model('FinishedGame');
const OpenedGame = mongoose.model('OpenGame');

router.post('/finish-game', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
    const { body: { game } } = req;

    return Users.findById(id)
        .then((user) => {
        if(!user) {
            return res.json({ user: "Access is denied" });
        }
        //access is allowed
        OpenedGame.findByIdAndDelete(game.id, (err, gameFound) => {
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

                newGame.save().then(() => res.json({ game: newGame.toJSON() }));
            }
        })
    });
});

router.post('/get-finish-game', auth.required, (req, res, next) => {
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
                }).catch((err) => {res.json({error: err})});
        }).catch((err) => {res.json({error: err})});
});

module.exports = router;