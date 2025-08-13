import { useState, useEffect } from "react";
import { fetchPokemonDetails } from "../utils/pokeApi";
import { useParams } from "react-router-dom";

export const PokemonDetailsPage = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonDetails(name);
        setPokemon(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonDetails();
  }, [name]);

  return <h1>{pokemon.name}</h1>;
};
