const express = require("express");
const router = express.Router();

const {
  getSearchByIngredient,
  getRecipeById,
  favoriteRecipe,
  removeFavorite,
  getUserFavorites,
} = require("../controllers/recipe.controller.js");

router.get("/search", getSearchByIngredient);

router.post("/:id/favorite", favoriteRecipe);
router.delete("/:id/favorite", removeFavorite);

router.get("/favorites", getUserFavorites);
router.get("/:id", getRecipeById);

module.exports = router;
