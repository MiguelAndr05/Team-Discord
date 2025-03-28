const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: String,
        unique: true,
        default: null
    },
    //Array of objects to store friends list and a friend requests list
    friendsList:[{
        type: String,
        ref: "User"
    }],
    friendRequests: [{
        type: String, 
        ref: "User"
    }]
});

//Create model
module.exports = mongoose.model("User", usersSchema);