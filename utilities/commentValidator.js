const Joi = require("joi");
    
const joiValidator = Joi.object().keys({
    comment: Joi.string().max(200).required(),
})

module.exports = joiValidator;