import { useOutletContext } from "react-router-dom";

export const PokemonStats = () => {
  const { pokemon } = useOutletContext();

  console.log("From Pokemonstats:", pokemon);

  return <h1>Pokemon Stats</h1>;
};
