import { Children } from "react";

export const PokemonGrid = ({ children }) => {
  const childCount = Children.count(children);

  return (
    <div
      className={`pokemonGrid ${childCount === 1 ? "singlePokemonCard" : ""}`}
    >
      {children}
    </div>
  );
};
