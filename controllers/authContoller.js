const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const joiValidator = require("../utilities/userValidator");
require("dotenv").config()


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

    async login(req, res){

        try {
            const userData = await User.findOne({$or:[{email: req.body.email}, {username: req.body.username.toLowerCase()}]});

            if (userData) {
                
                if (bcrypt.compareSync(req.body.password, userData.password)) {
                    let jwt_token = jwt.sign({data: userData}, process.env.JWT_SECRET, {expiresIn: '12h'})

                    return res.status(200).send({
                        message: "Login successfully",
                        data: userData,
                        token: jwt_token
                    })
                } else {
                    return res.status(400).send("Invalid Credential");
                }
            } else {
                return res.status(400).send("Invalid email or username is taken");
            }
        } catch (error) {
            return res.status(400).send({
                message: "Invalid Credential"
            })
        }
    }
}

module.exports = new AuthController();