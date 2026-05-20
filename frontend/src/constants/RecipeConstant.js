export const QUICK_PICKS = [
  "Avocado",
  "Salmon",
  "Kale",
  "Quinoa",
  "Tofu",
  "Lemon",
];

export const RECIPE_EMOJIS = ["🥗", "🍚", "🍝", "🍜", "🥘", "🥙", "🍛", "🫕"];

export const MOCK_DISCOVERY = [
  {
    id: 1,
    title: "Roasted Harvest Salad",
    image: null,
    diet: "VEGETARIAN",
    readyInMinutes: 15,
    usedIngredients: ["avocado"],
  },
  {
    id: 2,
    title: "Mediterranean Quinoa",
    image: null,
    diet: "GLUTEN FREE",
    readyInMinutes: 25,
    usedIngredients: ["quinoa"],
  },
  {
    id: 3,
    title: "Zesty Lemon Pasta",
    image: null,
    diet: "QUICK MEAL",
    readyInMinutes: 12,
    usedIngredients: ["lemon"],
  },
  {
    id: 4,
    title: "Spicy Tofu Stir Fry",
    image: null,
    diet: "HEALTHY",
    readyInMinutes: 20,
    usedIngredients: ["tofu"],
  },
];

export const MOCK_FAVORITES = [
  {
    id: 101,
    spoonacular_id: 101,
    title: "Spicy Miso Ramen",
    image: null,
    meal_type: "DINNER",
    readyInMinutes: 30,
  },
  {
    id: 102,
    spoonacular_id: 102,
    title: "Garden Buddha Bowl",
    image: null,
    meal_type: "LUNCH",
    readyInMinutes: 20,
  },
];

/** Returns a consistent emoji for a given recipe id */
export const recipeEmoji = (id) => RECIPE_EMOJIS[id % RECIPE_EMOJIS.length];
