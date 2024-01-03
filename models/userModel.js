const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: [true, 'User must have an username']
    },
    password: {
        type: String,
        require: [true, "User must have a password"]
    },
});
const User = mongoose.model("User",userSchema);
module.exports = User;