import { useState, useCallback } from "react";
import {
  fetchTypeData,
  safeFetchBatch,
} from "../../services/pokemon/pokeApiService";

export const usePokemonFilters = (resetPage) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);

  const [typeLoading, setTypeLoading] = useState(false);
  const [randomLoading, setRandomLoading] = useState(false);

  const [filteredFullList, setFilteredFullList] = useState([]);

  const clearFilters = useCallback(() => {
    setActiveFilter(null);
    setIsFiltered(false);
    setFilteredFullList([]);
    resetPage?.();
  }, [resetPage]);

  const filterByType = useCallback(
    async (type) => {
      if (isFiltered && activeFilter === type) {
        clearFilters();
        return;
      }

      try {
        setTypeLoading(true);

        const result = await fetchTypeData(type);

        const pokemonNames = (result?.pokemon || [])
          .map((item) => item?.pokemon?.name)
          .filter(Boolean);

        const pokemon = await safeFetchBatch(pokemonNames);

        setFilteredFullList(pokemon);
        setActiveFilter(type);
        setIsFiltered(true);

        resetPage?.();
      } catch (error) {
        console.error("Failed to filter by type:", error);
        setFilteredFullList([]);
      } finally {
        setTypeLoading(false);
      }
    },
    [activeFilter, isFiltered, clearFilters, resetPage],
  );

  const getRandomPokemon = useCallback(async () => {
    try {
      setRandomLoading(true);

      const ids = Array.from(
        { length: 4 },
        () => Math.floor(Math.random() * 1025) + 1,
      );

      const results = await Promise.all(
        ids.map((id) => safeFetchBatch([String(id)])),
      );

      const pokemon = results.map(([details]) => details).filter(Boolean);

      setFilteredFullList(pokemon);
      setActiveFilter("random");
      setIsFiltered(true);

      resetPage?.();
    } catch (error) {
      console.error("Failed to fetch random Pokémon:", error);
      setFilteredFullList([]);
    } finally {
      setRandomLoading(false);
    }
  }, [resetPage]);

  return {
    activeFilter,
    isFiltered,

    typeLoading,
    randomLoading,

    filteredFullList,

    filterByType,
    getRandomPokemon,
    clearFilters,
  };
};
