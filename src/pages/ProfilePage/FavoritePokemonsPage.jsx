import { useEffect, useState } from "react";
import { getAllFavorites } from "../../services/favoritesService";
import PokemonDisplayCard from "../../components/PokemonDisplayCard";

export const FavoritePokemonsPage = () => {
  const [favoritesList, setFavoritesList] = useState([]);

  const getFavorites = async () => {
    const externalList = await getAllFavorites();
    setFavoritesList(externalList);
    console.log(externalList);
  };

  useEffect(() => {
    getFavorites();
  }, [favoritesList]);

  const displayFavorites = favoritesList.map((pokemon, index) => (
    <PokemonDisplayCard
      key={index}
      name={pokemon.name}
      sprite={pokemon.sprite}
      types={pokemon.types}
      onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      pokemon={pokemon}
      fromFavorites={true}
    />
  ));

  return (
    <div>
      <h1>Your Favorite Pokemon</h1>
      <div className="favoritePageGridContainer">{displayFavorites}</div>
    </div>
  );
};
