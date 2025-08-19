import { useOutletContext } from "react-router-dom";

export const PokemonPhotos = () => {
  const { pokemon } = useOutletContext();

  return (
    <div className="photosPageContainer">
      <h1>Photos Page</h1> 
      <section className="defaultImagesSectionContainer">
        {pokemon.sprites?.front_default && (
          <img
            src={
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png"
            }
            alt="Default front sprite"
          />
        )}
      </section>
    </div>
  );
};
