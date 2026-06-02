const Joi = require("joi");

const categories = [
  "dairy",
  "meat",
  "fruit",
  "vegetable",
  "spice",
  "condiment",
  "canned",
  "other",
];

const units = ["kg", "g", "lb", "oz", "l", "ml", "cup", "tbsp", "tsp", "piece"];

const wishlistItemSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  quantity: Joi.number().positive(),
  unit: Joi.string()
    .lowercase()
    .valid(...units)
    .allow(null, ""),
  category: Joi.string()
    .lowercase()
    .valid(...categories)
    .required(),
});

// Accepts a single item OR an array of items — used in POST /api/wishlist
const wishlistItemsSchema = Joi.alternatives().try(
  wishlistItemSchema,
  Joi.array().items(wishlistItemSchema).min(1).max(50)
);

const wishlistUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(100),
  quantity: Joi.number().positive(),
  unit: Joi.string()
    .lowercase()
    .valid(...units)
    .allow(null, ""),

  category: Joi.string()
    .lowercase()
    .valid(...categories),
}).min(1);

module.exports = {
  wishlistItemSchema,
  wishlistItemsSchema,
  wishlistUpdateSchema,
};