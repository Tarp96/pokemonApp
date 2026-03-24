import { firstLetterUpperCase } from "../utils/helperFunctions";

export const BadgeCard = ({ badge, index }) => {
  const { name, threshold, largeImage, unlocked } = badge;

  return (
    <div className={`badgeCard ${unlocked ? "unlocked" : "locked"}`}>
      <div className="badgeCardTopRow">
        <div className="badgeTier">#{index + 1}</div>
      </div>

      <div className="badgeImageContainer">
        <img src={largeImage} alt={name} className="badgeImage" />
      </div>

      <div className="badgeCardText">
        <h3 className="badgeName">{firstLetterUpperCase(name)}</h3>

        {!unlocked && <p className="badgeRequirement">Unlock at {threshold}</p>}
      </div>

      <div className="badgeCardGlow" />
    </div>
  );
};
