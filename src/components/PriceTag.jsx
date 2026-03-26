import { getPokemonPrice } from "../data/pokemonPricing";
import "../styles/DetailPageStyle.css";
import pokeball from "../assets/pokeb.webp";

export const PriceTag = ({
  pokemonName,
  displayedOnCard,
  onClick,
  isOwned,
}) => {
  const price = pokemonName ? getPokemonPrice(pokemonName) : 0;

  return (
    <div
      className={`priceTagWrapper ${
        displayedOnCard ? "priceTagWrapperCard" : ""
      }`}
    >
      {!isOwned ? (
        <span
          onClick={onClick}
          className={`
        ${displayedOnCard ? "smallPokemonPriceTag" : "bigPokemonPriceTag"}
        priceTagElement
      `}
        >
          💰 {price}
        </span>
      ) : (
        <div
          className={`
        ownedLabelContainer
        ${displayedOnCard ? "" : "ownedStatic"}
      `}
        >
          <p className="ownedLabel">Owned</p>
          <img className="pokemonOwnedImage" src={pokeball} alt="Pokeball" />
        </div>
      )}
    </div>
  );
};
