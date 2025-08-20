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

  return (
    <div className="movesPage">
      <div className="movesHeader">
        <img
          className="pokemonImage"
          src={pokemon.sprites?.other["official-artwork"]?.front_default}
          alt={pokemon.name}
        />
        <h1 className="movesTitle">{`${firstLetterUpperCase(
          pokemon.name
        )} moves`}</h1>
      </div>

      <div className="movesGrid">
        {moves.map((m) => (
          <div className="moveCard" key={m}>
            {m}
          </div>
        ))}
      </div>
    </div>
  );
};
