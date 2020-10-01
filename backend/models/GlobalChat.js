const mongoose = require('mongoose');

const { Schema } = mongoose;

const GlobalChatSchema = new Schema({
  user: String,
  message: String,
  time: { type: Date, default: Date.now },
});

GlobalChatSchema.index({ user: 1 });
GlobalChatSchema.index({ time: -1 }, { expireAfterSeconds: 86400 });

mongoose.model('GlobalChat', GlobalChatSchema);