import { useEffect, useState } from "react";
import "./styles/App.css";
import PokemonDisplayCard from "./components/PokemonDisplayCard";
import typeColors from "./utils/typecolors";
import { firstLetterUpperCase } from "./utils/helperFunctions";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(pokemon);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    console.log(pageNumber);
    fetchData(pageNumber);
    setFilteredPokemon(pokemon);
  }, [pageNumber]);

  const fetchPokemonDetails = async (pokemonName) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  };

  const fetchData = async (pageNumber) => {
    try {
      let url = "https://pokeapi.co/api/v2/pokemon/";
      if (pageNumber > 0) {
        url = `https://pokeapi.co/api/v2/pokemon/?offset=${pageNumber}&limit=20`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const pokemonNames = result.results.map((pokemon) => pokemon.name);

      const pokemonDetailsPromises = pokemonNames.map((pokemonName) =>
        fetchPokemonDetails(pokemonName)
      );

      const allPokemonDetails = await Promise.all(pokemonDetailsPromises);

      setPokemon(allPokemonDetails);
      setFilteredPokemon(allPokemonDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const prevPage = () => {
    if (pageNumber != 0) {
      setPageNumber((prev) => prev - 20);
    }
  };

  const nextPage = () => {
    setPageNumber((prev) => prev + 20);
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

  const filterByTypeButtons = () => {
    const myObj = typeColors;
    return Object.keys(myObj).map((key) => {
      const isActive = activeFilter === key;

      return (
        <button
          key={key}
          style={{
            border: `solid 2px ${myObj[key]}`,
            backgroundColor: isActive ? myObj[key] : "white",
            color: isActive ? "white" : "black",
          }}
          onClick={() => filterPokemonByType(key)}
        >
          {firstLetterUpperCase(key)}
        </button>
      );
    });
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

      <div className="searchbarContainer">
        <label>Search</label>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Example: Charizard or water 🔎"
        />
      </div>

      <div className="filterButtonContainer">{filterByTypeButtons()}</div>

      <div className="navigationButtonContainer">
        <button onClick={prevPage} className="navigationButton">
          <p className="navigationButtonText">Prev</p>
        </button>
        <button onClick={nextPage} className="navigationButton">
          <p className="navigationButtonText">Next</p>
        </button>
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
