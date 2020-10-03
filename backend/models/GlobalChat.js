const mongoose = require('mongoose');

const { Schema } = mongoose;

const GlobalChatSchema = new Schema({
  user: String,
  message: String,
  time: { type: Date, default: Date.now },
});

GlobalChatSchema.methods.toJSON = function() {
    return {
      user: this.user,
      message: this.message,
      time: this.time
    };
};

GlobalChatSchema.index({ user: 1 });
GlobalChatSchema.index({ time: -1 }, { expireAfterSeconds: 86400 }); //store messages 24 hours, then delete

mongoose.model('GlobalChat', GlobalChatSchema);