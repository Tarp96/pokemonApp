import { getPokemonPrice } from "../data/pokemonPricing";
import "../styles/DetailPageStyle.css";

export const PriceTag = ({
  pokemonName,
  displayedOnCard,
  onClick,
  isOwned,
}) => {
  const price = pokemonName ? getPokemonPrice(pokemonName) : 0;

  console.log("isOwned:", isOwned);

  return (
    <div className="priceTagWrapper">
      <span
        onClick={onClick}
        className={`
        ${displayedOnCard ? "smallPokemonPriceTag" : "bigPokemonPriceTag"}
        priceTagElement
        ${isOwned ? "priceTagHidden" : ""}
      `}
      >
        💰 {price}
      </span>

      <div
        className={`ownedLabelContainer ownedElement ${
          isOwned ? "ownedVisible" : ""
        }`}
      >
        <p className="ownedLabel">Already Owned</p>
        <img
          className="pokemonOwnedImage"
          src="/assets/pokeb.png"
          alt="Pokeball"
        />
      </div>
    </div>
  );
};
