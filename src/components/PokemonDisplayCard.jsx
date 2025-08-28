import AudioPlayer from "./AudioPlayer";
import { firstLetterUpperCase } from "./../utils/helperFunctions";
import { FaArrowRight } from "react-icons/fa6";
import { TypeBadge } from "./TypeBadge";
import { FavoriteButton } from "./FavoriteButton";
import { AiTwotoneSound } from "react-icons/ai";
import { useState } from "react";

function PokemonDisplayCard({
  name,
  sprite,
  types,
  cries,
  onClick,
  clicked,
  favoriteOnClick,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="pokemon-card">
      <div className="favoriteButtonContainer">
        <FavoriteButton onClick={favoriteOnClick} />
      </div>

      <div className="audioButtonCardWrapper">
        {cries?.legacy && (
          <AudioPlayer src={cries.legacy}>
            <AiTwotoneSound />
          </AudioPlayer>
        )}
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
