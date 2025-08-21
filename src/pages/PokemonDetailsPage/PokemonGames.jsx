import { useOutletContext } from "react-router-dom";
import { gameImages } from "./../../utils/gameImages";

export const PokemonGames = () => {
  const { pokemon } = useOutletContext();

  const displayGames = pokemon.game_indices?.map((g) => {
    const matchedImage = gameImages.find((img) => img.name === g.version.name);

    return (
      <div key={g.version.name}>
        <p>{g.version.name}</p>
        {matchedImage ? (
          <img src={matchedImage.imgUrl} alt={g.version.name} />
        ) : (
          <p>Image not available</p>
        )}
      </div>
    );
  });

  return <div>{displayGames}</div>;
};
