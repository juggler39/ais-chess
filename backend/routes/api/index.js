const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/global-chat', require("./globChat"));
router.use('/open-games', require("./openGames"));
router.use('/finished-games', require("./finishedGames"));

module.exports = router;