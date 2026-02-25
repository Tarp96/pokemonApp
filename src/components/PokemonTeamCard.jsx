import { firstLetterUpperCase } from "../utils/helperFunctions";
import { TypeBadge } from "./TypeBadge";

export const PokemonTeamCard = ({ pokemon }) => {
  const renderTypes = pokemon.types?.map((typeObj, index) => {
    const typeName =
      typeof typeObj === "string" ? typeObj : typeObj?.type?.name;

    return <TypeBadge key={index} type={typeName} />;
  });

  return (
    <div className="pokemonTeamCard">
      <div className="teamCardSpriteWrapper">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="teamCardSprite"
        />
      </div>

      <div className="teamCardInfo">
        <h3>{firstLetterUpperCase(pokemon.name)}</h3>

        <div className="teamCardTypes">{renderTypes}</div>
      </div>
    </div>
  );
};
