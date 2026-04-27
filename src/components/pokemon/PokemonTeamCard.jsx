import { firstLetterUpperCase } from "../../utils/format/helperFunctions";
import { TypeBadge } from "./TypeBadge";
import { getTypeIcon } from "../../utils/constants/typeIcons";
import { useState } from "react";
import { motion } from "framer-motion";

const getPrimaryType = (types) => (types?.length ? types[0] : "normal");

export const PokemonTeamCard = ({ pokemon, slot, isLocked, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleConfirmRemove = async () => {
    setIsRemoving(true);

    await onRemove(pokemon.id);
  };

  if (isLocked) {
    return (
      <motion.div
        transition={{
          layout: {
            duration: 0.35,
            ease: "easeInOut",
          },
        }}
        layout
        className="teamCardElite lockedCard"
      >
        <div className="teamCardTopRow">
          <div className="teamSlotBadge">#{slot}</div>
        </div>

        <div className="lockedCardContent">
          <div className="lockedSpritePlaceholder" />
          <p className="lockedTitle">Locked</p>
          <p className="lockedSubtitle">Buy Pokémon to unlock this slot</p>
        </div>
      </motion.div>
    );
  }

  const primaryType = getPrimaryType(pokemon.types);

  if (isClicked) {
    return (
      <motion.div
        exit={{
          opacity: 0,
          scale: 0.75,
          y: -20,
        }}
        transition={{
          layout: {
            duration: 0.35,
            ease: "easeInOut",
          },
          duration: 0.25,
        }}
        layout
        className={`teamCardElite removePokemonCard type-${primaryType}`}
      >
        <p className="removePokemonTitle">
          Release {firstLetterUpperCase(pokemon.name)} from your team?
        </p>

        <div className="removePokemonSpriteStage">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="teamEliteSprite"
          />
        </div>

        <div className="teamCardRemoveButtonContainer">
          <button className="confirmRemoveBtn" onClick={handleConfirmRemove}>
            Yes
          </button>
          <button
            className="cancelRemoveBtn"
            onClick={() => setIsClicked(false)}
          >
            No
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      exit={{
        opacity: 0,
        scale: 0.75,
        y: -20,
      }}
      transition={{
        layout: {
          duration: 0.35,
          ease: "easeInOut",
        },
        duration: 0.25,
      }}
      className={`teamCardElite type-${primaryType}`}
    >
      <div className="teamCardTopRow">
        {!isLocked ? (
          <button
            className="removeCornerBtn"
            onClick={() => setIsClicked(true)}
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
    </motion.div>
  );
};
