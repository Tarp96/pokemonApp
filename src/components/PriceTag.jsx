import { getPokemonPrice } from "../data/pokemonPricing";
import "../styles/DetailPageStyle.css";

export const PriceTag = ({ pokemonName, displayedOnCard, onClick }) => {
  const price = pokemonName ? getPokemonPrice(pokemonName) : 0;

  return (
    <div onClick={onClick}>
      <span
        className={
          displayedOnCard ? "smallPokemonPriceTag" : "bigPokemonPriceTag"
        }
      >
        💰 {price}
      </span>
    </div>
  );
};
