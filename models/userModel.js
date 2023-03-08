const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
// const getRandomAvatarStyle = require("../utilities/avater")

const userSchema = new mongoose.Schema({
    "userAvater": {
        type: String,
        default: ''
    },

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

    "role": {
        type: String,
        default: "visitor"
    }

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

const avatarStyles = [
    'adventurer',
    'adventurer-neutral',
    'avataaars',
    'avataaars-neutral',
    'big-ears',
    'big-ears-neutral',
    'big-smile',
    'bottts',
    'bottts-neutral',
    'croodles',
    'croodles-neutral',
    'fun-emoji',
    'icons',
    'identicon',
    'initials',
    'lorelei',
    'lorelei-neutral',
    'micah',
    'miniavs',
    'open-peeps',
    'personas',
    'pixel-art',
    'pixel-art-neutral',
    'shapes',
    'thumbs'
];


const getRandomAvatarStyle = () => {
 // Your code here
const random = Math.floor(Math.random() * avatarStyles.length);
return avatarStyles[random];
}

userSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified("email")) return next();


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      
        const _email = user.email.replaceAll(' ', '');
      
      
        const isValidEmail = emailRegex.test(_email);
        if (!isValidEmail) {
          throw new Error('Invalid email')
       }
      
      
       const entropySource = () => Math.random().toString(36).substring(2,7);
      
      
       const replaceAt = `-${entropySource()}-`
       const replaceDot = `-${entropySource()}-`
      
      
       const seed = _email.replace('@', replaceAt).replaceAll('.', replaceDot);
      
      
       const randomAvatarStyle = getRandomAvatarStyle();
      
      
       if (!randomAvatarStyle || !avatarStyles.includes(randomAvatarStyle)) {
         // console.error('Invalid avatar style') // log this error to the console
         throw new Error('Something failed: ')
       }
      
      
       const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;
      
      
        user.userAvater = avatarUrl;
      next()
    
})

module.exports = mongoose.model("User", userSchema);