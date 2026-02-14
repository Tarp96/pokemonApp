import { getPokemonPrice } from "../data/pokemonPricing";
import "../styles/DetailPageStyle.css";

export const PriceTag = ({ pokemonName }) => {
  const price = pokemonName ? getPokemonPrice(pokemonName) : 0;

  return (
    <>
      <span className="pokemonPrice">💰 {price}</span>
    </>
  );
};
