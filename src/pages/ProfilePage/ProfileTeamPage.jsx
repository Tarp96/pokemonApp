import { useOutletContext } from "react-router-dom";
import { PokemonTeamCard } from "./../../components/PokemonTeamCard";

export const ProfileTeamPage = () => {
  const { team } = useOutletContext();

  return (
    <div className="teamGridElite">
      {team.map((pokemonItem, index) => (
        <PokemonTeamCard
          key={`${pokemonItem.id}-${pokemonItem.name}-${index}`}
          pokemon={pokemonItem}
          slot={index + 1}
        />
      ))}
    </div>
  );
};
