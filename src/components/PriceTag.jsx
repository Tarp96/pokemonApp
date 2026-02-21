import { getPokemonPrice } from "../data/pokemonPricing";
import "../styles/DetailPageStyle.css";

export const PriceTag = ({
  pokemonName,
  displayedOnCard,
  onClick,
  isOwned,
}) => {
  const price = pokemonName ? getPokemonPrice(pokemonName) : 0;

  return isOwned ? (
    <div className="ownedLabelContainer">
      <p className="ownedLabel">Already Owned</p>
      <img
        className="pokemonOwnedImage"
        src="/assets/pokeb.png"
        alt="Pokeball"
      />
    </div>
  ) : (
    <span
      onClick={onClick}
      className={
        displayedOnCard ? "smallPokemonPriceTag" : "bigPokemonPriceTag"
      }
    >
      💰 {price}
    </span>
  );
};
