import { getUnlockedBadges } from "../../utils/BADGES";

export const BadgeRow = ({ pokemonCaught }) => {
  const badges = getUnlockedBadges(pokemonCaught);

  return (
    <div className="trainerCardBadgeSection">
      <div className="trainerCardBadgeHeader">
        <h3>Badges</h3>
        <span>
          {badges.filter((b) => b.unlocked).length} / {badges.length}
        </span>
      </div>

      <div className="trainerBadgeRow">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`badgeSlot ${badge.unlocked ? "unlocked" : "locked"}`}
          >
            <img src={badge.image} alt={badge.name} />

            <span className="badgeTooltip">
              {badge.name}
              {!badge.unlocked && (
                <span className="badgeRequirement"> ({badge.threshold})</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
