import { useEffect, useState } from "react";
import "./styles/App.css";
import PokemonDisplayCard from "./components/PokemonDisplayCard";
import { fetchData, fetchPokemonDetails } from "./utils/pokeApi";
import { FilterByTypeButtons } from "./components/FilterByTypeButtons";
import { SearchBar } from "./components/SearchBar";
import { NavigationButtons } from "./components/NavigationButtons";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(pokemon);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
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
  };

  const renderPokemonCards = () => {
    return filteredPokemon
      .filter((item) => {
        return query.toLowerCase() === ""
          ? item
          : item.name.toLowerCase().includes(query.toLowerCase()) ||
              item.types.some((type) =>
                type.type.name.toLowerCase().includes(query.toLowerCase())
              );
      })
      .map((pokemonItem, index) => (
        <PokemonDisplayCard
          key={index}
          name={pokemonItem.name}
          sprite={pokemonItem.sprites.front_default}
          types={pokemonItem.types}
          height={pokemonItem.height}
          weight={pokemonItem.weight}
          cries={pokemonItem.cries}
        />
      ));
  };

  return (
    <div className="mainContainer">
      <div className="header">
        <h1>Pokemon</h1>
      </div>

      <SearchBar query={query} setQuery={setQuery} />

      <FilterByTypeButtons
        filterByTypeFunc={filterPokemonByType}
        activeFilter={activeFilter}
      />

      <div className="navigationButtonContainer">
        <NavigationButtons prevPage={prevPage} nextPage={nextPage} />
      </div>

      {loading ? (
        <p>Loading Pokémon...</p>
      ) : (
        <>
          {filteredPokemon.length > 0 ? (
            <div className="pokemonGrid">{renderPokemonCards()}</div>
          ) : (
            <div className="ifNoPokemonMatchFilter">
              <p>None of the Pokemon on current page belong to this type</p>
              <button onClick={removeFilter}>Remove Filter</button>
              <img
                src="/assets/pikaconfused.gif"
                className="ifNoPokemonInFilterImage"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
