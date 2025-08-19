import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

export const PokemonPhotos = () => {
  const { pokemon } = useOutletContext();
  const [pokemonImages, setPokemonImages] = useState([]);

  useEffect(() => {
    if (pokemon?.sprites) {
      const images = extractImageUrls(pokemon.sprites);
      setPokemonImages(images);
    }
  }, [pokemon]);

  function extractImageUrls(spriteObj) {
    const images = [];

    function recurse(obj) {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "string" && value.startsWith("https://")) {
          images.push({ key, url: value });
        } else if (typeof value === "object" && value !== null) {
          recurse(value);
        }
      }
    }

    recurse(spriteObj);
    console.log(images);
    return images;
  }

  return (
    <div className="photosPageContainer">
      <h1>Photos Page</h1> 
    </div>
  );
};
