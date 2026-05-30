import { useState, useEffect, useCallback } from "react";
import {
  searchByIngredient,
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../pages/private/RecipesApi";
import { MOCK_FAVORITES } from "../constants/RecipeConstant";

export function useRecipes() {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState("");
  const [discovery, setDiscovery] = useState([]); // empty on mount — no mock data
  const [noMatchFound, setNoMatchFound] = useState(false); // true only when API returns 0 results
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);
  const [favoritedIds, setFavoritedIds] = useState(new Set());
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Load real favorites on mount
  useEffect(() => {
    fetchFavorites()
      .then((data) => {
        setFavorites(data);
        setFavoritedIds(new Set(data.map((f) => f.spoonacular_id)));
      })
      .catch(() => {
        // keep mock favorites if API not connected yet
      });
  }, []);

  const doSearch = useCallback(
    async (ingredient) => {
      const term = ingredient || query;
      if (!term.trim()) return;

      setLoadingSearch(true);
      setNoMatchFound(false);

      try {
        const results = await searchByIngredient(term.trim());

        if (!results || results.length === 0) {
          // reviewer's request: show "No Match Found" state instead of error message
          setDiscovery([]);
          setNoMatchFound(true);
        } else {
          setDiscovery(results);
          setNoMatchFound(false);
        }
      } catch {
        // network / server error — still show no-match UI, not a confusing error string
        setDiscovery([]);
        setNoMatchFound(true);
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

  const handleClearSearch = () => {
    setQuery("");
    setActiveChip("");
    setDiscovery([]);
    setNoMatchFound(false);
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
        /* silent */
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
        /* silent */
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
    query,
    activeChip,
    discovery,
    noMatchFound, // <-- replaces searchError string
    favorites,
    favoritedIds,
    loadingSearch,
    setQuery,
    handleChipClick,
    handleKeyDown,
    handleClearSearch,
    handleToggleFavorite,
    handleRemoveFavorite,
  };
}
