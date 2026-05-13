const Joi = require("joi");

const emailRequirements = Joi.string().email().required();
const passwordRequirements = Joi.string()
  .min(8)
  .pattern(/[0-9]/) // at least 1 number
  .pattern(/[^a-zA-Z0-9]/) // at least 1 symbol
  .required();

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: emailRequirements,
  password: passwordRequirements,
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: passwordRequirements,
});

module.exports = { registerSchema, loginSchema };
