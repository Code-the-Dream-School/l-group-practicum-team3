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
  quantity: Joi.string().max(50).allow(null, ""),
  unit: Joi.string().max(50).allow(null, ""),
}).min(1);

const wishlistClearSchema = Joi.object({
  confirm: Joi.boolean().valid(true).required(),
});

module.exports = {
  wishlistItemSchema,
  wishlistItemsSchema,
  wishlistUpdateSchema,
  wishlistClearSchema,
};
