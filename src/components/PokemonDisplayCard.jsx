import typeColors from "../utils/typecolors";
import AudioPlayer from "./AudioPlayer";
import { firstLetterUpperCase } from "./../utils/helperFunctions";
import { FaArrowRight } from "react-icons/fa6";
import { TypeBadge } from "./TypeBadge";
import { FavoriteButton } from "./FavoriteButton";

function PokemonDisplayCard({
  name,
  sprite,
  types,
  height,
  weight,
  stats,
  cries,
  onClick,
  favoriteOnClick,
}) {
  return (
    <div className="pokemon-card">
      <div className="favoriteButtonContainer">
        <FavoriteButton onClick={favoriteOnClick} />
      </div>

      <div className="audioButtonCardWrapper">
        {cries?.legacy && <AudioPlayer src={cries.legacy}>🔊</AudioPlayer>}
      </div>

      <img src={sprite} alt={name} />
      <h3>{firstLetterUpperCase(name)}</h3>

      <div className="types">
        {types.map((typeObj) => (
          <TypeBadge key={typeObj.type.name} type={typeObj.type.name} />
        ))}
      </div>

      <div className="linkToDetailPageBtnContainer">
        <button onClick={onClick} className="linkToDetailsPageButton">
          Details
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default PokemonDisplayCard;
