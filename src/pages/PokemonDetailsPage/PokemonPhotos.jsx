import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

export const PokemonPhotos = () => {
  const { pokemon } = useOutletContext();
  const [pokemonImages, setPokemonImages] = useState([]);
  const [mode, setMode] = useState("normal");

  useEffect(() => {
    if (pokemon?.sprites) {
      const images = extractImageUrls(pokemon.sprites);
      setPokemonImages(images);
    }
  }, [pokemon]);

  function extractImageUrls(spriteObj) {
    const images = [];

    function recurse(obj, path = "") {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "string" && value.startsWith("https://")) {
          const isShiny = path.includes("shiny") || key.includes("shiny");

          let section = path.split(".")[0] || "General";
          if (section === "other") {
            section = path.split(".")[1] || "Other";
          }

          images.push({
            key,
            url: value,
            type: isShiny ? "shiny" : "normal",
            section,
          });
        } else if (typeof value === "object" && value !== null) {
          recurse(value, path + key + ".");
        }
      }
    }

    recurse(spriteObj);
    return images;
  }

  const groupedImages = pokemonImages.reduce((acc, img) => {
    if (img.type !== mode) return acc;
    if (!acc[img.section]) acc[img.section] = [];
    acc[img.section].push(img);
    return acc;
  }, {});

  return (
    <div className="photosPageContainer">
      <div className="modeToggle">
        <button
          className={`modeButton ${mode === "normal" ? "active" : ""}`}
          onClick={() => setMode("normal")}
        >
          Normal
        </button>
        <button
          className={`modeButton ${mode === "shiny" ? "active" : ""}`}
          onClick={() => setMode("shiny")}
        >
          Shiny
        </button>
      </div>

      {Object.entries(groupedImages).map(([section, images]) => (
        <div key={section} className="imageSection">
          <h2 className="sectionTitle">
            {section
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </h2>
          <div className="imageGrid">
            {images.map((img) => (
              <div key={img.key + img.url} className="imageCard">
                <img src={img.url} alt={img.key} />
                <p>
                  {img.key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
