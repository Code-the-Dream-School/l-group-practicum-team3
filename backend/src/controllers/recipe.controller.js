const { supabase, supabaseWithToken } = require("../config/db.supabase.js");
// Status Codes
const { StatusCodes } = require("http-status-codes");

// GET search recipes by main ingredient /recipes/search?ingredient=chicken
//  "lazy" loading --> MEAL DB doesn't return full ingredient/instructions yet
const getSearchByIngredient = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const { ingredient } = req.query;

  try {
    // validation
    if (!ingredient || ingredient.trim() === "") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Ingredient is required",
      });
    }

    const normalized = ingredient.trim().toLowerCase();

    // local search in supabase
    // uses an rpc function defined by us within supabase that uses pg_trgm (trigrams) for fuzzy search
    const { data: localRecipes, error: searchError } = await client.rpc(
      "search_recipes_by_ingredient",
      {
        search_term: normalized,
      }
    );

    if (searchError) throw searchError;

    // return if found in local db
    if (localRecipes?.length > 0) {
      return res.status(StatusCodes.OK).json({
        source: "database",
        recipes: localRecipes,
      });
    }

    // fetch from MEALDB
    const mealRes = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
        normalized
      )}`
    );
    const mealData = await mealRes.json();
    if (!mealData.meals) {
      return res.status(StatusCodes.OK).json({
        source: "mealdb",
        recipes: [],
      });
    }

    // format MEAL DB results
    const meals = mealData.meals;

    // insert meals into our DB for next time
    const { data: inserted, error: insertError } = await client
      .from("recipes")
      .upsert(
        meals.map((meal) => ({
          mealapi_id: meal.idMeal,
          title: meal.strMeal,
          image_url: meal.strMealThumb,
        })),
        {
          onConflict: "mealapi_id",
        }
      )
      .select();
    if (insertError) throw insertError;

    // return results
    return res.status(StatusCodes.OK).json({
      source: "mealdb",
      recipes: inserted,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

// GET recipe info by ID
// Here we get all instructions/measurements for a recipe
const getRecipeById = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const { recipeId } = req.params;

  try {
    // check DB first
    const { data: recipe } = await client
      .from("recipes")
      .select("*")
      .eq("recipe_id", recipeId)
      .single();

    if (!recipe) {
      return res.status(404).json({ error: "Not found" });
    }

    // check if ingredients exist already
    const { data: existingIngredients } = await client
      .from("recipe_ingredient")
      .select("*")
      .eq("recipe_id", recipeId);

    // if any ingredients exist, return immediately
    if (existingIngredients?.length > 0) {
      return res.json({
        ...recipe,
        ingredients: existingIngredients,
      });
    }

    // otherwise fetch from MealDB
    const mealRes = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.mealapi_id}`
    );

    const mealData = await mealRes.json();
    const meal = mealData.meals?.[0];

    if (!meal) {
      return res.json(recipe);
    }

    // extract ingredients from json
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      // <-- MEALDB API has fixed-length (arbitrary) 20 ingredients/measure list
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient?.trim()) {
        ingredients.push({
          recipe_id: recipeId,
          ingredient_name: ingredient.trim().toLowerCase(),
          measure: measure?.trim() || null,
        });
      }
    }

    // store ingredients in DB
    await client.from("recipe_ingredient").insert(ingredients);
    // store instructions in DB
    // store instructions in DB
    const { data: updatedRecipe, error: updateError } = await client
      .from("recipes")
      .update({
        instructions: meal.strInstructions,
        category: meal.strCategory,
      })
      .eq("recipe_id", recipeId)
      .select();

    console.log("UPDATE RESULT:", updatedRecipe, updateError);
    // return full recipe
    return res.json({
      ...recipe,
      ingredients,
      instructions: meal.strInstructions,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// POST favorite a recipe
const favoriteRecipe = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const { id: recipeId } = req.params;

  if (!recipeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Item ID is required" });
  }

  try {
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

// DELETE remove a favorite
const removeFavorite = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const { id: recipeId } = req.params;

  if (!recipeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Item ID is required" });
  }

  try {
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

// GET user favorites
const getUserFavorites = async (req, res) => {
  const client = supabaseWithToken(req.token);
  const user_id = req.user.id;

  try {
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

module.exports = { getSearchByIngredient, getRecipeById };
