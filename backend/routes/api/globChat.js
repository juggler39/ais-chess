const mongoose = require('mongoose');
const router = require('express').Router();
const Users = mongoose.model('Users');
const GlobalChat = mongoose.model('GlobalChat');

/*router.post('/message', auth.optional, (req, res, next) => {
  const { body: { chat } } = req;

  const finalMessage = new GlobalChat(chat);
  return finalMessage.save()
    .then(() => res.json({ chat: "Done." }));
});*/

module.exports = router;