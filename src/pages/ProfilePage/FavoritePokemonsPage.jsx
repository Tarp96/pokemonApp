import { useEffect, useState } from "react";
import { getAllFavorites } from "../../services/favoritesService";
import PokemonDisplayCard from "../../components/PokemonDisplayCard";

export const FavoritePokemonsPage = () => {
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    const load = async () => {
      const externalList = await getAllFavorites();
      setFavoritesList(externalList);
      console.log(externalList);
    };
    load();
  }, []);

  const displayFavorites = favoritesList.map((pokemon, index) => (
    <PokemonDisplayCard
      key={index}
      name={pokemon.name}
      sprite={pokemon.sprite}
      types={pokemon.types}
      onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      pokemon={pokemon}
      fromFavorites={true}
      type={pokemon.types?.map((t) =>
        typeof t === "string" ? { type: { name: t } } : t
      )}
      cries={
        typeof pokemon.cries === "string"
          ? { legacy: pokemon.cries }
          : pokemon.cries
      }
    />
  ));

  return (
    <div>
      <h1>Your Favorite Pokemon</h1>
      <div className="favoritePageGridContainer">{displayFavorites}</div>
    </div>
  );
};
