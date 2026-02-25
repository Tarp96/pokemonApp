import { useOutletContext } from "react-router-dom";
import { PokemonTeamCard } from "./../../components/PokemonTeamCard";

export const ProfileTeamPage = () => {
  const { team } = useOutletContext();

  return (
    <div className="teamGrid">
      {team.map((pokemonItem, index) => (
        <PokemonTeamCard key={pokemonItem.id || index} pokemon={pokemonItem} />
      ))}
    </div>
  );
};
