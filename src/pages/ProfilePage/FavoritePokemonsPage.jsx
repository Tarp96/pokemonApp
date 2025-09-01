import { useEffect, useState } from "react";
import { getAllFavorites } from "../../services/favoritesService";
import PokemonDisplayCard from "../../components/PokemonDisplayCard";
import { useNavigate } from "react-router-dom";

export const FavoritePokemonsPage = () => {
  const [favoritesList, setFavoritesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const externalList = await getAllFavorites();
      setFavoritesList(externalList);
      console.log(externalList);
    };
    load();
  }, []);

  const displayFavorites = favoritesList.map((pokemon, index) => {
    const normalizedTypes = pokemon.types?.map((t) =>
      typeof t === "string" ? { type: { name: t } } : t
    );

    const normalizedCries =
      typeof pokemon.cries === "string"
        ? { legacy: pokemon.cries }
        : pokemon.cries;

    return (
      <PokemonDisplayCard
        key={pokemon.name}
        name={pokemon.name}
        sprite={pokemon.sprite}
        types={normalizedTypes}
        cries={normalizedCries}
        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
        pokemon={pokemon}
        fromFavorites
        generation={pokemon.generation}
      />
    );
  });

  return (
    <div>
      <h1>Your Favorite Pokemon</h1>
      <div className="favoritePageGridContainer">{displayFavorites}</div>
    </div>
  );
};
