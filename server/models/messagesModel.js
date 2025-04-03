const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
       ref: "User", 
       required: true
    },
    receiverId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
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

module.exports = mongoose.model("Messages", messageSchema); 