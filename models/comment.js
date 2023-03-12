const mongoose = require("mongoose");


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
    },

    "deleted":{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Comment", commentSchema)