import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { fetchMoveData } from "../../utils/pokeApi";

export const PokemonMoves = () => {
  const { pokemon } = useOutletContext();
  const [moves, setMoves] = useState([]);
  const [moveDetails, setMoveDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const moveNames = pokemon.moves?.map((m) => m.move.name) || [];
    moveNames.sort();
    setMoves(moveNames);
  }, [pokemon]);

  useEffect(() => {
    async function getMoveDetails() {
      if (moves.length === 0) return;

      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    getMoveDetails();
  }, [moves]);

  if (loading) {
    return (
      <div className="movesPage">
        <p>Loading data....</p>
      </div>
    );
  }

  const moveDetailsDisplay = moveDetails.map((m) => (
    <>
      <div>
        <p>{m.name}</p>
        <p>{m.type.name}</p>
      </div>
    </>
  ));

  return <div className="movesPage">{moveDetailsDisplay}</div>;
};
