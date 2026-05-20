// Update this to your backend base URL
const BASE_URL = "/api";

export async function searchByIngredient(ingredients) {
  const res = await fetch(
    `${BASE_URL}/recipes/search?ingredients=${encodeURIComponent(ingredients)}&number=4`,
  );
  if (!res.ok) throw new Error("Failed to fetch recipes");
  const data = await res.json();
  return data.recipes;
}

export async function fetchFavorites() {
  const res = await fetch(`${BASE_URL}/recipes/favorites`);
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return res.json();
}

export async function addFavorite(recipe) {
  const res = await fetch(`${BASE_URL}/recipes/${recipe.id}/favorite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: recipe.title, image: recipe.image }),
  });
  if (!res.ok) throw new Error("Failed to favorite");
  return res.json();
}

export async function removeFavorite(id) {
  const res = await fetch(`${BASE_URL}/recipes/${id}/favorite`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove favorite");
}
