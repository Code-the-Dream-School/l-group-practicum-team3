const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/[0-9]/) // at least 1 number
    .pattern(/[^a-zA-Z0-9]/) // at least 1 symbol
    .required(),
});

module.exports = { registerSchema };
