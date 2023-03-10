const mongoose = require("mongoose");
// const User = require("./user")
// const Post = require("./post")

const commentSchema = new mongoose.Schema({

    "comment": {
        type: String
    },

    "postId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },

    "userId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Comment", commentSchema)