const Joi = require("joi");

const favoriteRecipeSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
});

module.exports = { favoriteRecipeSchema };
