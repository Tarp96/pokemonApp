import { useEffect, useState, useCallback } from "react";
import {
  fetchData,
  safeFetchBatch,
} from "../../services/pokemon/pokeApiService";
import { setCachedPageFull } from "../../utils/storage/cache";

const PAGE_SIZE = 20;

export const usePokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loadPokemonData = useCallback(async (page = 1) => {
    try {
      setLoading(true);

      const result = await fetchData(page, PAGE_SIZE);

      const pokemonNames = result.results.map((item) => item.name);

      const allPokemonDetails = await safeFetchBatch(pokemonNames);

      const pages = Math.ceil((result.count ?? 0) / PAGE_SIZE);

      setPokemon(allPokemonDetails);
      setTotalPages(pages);

      const lightweightList = allPokemonDetails.map((p) => ({
        id: p.id,
        name: p.name,
        sprite:
          p.sprites?.other?.["official-artwork"]?.front_default ??
          p.sprites?.front_default,
        types: p.types,
        cries: p.cries?.legacy ?? null,
      }));

      setCachedPageFull(page, {
        list: lightweightList,
        totalPages: pages,
      });
    } catch (error) {
      console.error("Error loading Pokémon:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPokemonData(currentPage);
  }, [currentPage, loadPokemonData]);

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return {
    pokemon,
    loading,

    currentPage,
    totalPages,

    goToPage,
    reload: loadPokemonData,
  };
};
