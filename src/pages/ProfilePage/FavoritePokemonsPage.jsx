import { useEffect, useState } from "react";
import { getItem } from "../../utils/localStorage";

export const FavoritePokemonsPage = () => {
  const [favoritePokemon, setFavoritePokemon] = useState(() => {
    const item = getItem("favorites");
    return item || [];
  });

  const displayFavorites = favoritePokemon.map((pokemon) => (
    <p>{pokemon.name}</p>
  ));

  return (
    <div>
      <h1>Your Favorite Pokemon</h1>
      {displayFavorites}
    </div>
  );
};
