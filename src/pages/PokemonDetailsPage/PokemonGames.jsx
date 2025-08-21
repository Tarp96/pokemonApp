import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { gameImages } from "./../../utils/gameImages";

export const PokemonGames = () => {
  const { pokemon } = useOutletContext();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const pokemonGames = pokemon.game_indices.map((g) => g.version.name) || [];
    setGames(games);
  }, [pokemon]);

  games.map((g) => {
    const matchedImage = gameImages.find((img) => img.name === g);
  });

  return <div>{}</div>;
};
