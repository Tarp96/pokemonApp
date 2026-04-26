import { firstLetterUpperCase } from "../../utils/format/helperFunctions";
import { TypeBadge } from "./TypeBadge";
import { getTypeIcon } from "../../utils/constants/typeIcons";
import { useState } from "react";

const getPrimaryType = (types) => (types?.length ? types[0] : "normal");

export const PokemonTeamCard = ({ pokemon, slot, isLocked }) => {
  const [isHovered, setIsHovered] = useState(false);

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
        {!isLocked ? (
          <button
            className="removeCornerBtn"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {!isHovered ? (
              <img
                src="/assets/pokeb.webp"
                className="removePokemonButtonImage"
                alt=""
              />
            ) : (
              "X"
            )}
          </button>
        ) : (
          <div className="teamSlotBadge">#{slot}</div>
        )}

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

          <div className="teamTypeIconsRow">
            {pokemon.types?.map((type, index) => {
              const icon = getTypeIcon(type);

              return icon ? (
                <img
                  key={`icon-${type}-${index}`}
                  src={icon}
                  alt={`${type} type icon`}
                  className="teamTypeIcon"
                />
              ) : null;
            })}
          </div>

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
