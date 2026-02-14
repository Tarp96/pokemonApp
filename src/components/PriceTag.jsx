import { getPokemonPrice } from "../data/pokemonPricing";
import "../styles/DetailPageStyle.css";

export const PriceTag = ({ pokemonName, displayedOnCard }) => {
  const price = pokemonName ? getPokemonPrice(pokemonName) : 0;

  return (
    <>
      <span
        className={
          displayedOnCard ? "smallPokemonPriceTag" : "bigPokemonPriceTag"
        }
      >
        💰 {price}
      </span>
    </>
  );
};
