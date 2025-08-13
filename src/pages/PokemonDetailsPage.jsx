import React from "react";
import { fetchPokemonDetails } from "../utils/pokeApi";

export const PokemonDetailsPage = ({ name }) => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);

  useState(() => {
    setLoading((prev) => (prev = true));
    const pokemon = fetchPokemonDetails(name);
    setPokemon(() => fetchPokemonDetails(name));
    console.log(pokemon);
  }, []);

  return <div>PokemonDetails</div>;
};
