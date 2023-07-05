const Joi = require("joi");
// Validation
const joiValidator = Joi.object().keys({
    firstName:  Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required().lowercase(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).required(),
    deleted: Joi.boolean()
})

module.exports = joiValidator;