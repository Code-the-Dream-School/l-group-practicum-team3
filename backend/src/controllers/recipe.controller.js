const { supabase, supabaseWithToken } = require("../config/db.supabase.js");
// Status Codes
const { StatusCodes } = require("http-status-codes");

// GET search recipes by ingredients
const getSearchByIngredient = async (req, res) => {
  const { ingredients, number = 10, ranking = 1 } = req.query;

  if (!ingredients || ingredients.trim() === "") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Ingredients are required" });
  }

  try {
    const url = new URL(
      "https://api.spoonacular.com/recipes/findByIngredients"
    );
    url.searchParams.set("ingredients", ingredients.trim());
    url.searchParams.set("number", number);
    url.searchParams.set("ranking", ranking);
    url.searchParams.set("ignorePantry", true);
    url.searchParams.set("apiKey", process.env.SPOONACULAR_API_KEY);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.message || "Spoonacular error" });
    }

    // shape the response to only what the client needs
    const recipes = data.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      usedIngredientCount: recipe.usedIngredientCount,
      missedIngredientCount: recipe.missedIngredientCount,
      missedIngredients: recipe.missedIngredients.map((i) => i.name),
      usedIngredients: recipe.usedIngredients.map((i) => i.name),
    }));

    return res.status(StatusCodes.OK).json({ recipes });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

// Proxy endpoint for Spoonacular get Recipe Info by ID
const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const url = new URL(
      `https://api.spoonacular.com/recipes/${id}/information`
    );
    url.searchParams.set("apiKey", process.env.SPOONACULAR_API_KEY);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.message || "Spoonacular error" });
    }

    return res.status(StatusCodes.OK).json(data);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

// POST favorite a recipe
const favoriteRecipe = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const { id: spoonacularId } = req.params;
  const { title, image } = req.body;

  if (!spoonacularId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Recipe ID is required" });
  }

  try {
    const { data, error } = await client
      .from("favorite_recipes")
      .insert({ user_id, spoonacular_id: spoonacularId, title, image })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "Already favorited this recipe" });
      }
      throw error;
    }

    return res.status(StatusCodes.CREATED).json(data);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

// DELETE remove a favorite
const removeFavorite = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const { id: spoonacularId } = req.params;

  if (!spoonacularId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Recipe ID is required" });
  }

  try {
    const { error } = await client
      .from("favorite_recipes")
      .delete()
      .eq("user_id", user_id)
      .eq("spoonacular_id", spoonacularId);

    if (error) throw error;

    return res
      .status(StatusCodes.OK)
      .json({ message: "Removed from favorites" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

// GET user favorites
const getUserFavorites = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;

  try {
    const { data, error } = await client
      .from("favorite_recipes")
      .select("id, spoonacular_id, title, image, created_at")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(StatusCodes.OK).json(data);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

module.exports = {
  getSearchByIngredient,
  getRecipeById,
  favoriteRecipe,
  removeFavorite,
  getUserFavorites,
};
