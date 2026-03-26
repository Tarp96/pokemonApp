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
    <div className="priceTagWrapper">
      <span
        onClick={!isOwned ? onClick : undefined}
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
        <p className="ownedLabel">Owned</p>
        <img className="pokemonOwnedImage" src={pokeball} alt="Pokeball" />
      </div>
    </div>
  );
};
