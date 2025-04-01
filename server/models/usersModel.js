const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Function to generate a discriminator to append to usernames
function discriminatorGenerator(){
    return "#" + Math.floor(1000 + Math.random() * 9000).toString();
}

const usersSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    discriminator: {
        type: String,
        required: true,
        default: discriminatorGenerator
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
        default: null
    },
    //Array of objects to store friends list and a friend requests list
    friendsList:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    friendRequests: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

//Make the username and discriminator combo unique
//Create a compound index so that mongoDb can scan just the index 
//instead of the whole collection, this will be used for friend requests
usersSchema.index({username: 1, discriminator: 1}, {unique: true});

//Create model
module.exports = mongoose.model("User", usersSchema);