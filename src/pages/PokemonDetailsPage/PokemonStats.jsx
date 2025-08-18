import { useOutletContext } from "react-router-dom";
import { firstLetterUpperCase } from "./../../utils/helperFunctions";

export const PokemonStats = () => {
  const { pokemon } = useOutletContext();

  console.log("From Pokemonstats:", pokemon);

  const stats = pokemon.stats?.map((stat) => (
    <p>{`${firstLetterUpperCase(stat.stat.name)} : ${stat.base_stat}`}</p>
  ));

  return <h1>Pokemon Stats</h1>;
};
