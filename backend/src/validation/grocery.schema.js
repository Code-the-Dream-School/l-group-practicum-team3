const Joi = require('joi');

const perishable = ['dairy', 'meat', 'fruit', 'vegetable'];

const nonPerisable = ['spice', 'condiment', 'anned', 'other'];

const units = ['kg', 'g', 'lb', 'oz', 'l', 'ml', 'cup', 'tbsp', 'tsp', 'piece'];

const sources = ['manual', 'receipt'];

const grocerySchema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Item name is required',
    'string.max': 'item name cannot exceed 100 characters',
  }),
  category: Joi.string()
    .valid(...perishable, ...nonPerisable)
    .required()
    .messages({
      'any.only': `Category must be one of ${[...perishable, ...nonPerisable].join(', ')}`,
      'any.required': 'Category is required',
    }),
  quantity: Joi.number().positive().required().messages({
    'number.positive': 'Quantity must be a positive number',
    'any.required': 'Quantity is required',
  }),
  unit: Joi.string()
    .valid(...units)
    .required()
    .messages({
      'any.only': `Unit must be one of ${units.join(', ')}`,
      'any.required': 'Unit is required',
    }),
  source: Joi.string()
    .valid(...sources)
    .default('manual')
    .messages({
      'any.only': `Source must be one of ${sources.join(', ')}`,
    }),
  is_expired: Joi.boolean().default(false),
  expiry_date: Joi.date().when('category', {
    is: Joi.valid(...perishable),
    then: Joi.date().optional(),
    otherwise: Joi.date().optional().allow(null),
  }),
});

module.exports = { grocerySchema };
