const Joi = require("joi");
    
const joiValidator = Joi.object().keys({
    title:  Joi.string().required(),
    body: Joi.string().max(200).required(),
})

module.exports = joiValidator;