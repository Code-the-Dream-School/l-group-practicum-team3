// TODO: removing redundancy from code

const { supabase, supabaseWithToken } = require("../config/db.supabase.js");
// Status Codes
const { StatusCodes } = require("http-status-codes");
// For validation
const {
  grocerySchema,
  groceryUpdateSchema,
} = require("../validation/grocery.schema.js");

// example request {base_url}/api/grocery?page=1?limit=3
// TOD0: add filtering and sorting parameters
const getGroceryItems = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const {
    data,
    error: supabaseError,
    count,
  } = await client
    .from("groceries")
    .select("*", { count: "exact" })
    .eq("user_id", user_id)
    .order("created_at", { ascending: false }) //swap to order based on expiry date
    .range(start, end);

  if (supabaseError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: supabaseError });
  }

  const totalPages = Math.ceil(count / limit);

  return res.status(StatusCodes.OK).json({
    data,
    pagination: {
      totalRecords: count,
      currentPage: page,
      limit: limit,
      recordsOnPage: data.length,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
};

// example request {base_url}/api/grocery/:id
const getGroceryItemById = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const { id: groceryId } = req.params;

  if (!groceryId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Item ID is required" });
  }

  const { data, error: supabaseError } = await client
    .from("groceries")
    .select("*")
    .eq("grocery_id", groceryId)
    .eq("user_id", user_id)
    .maybeSingle();

  if (supabaseError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: supabaseError.message });
  }

  if (!data) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Item not found" });
  }

  return res.status(StatusCodes.OK).json({ data });
};

// example request {base_url}/api/grocery
// TODO: add prevent duplicate item creating new rows
const addGroceryItem = async (req, res) => {
  // create supabase client that is authenticated with the user's token
  const client = supabaseWithToken(req.token);
  // user from supabase auth
  const user_id = req.user.id;

  // clean up grocery name before validating
  // move to util folder
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

// TODO: manage for nonexisiting item
// example request {base_url}/api/grocery/:id
const updateGroceryItem = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const { id: groceryId } = req.params;

  if (!groceryId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Item ID is required" });
  }

  // move to util folder
  if (req.body.name) {
    req.body.name = req.body.name.trim().replace(/\s+/g, " ");
  }

  const { value, error: validationError } = groceryUpdateSchema.validate(
    req.body,
    {
      abortEarly: false,
    }
  );

  if (validationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: validationError.message,
    });
  }

  const { data, error: supabaseError } = await client
    .from("groceries")
    .update(value)
    .eq("grocery_id", groceryId)
    .eq("user_id", user_id)
    .select();

  if (supabaseError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: supabaseError.message });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "Item updated successfully", data });
};

// example request {base_url}/api/grocery/:id
// TODO: manage for nonexisiting id
const deleteGroceryItem = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const { id: groceryId } = req.params;

  if (!groceryId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Item Id is required" });
  }

  const { error: supabaseError } = await client
    .from("groceries")
    .delete()
    .eq("grocery_id", groceryId)
    .eq("user_id", user_id);

  if (supabaseError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: supabaseError.message });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "Item deleted successfully" });
};

module.exports = {
  getGroceryItems,
  getGroceryItemById,
  addGroceryItem,
  updateGroceryItem,
  deleteGroceryItem,
};
