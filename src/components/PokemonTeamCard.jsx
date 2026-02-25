import { firstLetterUpperCase } from "../utils/helperFunctions";
import { TypeBadge } from "./TypeBadge";

const getPrimaryType = (types) => (types?.length ? types[0] : "normal");

export const PokemonTeamCard = ({ pokemon, slot, isLocked }) => {
  if (isLocked) {
    return (
      <div className="teamCardElite lockedCard">
        <div className="teamCardTopRow">
          <div className="teamSlotBadge">#{slot}</div>
        </div>

        <div className="lockedCardContent">
          <div className="lockedSpritePlaceholder" />
          <p className="lockedTitle">Locked</p>
          <p className="lockedSubtitle">Buy Pokémon to unlock this slot</p>
        </div>
      </div>
    );
  }

  const primaryType = getPrimaryType(pokemon.types);

  return (
    <div className={`teamCardElite type-${primaryType}`}>
      <div className="teamCardTopRow">
        <div className="teamSlotBadge">#{slot}</div>
        <span className="teamIdPill">ID {pokemon.id}</span>
      </div>

      <div className="teamCardBody">
        <div className="teamSpriteStage">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="teamEliteSprite"
          />
        </div>

        <div className="teamCardText">
          <h3 className="teamPokemonName">
            {firstLetterUpperCase(pokemon.name)}
          </h3>

          <div className="teamTypesRow">
            {pokemon.types?.map((type, index) => (
              <TypeBadge key={`${type}-${index}`} type={type} />
            ))}
          </div>
        </div>
      </div>

      <div className="teamCardBottomGlow" />
    </div>
  );
};
