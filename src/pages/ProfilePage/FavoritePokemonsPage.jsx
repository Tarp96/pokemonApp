import PokemonDisplayCard from "../../components/PokemonDisplayCard";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import PokemonDisplayCardSkeleton from "./../../components/SkeletonLoading/PokemonDisplayCardSkeleton";

export const FavoritePokemonsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useOutletContext();

  const displayFavorites = favorites?.map((pokemon) => {
    const normalizedTypes = pokemon.types?.map((t) =>
      typeof t === "string" ? { type: { name: t } } : t,
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
        onClick={() =>
          navigate(`/pokemon/${pokemon.name}`, {
            state: { from: location },
          })
        }
        pokemon={pokemon}
        fromFavorites
        generation={pokemon.generation}
        className="profileFavoritePokemonCard"
      />
    );
  });

  if (favorites === null) {
    return (
      <div className="favoritePageGridContainer">
        {Array.from({ length: 3 }).map((_, i) => (
          <PokemonDisplayCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favoriteListEmptyContainer">
        <h2>Add Pokemon to your favorites to view them here</h2>
        <img src="/assets/favoriteEmpty.png" alt="Pokemon image" />
      </div>
    );
  }

  return (
    <div>
      <h1>Your Favorite Pokemon</h1>
      <div className="favoritePageGridContainer">{displayFavorites}</div>
    </div>
  );
};
