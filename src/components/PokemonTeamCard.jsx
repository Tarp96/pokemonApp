import { firstLetterUpperCase } from "../utils/helperFunctions";
import { TypeBadge } from "./TypeBadge";

const getPrimaryType = (types) => (types?.length ? types[0] : "normal");

const formatGeneration = (gen) => {
  if (!gen) return "";

  const roman = gen.split("-").pop()?.toUpperCase();
  return `Generation ${roman}`;
};

const formatPurchasedAt = (purchasedAt) => {
  if (!purchasedAt) return "";

  if (typeof purchasedAt?.toDate === "function") {
    return purchasedAt.toDate().toLocaleDateString();
  }

  if (typeof purchasedAt?.seconds === "number") {
    return new Date(purchasedAt.seconds * 1000).toLocaleDateString();
  }

  return "";
};

export const PokemonTeamCard = ({ pokemon, slot }) => {
  const primaryType = getPrimaryType(pokemon.types);
  const purchased = formatPurchasedAt(pokemon.purchasedAt);
  const genLabel = formatGeneration(pokemon.generation);

  return (
    <div className={`teamCardElite type-${primaryType}`}>
      <div className="teamCardTopRow">
        <div className="teamSlotBadge">#{slot}</div>
        <div className="teamMetaRight">
          <span className="teamIdPill">ID {pokemon.id}</span>
        </div>
      </div>

      <div className="teamCardBody">
        <div className="teamSpriteStage">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="teamEliteSprite"
            loading="lazy"
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

          <div className="teamSubMetaRow">
            {genLabel && <span className="teamMetaChip">{genLabel}</span>}
            {purchased && (
              <span className="teamMetaChip">Bought {purchased}</span>
            )}
          </div>
        </div>
      </div>

      <div className="teamCardBottomGlow" />
    </div>
  );
};
