const mongoose = require('mongoose');

const { Schema } = mongoose;

const GlobalChatSchema = new Schema({
  userName: String,
  user: String,
  message: String,
  time: String,
  timeCreated: { type: Date, default: Date.now }
});

GlobalChatSchema.methods.toJSON = function() {
    return {
      userName: this.userName,
      user: this.user,
      message: this.message,
      time: this.time
    };
};

GlobalChatSchema.index({ user: 1 });
GlobalChatSchema.index({ timeCreated: -1 }, { expireAfterSeconds: 86400 }); //store messages 24 hours, then delete

mongoose.model('GlobalChat', GlobalChatSchema);