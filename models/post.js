const mongoose = require("mongoose");
const User = require("./user")
const Comment = require("./comment");

const postSchema = new mongoose.Schema({

    "title": String,
    "body": String,
    "createdBy": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    "postComments": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }]
    
},{
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema)