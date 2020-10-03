const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const GlobalChat = mongoose.model('GlobalChat');


/*router.post('/message', auth.optional, (req, res, next) => {
  const { body: { chat } } = req;

  const finalMessage = new GlobalChat(chat);
  return finalMessage.save()
    .then(() => res.json({ chat: "Done." }));
});*/


module.exports = router;