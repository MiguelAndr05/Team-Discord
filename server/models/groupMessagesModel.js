const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupMessageSchema = new Schema({
    authorId: {
        type: String,
        ref: "User",
    },
    content: {
        type: String,
    },
    imageUrl: {
        type: String
    },
    timeSent: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("GroupMessages", groupMessageSchema);