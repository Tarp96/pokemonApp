import { useState, useCallback } from "react";
import { getItem, setItem } from "../../utils/storage/localStorage";
import { safeFetchBatch } from "../../services/pokemon/pokeApiService";

const STORAGE_KEY = "searchHistory";
const MAX_HISTORY = 10;

export const usePokemonSearch = () => {
  const [query, setQuery] = useState("");
  const [showSearches, setShowSearches] = useState(false);

  const [searchHistory, setSearchHistory] = useState(() => {
    const stored = getItem(STORAGE_KEY);
    return Array.isArray(stored) ? stored : [];
  });

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const updateHistory = useCallback((term) => {
    setSearchHistory((prev) => {
      const updated = [term, ...prev.filter((item) => item !== term)].slice(
        0,
        MAX_HISTORY,
      );

      setItem(STORAGE_KEY, updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    setItem(STORAGE_KEY, []);
  }, []);

  const searchPokemon = useCallback(
    async (customQuery) => {
      const searchTerm = String(customQuery ?? query)
        .trim()
        .toLowerCase();

      if (!searchTerm) {
        setSearchError("Please enter a Pokémon name.");
        return null;
      }

      try {
        setSearchLoading(true);
        setSearchError(null);

        const [pokemon] = await safeFetchBatch([searchTerm]);

        if (!pokemon) {
          setSearchError("Pokémon not found.");
          return null;
        }

        updateHistory(searchTerm);
        setQuery(searchTerm);
        setShowSearches(false);

        return pokemon;
      } catch (error) {
        setSearchError("Something went wrong while searching.");
        return null;
      } finally {
        setSearchLoading(false);
      }
    },
    [query, updateHistory],
  );

  const resetSearch = useCallback(() => {
    setQuery("");
    setSearchError(null);
    setShowSearches(false);
  }, []);

  return {
    query,
    setQuery,

    searchHistory,
    clearHistory,

    showSearches,
    setShowSearches,

    searchLoading,
    searchError,

    searchPokemon,
    resetSearch,
  };
};
