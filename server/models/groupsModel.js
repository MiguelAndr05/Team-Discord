const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupsSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
    memberList: [{
        type: String,
        ref: "User"
    }],
})

module.exports = mongoose.model("Group", groupsSchema);