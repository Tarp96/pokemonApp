import { useOutletContext } from "react-router-dom";
import { gameImages } from "./../../utils/gameImages";
import { firstLetterUpperCase } from "../../utils/helperFunctions";

export const PokemonGames = () => {
  const { pokemon } = useOutletContext();

  const displayGames = pokemon.game_indices?.map((g) => {
    const matchedImage = gameImages.find((img) => img.name === g.version.name);

    return (
      <div key={g.version.name} className="gameCard">
        <p>{firstLetterUpperCase(g.version.name)}</p>
        {matchedImage ? (
          <img src={matchedImage.imgUrl} alt={g.version.name} />
        ) : (
          <p>Image not available</p>
        )}
      </div>
    );
  });

  return (
    <div>
      <h1 className="gamePageTitle">Games {pokemon.name} features in</h1>
      <div className="gamePageContainer">{displayGames}</div>
    </div>
  );
};
