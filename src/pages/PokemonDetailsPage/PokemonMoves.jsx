import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

export const PokemonMoves = () => {
  const { pokemon } = useOutletContext();
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    populateMoveArr();
  }, []);

  function populateMoveArr() {
    const emptyArr = [];
    pokemon.moves?.map((m) => emptyArr.push(m.move.name));
    setMoves(emptyArr);
    console.log(emptyArr);
  }

  const displayMoves = moves.map((m) => <li>{m}</li>);

  return (
    <div>
      <h1>Pokemon Moves</h1>
      <ul>{displayMoves}</ul>
    </div>
  );
};
