import PokemonDisplayCard from "../../components/PokemonDisplayCard";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import PokemonDisplayCardSkeleton from "./../../components/SkeletonLoading/PokemonDisplayCardSkeleton";
import { PaymentModal } from "../../components/PaymentModal";
import { usePurchaseModal } from "../../hooks/usePurchaseModal";

export const FavoritePokemonsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useOutletContext();

  const { isOpen, selectedPokemon, openModal, closeModal } = usePurchaseModal();

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
        priceTagOnClick={() => openModal(pokemon)}
        fromFavorites
        generation={pokemon.generation}
        variant="profile"
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

      {isOpen && selectedPokemon && (
        <PaymentModal
          pokemon={selectedPokemon}
          closeModalOnClick={closeModal}
        />
      )}
    </div>
  );
};
