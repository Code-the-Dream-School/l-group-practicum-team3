const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getSearchByIngredient,
  getRecipeById,
} = require("../controllers/recipe.controller.js");

router.get("/search", getSearchByIngredient);
router.get("/:recipeId", getRecipeById);

module.exports = router;
