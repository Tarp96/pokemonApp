import typeColors from "../utils/typecolors";
import AudioPlayer from "./AudioPlayer";
import { firstLetterUpperCase } from "./../utils/helperFunctions";

function PokemonDisplayCard({
  name,
  sprite,
  types,
  height,
  weight,
  stats,
  cries,
}) {
  const getTypeClass = (type) => {
    const typeBackground = typeColors[type] || "#ccc";
    return {
      backgroundColor: typeBackground,
      color:
        type === "ghost" ||
        type === "dragon" ||
        type === "poison" ||
        type === "dark" ||
        type === "fighting" ||
        type === "water"
          ? "white"
          : "black",
    };
  };

  return (
    <div className="pokemon-card">
      {cries?.legacy && <AudioPlayer src={cries.legacy} />}

      <img src={sprite} alt={name} />
      <h3>{firstLetterUpperCase(name)}</h3>

      <div className="types">
        {types.map((type, index) => (
          <span key={index} style={getTypeClass(type.type.name)}>
            {firstLetterUpperCase(type.type.name)}
          </span>
        ))}
      </div>

      <div className="stats">
        <p>Height: {height}</p>
        <p>Weight: {weight}</p>
      </div>
    </div>
  );
}

export default PokemonDisplayCard;
