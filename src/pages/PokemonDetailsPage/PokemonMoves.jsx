import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { fetchMoveData } from "../../utils/pokeApi";
import { getTypeIcon } from "../../utils/typeIcons";

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
        )} Moves`}</h1>
      </div>

      <table className="movesTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Power</th>
            <th>PP</th>
            <th>Accuracy</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          {moveDetails.map((move) => (
            <tr key={move.id}>
              <td>{firstLetterUpperCase(move.name)}</td>
              <td>
                {firstLetterUpperCase(move.type.name)} <img src={``} />
              </td>
              <td>{firstLetterUpperCase(move.damage_class.name)}</td>
              <td>{move.power ?? "-"}</td>
              <td>{move.pp ?? "-"}</td>
              <td>{move.accuracy ?? "-"}</td>
              <td>
                {move.effect_entries?.[0]?.short_effect?.replace(
                  /\$effect_chance/g,
                  move.effect_chance ?? ""
                ) ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
