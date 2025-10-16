import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { fetchMoveData } from "../../utils/pokeApi";

export const PokemonMoves = () => {
  const { pokemon } = useOutletContext();
  const [moves, setMoves] = useState([]);
  const [moveDetails, setMoveDetails] = useState([]);

  useEffect(() => {
    const moveNames = pokemon.moves?.map((m) => m.move.name) || [];
    moveNames.sort();
    setMoves(moveNames);
  }, [pokemon]);

  useEffect(() => {
    async function getMoveDetails() {
      if (moves.length === 0) return;

      try {
        const results = await Promise.all(
          moves.map(async (move) => {
            const data = await fetchMoveData(move);
            return data;
          })
        );
        setMoveDetails(results);
      } catch (error) {
        console.error("Error fetching move details:", error);
      }
    }

    getMoveDetails();
  }, [moves]);

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
        {moveDetails.map((m) => (
          <div className="moveCard" key={m.id}>
            {m.name}
          </div>
        ))}
      </div>
    </div>
  );
};
