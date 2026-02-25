import { useOutletContext } from "react-router-dom";
import { PokemonTeamCard } from "./../../components/PokemonTeamCard";

export const ProfileTeamPage = () => {
  const { team } = useOutletContext();

  const TOTAL_SLOTS = 6;

  const teamSlots = Array.from({ length: TOTAL_SLOTS }, (_, index) => {
    const pokemon = team[index];

    return (
      <PokemonTeamCard
        key={index}
        pokemon={pokemon}
        slot={index + 1}
        isLocked={!pokemon}
      />
    );
  });

  return <div className="teamGridElite">{teamSlots}</div>;
};
