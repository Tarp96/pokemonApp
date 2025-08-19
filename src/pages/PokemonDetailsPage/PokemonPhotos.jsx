import { useOutletContext } from "react-router-dom";

export const PokemonPhotos = () => {
  const { pokemon } = useOutletContext();

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
    return images;
  }

  return (
    <div className="photosPageContainer">
      <h1>Photos Page</h1> 
      <section className="defaultSpritesSection">
        {pokemon.sprites?.front_default && (
          <img
            src={
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png"
            }
            alt="Default front sprite"
          />
        )}

        {pokemon.sprites?.front_shiny && (
          <img
            src={
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/382.png"
            }
            alt="Default front sprite"
          />
        )}
      </section>
    </div>
  );
};
