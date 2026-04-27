import { useOutletContext } from "react-router-dom";
import { PokemonTeamCard } from "./../../components/pokemon/PokemonTeamCard";
import { removePokemonFromTeam } from "../../services/pokemon/teamService";

export const ProfileTeamPage = () => {
  const { team, setTeam } = useOutletContext();

  const TOTAL_SLOTS = 6;

  const handleRemovePokemon = async (pokemonId) => {
    try {
      await removePokemonFromTeam(pokemonId);

      setTeam((prevTeam) =>
        prevTeam.filter((pokemon) => pokemon.id !== pokemonId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const teamSlots = Array.from({ length: TOTAL_SLOTS }, (_, index) => {
    const pokemon = team[index];

    return (
      <PokemonTeamCard
        key={pokemon ? pokemon.id : `locked-${index}`}
        pokemon={pokemon}
        slot={index + 1}
        isLocked={!pokemon}
        onRemove={handleRemovePokemon}
      />
    );
  });

  return <div className="teamGridElite">{teamSlots}</div>;
};
