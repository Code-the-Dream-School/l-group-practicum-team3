const { supabase, supabaseWithToken } = require("../config/db.supabase.js");
// Status Codes
const { StatusCodes } = require("http-status-codes");
// For validation
const { grocerySchema } = require("../validation/grocery.schema.js");

const getGroceryItems = async (req, res) => {
  return res.status(200).json({ message: "get all items" });
};

const getGroceryItemById = async (req, res) => {
  return res.status(200).json({ message: "get item by id" });
};

const addGroceryItem = async (req, res) => {
  // user from supabase auth

  // create supabase client that is authenticated with the user's token
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;

  // clean up grocery name before validating
  if (req.body.name) {
    req.body.name = req.body.name.trim().replace(/\s+/g, " ");
  }

  // joi validation
  const { value, error: validationError } = grocerySchema.validate(req.body);
  if (validationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: validationError.message,
    });
  }

  // set default expiry date if not provided
  const defaultExpiryDays = {
    dairy: 7,
    meat: 3,
    fruit: 5,
    vegetable: 7,
  };

  if (!value.expiry_date && defaultExpiryDays[value.category]) {
    const date = new Date();
    date.setDate(date.getDate() + defaultExpiryDays[value.category]);
    value.expiry_date = date;
  }

  // insert item if new item
  // using supabasewithtoke to prevent new row violates row-level security policy
  const { data, error: supabaseError } = await client
    .from("groceries")
    .insert({ ...value, user_id })
    .select();

  // checking for rl error
  if (supabaseError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: supabaseError });
  }

  return res.status(StatusCodes.CREATED).json({ data });
};

const updateGroceryItem = async (req, res) => {
  return res.status(200).json({ message: "update grocery item" });
};

const deleteGroceryItem = async (req, res) => {
  return res.status(200).json({ message: "deleting item" });
};

module.exports = {
  getGroceryItems,
  getGroceryItemById,
  addGroceryItem,
  updateGroceryItem,
  deleteGroceryItem,
};
