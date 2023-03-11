const User = require("../models/user");
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
                data: {
                    avater: newUser.userAvater,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    username: newUser.username,
                    email: newUser.email,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt
                    
                }
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
            const userData = await User.findOne({username: req.body.username.toLowerCase()});

            if (userData) {
                
                if (bcrypt.compareSync(req.body.password, userData.password)) {
                    let jwt_token = jwt.sign({data: userData}, process.env.JWT_SECRET, {expiresIn: '24h'})

                    return res.status(200).send({
                        message: "Login successfully",
                        data: {
                            avater: userData.userAvater,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            username: userData.username,
                            email: userData.email,
                            
                        },
                        token: jwt_token
                    })
                } else {
                    return res.status(400).send("Invalid Credential");
                }
            } else {
                return res.status(400).send("Invalid username or password");
            }
        } catch (error) {
            return res.status(400).send({
                message: "Invalid Credential"
            })
        }
    }
}

module.exports = new AuthController();