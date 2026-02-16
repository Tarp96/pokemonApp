import { getPokemonPrice } from "../data/pokemonPricing";
import "../styles/DetailPageStyle.css";
import { spendCoins } from "../services/coinService";

export const PriceTag = ({ pokemonName, displayedOnCard }) => {
  const price = pokemonName ? getPokemonPrice(pokemonName) : 0;

  return (
    <div
      onClick={() => {
        console.log("Click!");
      }}
    >
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
