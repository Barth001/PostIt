const mongoose = require("mongoose");
const User = require("./user")

const postSchema = mongoose.Schema({

    "title": String,
    "body": String,
    "createdBy": {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    }
    
},{
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema)