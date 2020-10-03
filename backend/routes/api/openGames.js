const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const GlobalChat = mongoose.model('GlobalChat');
const OpenedGame = mongoose.model('OpenGame');


router.post('/open-game', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return Users.findById(id)
        .then((user) => {
        if(!user) {
            return res.json({ user: "Access is denied" });
        }
        //access is allowed
        const newGame = new OpenedGame();
        
        });
});


module.exports = router;