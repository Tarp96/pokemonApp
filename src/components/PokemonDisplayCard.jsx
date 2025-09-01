import AudioPlayer from "./AudioPlayer";
import { firstLetterUpperCase } from "./../utils/helperFunctions";
import { FaArrowRight } from "react-icons/fa6";
import { TypeBadge } from "./TypeBadge";
import { FavoriteButton } from "./FavoriteButton";
import { AiTwotoneSound } from "react-icons/ai";
import { useState, useEffect } from "react";
import {
  addFavorite,
  removeFavorite,
  isAlreadyFavorited,
} from "../services/favoritesService";
import { toast } from "react-toastify";

function PokemonDisplayCard({
  name,
  sprite,
  types,
  cries,
  onClick,
  pokemon,
  generation,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const exists = await isAlreadyFavorited(pokemon.name);
      setIsFavorite(exists);
    };

    checkFavorite();
  }, [pokemon.name]);

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      await removeFavorite(pokemon.name);
      toast.info(
        `${firstLetterUpperCase(pokemon.name)} removed from favorites`
      );
    } else {
      await addFavorite(pokemon);
      toast.success(`${firstLetterUpperCase(pokemon.name)} added to favorites`);
    }

    setIsFavorite(!isFavorite);
  };

  const renderTypes = types.map((typeObj, index) => {
    const typeName =
      typeof typeObj === "string" ? typeObj : typeObj?.type?.name;
    return <TypeBadge key={index} type={typeName} />;
  });

  return (
    <div className="pokemon-card">
      <div className="favoriteButtonContainer">
        <FavoriteButton onClick={handleFavoriteClick} isClicked={isFavorite} />
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

      <p>{generation}</p>

      <div className="types">{renderTypes}</div>

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
