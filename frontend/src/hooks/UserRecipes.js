import { useState, useEffect, useCallback } from "react";
import {
  searchByIngredient,
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../pages/private/RecipesApi";
import { MOCK_DISCOVERY, MOCK_FAVORITES } from "../constants/RecipeConstant";

export function useRecipes() {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState("Avocado");
  const [discovery, setDiscovery] = useState(MOCK_DISCOVERY);
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);
  const [favoritedIds, setFavoritedIds] = useState(new Set([101, 102]));
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Load favorites on mount
  useEffect(() => {
    fetchFavorites()
      .then((data) => {
        setFavorites(data);
        setFavoritedIds(new Set(data.map((f) => f.spoonacular_id)));
      })
      .catch(() => {
        // keep mock data if API not connected yet
      });
  }, []);

  const doSearch = useCallback(
    async (ingredient) => {
      const term = ingredient || query;
      if (!term.trim()) return;
      setLoadingSearch(true);
      setSearchError("");
      try {
        const results = await searchByIngredient(term.trim());
        setDiscovery(results);
      } catch {
        setSearchError("Couldn't load recipes. Showing sample results.");
        setDiscovery(MOCK_DISCOVERY);
      } finally {
        setLoadingSearch(false);
      }
    },
    [query],
  );

  const handleChipClick = (chip) => {
    setActiveChip(chip);
    setQuery(chip);
    doSearch(chip);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") doSearch();
  };

  const handleToggleFavorite = async (recipe) => {
    const isFav = favoritedIds.has(recipe.id);

    // Optimistic UI update
    setFavoritedIds((prev) => {
      const next = new Set(prev);
      isFav ? next.delete(recipe.id) : next.add(recipe.id);
      return next;
    });

    if (isFav) {
      setFavorites((prev) =>
        prev.filter((f) => f.spoonacular_id !== recipe.id),
      );
      try {
        await removeFavorite(recipe.id);
      } catch {
        /* silent revert */
      }
    } else {
      const optimistic = {
        id: Date.now(),
        spoonacular_id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        meal_type: "RECIPE",
        readyInMinutes: recipe.readyInMinutes,
      };
      setFavorites((prev) => [optimistic, ...prev]);
      try {
        await addFavorite(recipe);
      } catch {
        /* silent revert */
      }
    }
  };

  const handleRemoveFavorite = async (recipe) => {
    setFavoritedIds((prev) => {
      const n = new Set(prev);
      n.delete(recipe.spoonacular_id);
      return n;
    });
    setFavorites((prev) => prev.filter((f) => f.id !== recipe.id));
    try {
      await removeFavorite(recipe.spoonacular_id);
    } catch {
      /* silent */
    }
  };

  return {
    // state
    query,
    activeChip,
    discovery,
    favorites,
    favoritedIds,
    loadingSearch,
    searchError,
    // actions
    setQuery,
    handleChipClick,
    handleKeyDown,
    handleToggleFavorite,
    handleRemoveFavorite,
  };
}
