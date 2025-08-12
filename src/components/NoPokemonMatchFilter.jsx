import React from "react";

export const NoPokemonMatchFilter = ({ onClick }) => {
  return (
    <div className="ifNoPokemonMatchFilter">
      <p>None of the Pokemon on current page belong to this type</p>
      <button onClick={onClick}>Remove Filter</button>
      <img
        src="assets/pikaconfused.gif"
        alt="yellow mouse looking dizzy"
        className="ifNoPokemonInFilterImage"
      />
    </div>
  );
};
