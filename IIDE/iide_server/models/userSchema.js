const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    Author: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true,
        unique: true
    },
    Content: {
        type: String,
        required: true
    }
});

const users = new mongoose.model("users",userSchema);


module.exports = users;