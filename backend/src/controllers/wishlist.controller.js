const { supabaseWithToken } = require("../config/db.supabase.js");
const { StatusCodes } = require("http-status-codes");

const {
  wishlistItemsSchema,
  wishlistUpdateSchema,
} = require("../validation/wishlist.schema.js");

// GET /api/wishlist?page=1&limit=10
const getWishlistItems = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  try {
    const {
      data,
      error: supabaseError,
      count,
    } = await client
      .from("shopping_list_grocery")
      .select("*", { count: "exact" })
      .eq("user_id", user_id)
      .order("created_at", { ascending: true })
      .range(start, end);

    if (supabaseError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: supabaseError.message });
    }

    const totalPages = Math.ceil(count / limit);

    return res.status(StatusCodes.OK).json({
      data,
      pagination: {
        totalRecords: count,
        currentPage: page,
        limit,
        recordsOnPage: data.length,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

// POST /api/wishlist -- accepts a single item object or an array of items
const addWishlistItems = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;

  // validate
  const { value: validatedItems, error: validationError } =
    wishlistItemsSchema.validate(req.body, { abortEarly: false });

  if (validationError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: validationError.message });
  }

  // put in array, even if single item
  const items = (
    Array.isArray(validatedItems) ? validatedItems : [validatedItems]
  ).map((item) => ({ ...item, user_id }));

  try {
    const { data, error: supabaseError } = await client
      .from("shopping_list_grocery")
      .insert(items)
      .select();

    if (supabaseError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: supabaseError.message });
    }

    return res.status(StatusCodes.CREATED).json({ data });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

// PATCH /api/wishlist/:id
const updateWishlistItem = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const { id } = req.params;

  // validate
  const { value: updatedFields, error: validationError } =
    wishlistUpdateSchema.validate(req.body, { abortEarly: false });

  if (validationError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: validationError.message });
  }

  try {
    const { data, error: supabaseError } = await client
      .from("shopping_list_grocery")
      .update(updatedFields)
      .eq("id", id)
      .eq("user_id", user_id)
      .select();

    if (supabaseError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: supabaseError.message });
    }

    if (!data.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Item not found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Item updated successfully", data });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

// DELETE /api/wishlist/:id
const deleteWishlistItem = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const { id } = req.params;

  try {
    const { data, error: supabaseError } = await client
      .from("shopping_list_grocery")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id)
      .select();

    if (supabaseError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: supabaseError.message });
    }
    if (!data.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Item not found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Item deleted successfully" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

// DELETE /api/wishlist -- clears the user's entire list
const clearWishlist = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;

  try {
    const { error: supabaseError } = await client
      .from("shopping_list_grocery")
      .delete()
      .eq("user_id", user_id);

    if (supabaseError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: supabaseError.message });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Wishlist cleared successfully" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

module.exports = {
  getWishlistItems,
  addWishlistItems,
  updateWishlistItem,
  deleteWishlistItem,
  clearWishlist,
};
