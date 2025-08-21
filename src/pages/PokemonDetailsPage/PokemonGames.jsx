import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { gameImages } from "./../../utils/gameImages";

export const PokemonGames = () => {
  const { pokemon } = useOutletContext();

  return (
    <div>
      <h1>Pokemon Games Page</h1>
    </div>
  );
};
