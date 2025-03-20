const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//JS function to generate random 8 character id
function randomId(length = 8){
    return Math.random().toString(36).substring(2, 2 +length).toUpperCase();
}


const usersSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        default: () => randomId(8)
    },
    friendId: {
        type: String,
        unique: true,
        default: () => randomId(8)
    },
    username: {
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
        unique: true
    },
    //Array of objects to store friends list and a friend requests list
    // friendsList:[{
    //     type: String,
    //     ref: "User"
    // }],
    // friendRequests: [{
    //     type: String, 
    //     ref: "User"
    // }]
});

//Create model
module.exports = mongoose.model("User", usersSchema);