const mongoose = require("mongoose");
const { User } = require("discord.js");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senderId: { 
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipientId: { 
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { 
    type: String,
    required: true, 
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);