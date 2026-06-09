import api from "../../utils/axios";

export async function searchByIngredient(ingredients) {
  const { data } = await api.get("/api/recipes/search", {
    params: { ingredients, number: 4 },
  });
  return data.recipes;
}

export async function fetchFavorites() {
  const { data } = await api.get("/api/recipes/favorites");
  return data;
}

export async function addFavorite(recipe) {
  const { data } = await api.post(`/api/recipes/${recipe.id}/favorite`, {
    title: recipe.title,
    image: recipe.image,
  });
  return data;
}

export async function removeFavorite(id) {
  await api.delete(`/api/recipes/${id}/favorite`);
}
