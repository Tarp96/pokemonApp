import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { firstLetterUpperCase } from "../../utils/helperFunctions";

export const PokemonMoves = () => {
  const { pokemon } = useOutletContext();
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    const moveNames = pokemon.moves?.map((m) => m.move.name) || [];
    moveNames.sort();
    setMoves(moveNames);
  }, [pokemon]);

  const displayMoves = moves.map((m) => (
    <li key={m}>{firstLetterUpperCase(m)}</li>
  ));

  return (
    <div>
      <h1>Pokemon Moves</h1>
      <ul>{displayMoves}</ul>
    </div>
  );
};
