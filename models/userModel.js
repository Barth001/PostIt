const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    "firstName": {
        type: String,
        minLength: 3,
        maxLength: 40,
    },

    "lastName": {
        type: String,
        minLength: 3,
        maxLength: 40,
    },
    "username": {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 40,
        unique: true
    },

    "email": {
        type: String,
        minLength: 3,
        maxLength: 40,
        unique: true
    },

    "password": String,

},
    {
        timestamps: true
    }
)

userSchema.pre('save', function(next){
    var user = this;
    // Hash only new password
    if(!user.isModified("password")) return next();

    // Generate salt
    bcrypt.genSalt(9, function(err, salt){
        if(err) return next(err);

        //Hash password before saving
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)

            // Override the clear text with hashed password, then save the hashed password
            user.password = hash;
            next();
        })
    })
})

module.exports = mongoose.model("User", userSchema);