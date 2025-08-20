import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

export const PokemonMoves = () => {
  const { pokemon } = useOutletContext();
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    const moveNames = pokemon.moves?.map((m) => m.move.name) || [];
    setMoves(moveNames);
  }, [pokemon]);

  const displayMoves = moves.map((m) => <li key={m}>{m}</li>);

  return (
    <div>
      <h1>Pokemon Moves</h1>
      <ul>{displayMoves}</ul>
    </div>
  );
};
