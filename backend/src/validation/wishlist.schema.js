const Joi = require("joi");

const wishlistItemSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  quantity: Joi.string().max(50).optional().allow(null, ""),
  unit: Joi.string().max(50).optional().allow(null, ""),
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
    .valid("kg", "g", "lb", "oz", "l", "ml", "cup", "tbsp", "tsp", "piece")
    .allow(null, ""),
  category: Joi.string().valid(
    "dairy",
    "meat",
    "fruit",
    "vegetable",
    "spice",
    "condiment",
    "canned",
    "other"
  ),
  completed: Joi.boolean(),
}).min(1);

module.exports = {
  wishlistItemSchema,
  wishlistItemsSchema,
  wishlistUpdateSchema,
};
