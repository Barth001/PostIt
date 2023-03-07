const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "firstName": {
        type: String,
        minLength: 3,
        maxLength: 40,
        unique: true
    },

    "lastName": {
        type: String,
        minLength: 3,
        maxLength: 40,
        unique: true
    },
    "username": {
        type: "@" + String,
        required: true,
        minLength: 3,
        maxLength: 40,
        unique: true
    },

    "email": String,

    "password": String,

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema);