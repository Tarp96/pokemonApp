import { useEffect, useState } from "react";
import PokemonDisplayCard from "../components/PokemonDisplayCard";
import { fetchData, fetchPokemonDetails } from "../utils/pokeApi";
import { FilterByTypeButtons } from "../components/FilterByTypeButtons";
import { SearchBar } from "../components/SearchBar";
import { NoPokemonMatchFilter } from "../components/NoPokemonMatchFilter";
import { PokemonGrid } from "../components/PokemonGrid";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { getItem, setItem } from "../utils/localStorage";

export const HomePage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(pokemon);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchHistory, setSearchHistory] = useState(() => {
    const item = getItem("searchHistory");
    return item || [];
  });
  const [showSearches, setShowSearches] = useState(false);
  const [favoritePokemon, setFavoritePokemon] = useState(() => {
    const favorites = getItem("favorites");
    return favorites || [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadPokemonData(pageNumber);
  }, [pageNumber]);

  const loadPokemonData = async (pageNumber) => {
    try {
      setLoading(true);
      const result = await fetchData(pageNumber, 20);
      const pokemonNames = result.results.map((pokemon) => pokemon.name);

      const pokemonDetailPromises = pokemonNames.map((pokemonName) => {
        return fetchPokemonDetails(pokemonName);
      });

      const allPokemonDetails = await Promise.all(pokemonDetailPromises);
      setPokemon(allPokemonDetails);
      setFilteredPokemon(allPokemonDetails);
      setLoading(false);
      setTotalPages(Math.ceil(result.count / 20));
    } catch (error) {
      console.error("Error loading Pokemon data:", error);
      setLoading(false);
    }
  };

  const filterPokemonByType = (key) => {
    if (isFiltered && activeFilter === key) {
      setFilteredPokemon(pokemon);
      setActiveFilter(null);
    } else {
      const filtered = pokemon.filter((item) =>
        item.types.some((type) => type.type.name === key)
      );
      setFilteredPokemon(filtered);
      setActiveFilter(key);
    }

    setIsFiltered((prev) => !prev);
  };

  const removeFilter = () => {
    setActiveFilter((prev) => (prev = null));
    setFilteredPokemon(pokemon);
    setQuery("");
  };

  const renderQueryPokemonCard = async (customQuery) => {
    const searchTerm = String(customQuery ?? query).trim();

    if (!searchTerm) {
      alert("Please enter a Pokémon name before searching.");
      return;
    }

    try {
      const pokemonDetails = await fetchPokemonDetails(
        searchTerm.toLowerCase()
      );
      setFilteredPokemon([pokemonDetails]);

      const updatedHistory = Array.from(
        new Set([searchTerm, ...searchHistory])
      ).slice(0, 10);
      setSearchHistory(updatedHistory);
      setItem("searchHistory", updatedHistory);
      setQuery(searchTerm);
    } catch (error) {
      console.log("Pokemon not found");
      setFilteredPokemon([]);
    }
  };

  const addFavoritePokemonToLs = (item) => {
    setItem("favorites", item);
    console.log("Item added");
  };

  const renderPokemonCards = () => {
    return filteredPokemon.map((pokemonItem, index) => (
      <PokemonDisplayCard
        key={index}
        name={pokemonItem.name}
        sprite={pokemonItem.sprites.front_default}
        types={pokemonItem.types}
        height={pokemonItem.height}
        weight={pokemonItem.weight}
        cries={pokemonItem.cries}
        onClick={() => navigate(`/pokemon/${pokemonItem.name}`)}
        favoriteOnClick={() => addFavoritePokemonToLs(pokemonItem.name)}
      />
    ));
  };

  return (
    <div className="mainContainer">
      <SearchBar
        query={query}
        setQuery={setQuery}
        onClick={renderQueryPokemonCard}
        list={searchHistory}
        showSearches={showSearches}
        setShowSearches={setShowSearches}
      />

      <FilterByTypeButtons
        filterByTypeFunc={filterPokemonByType}
        activeFilter={activeFilter}
      />

      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        onPageChange={(newPage) => setPageNumber(newPage)}
      />

      {loading ? (
        <p>Loading Pokémon...</p>
      ) : (
        <>
          {filteredPokemon.length > 0 ? (
            <PokemonGrid>{renderPokemonCards()}</PokemonGrid>
          ) : (
            <NoPokemonMatchFilter
              onClick={removeFilter}
              type={activeFilter ? "type" : query ? "search" : null}
            />
          )}
        </>
      )}
    </div>
  );
};
