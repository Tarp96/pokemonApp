import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { listenToTeam } from "../../services/pokemon/teamService";

export const useOwnedPokemon = () => {
  const [ownedPokemonIds, setOwnedPokemonIds] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = listenToTeam(user.uid, setOwnedPokemonIds);

    return () => unsubscribe();
  }, []);

  const isOwned = (pokemonId) => {
    return ownedPokemonIds.includes(pokemonId.toString());
  };

  return { ownedPokemonIds, isOwned };
};
