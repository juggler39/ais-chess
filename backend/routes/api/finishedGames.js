const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const GlobalChat = mongoose.model('GlobalChat');
const OpenedGame = mongoose.model('OpenGame');



module.exports = router;