const User = require("../models/userModel");
const joiValidator = require("../utilities/userValidator");


class AuthController {

    async register(req, res){
        // Validating user input data
        const {error, value} = joiValidator.validate(req.body);
        if(error){
            return res.status(422).send("Invalid input")
        }

        const exist = await User.findOne({$or:[{email: req.body.email}, {username: req.body.username}]});
        if(exist){
            return res.status(400).send("The email or username is taken");
        }

        try {

            const newUser = await User.create(req.body);

            return res.status(201).send({
                message: "Registered successfully",
                data: newUser
            })
        } catch (error) {
            return res.status(400).send({
                message: error.message,
                data:error
            })
        }
    }
}

module.exports = new AuthController();