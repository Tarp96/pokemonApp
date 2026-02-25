import { useOutletContext } from "react-router-dom";
import { PokemonTeamCard } from "./../../components/PokemonTeamCard";

export const ProfileTeamPage = () => {
  const { team } = useOutletContext();

  const teamItems = team.map((pokemonItem, index) => (
    <PokemonTeamCard pokemon={pokemonItem} />
  ));

  return <>{teamItems}</>;
};
