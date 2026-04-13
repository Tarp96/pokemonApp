import { useOutletContext } from "react-router-dom";
import { getUnlockedBadges } from "../../utils/BADGES";
import { BadgeCard } from "../../components/badges/BadgeCard";

export const ProfileBadgesPage = () => {
  const { pokemonCaught } = useOutletContext();

  const badges = getUnlockedBadges(pokemonCaught ?? 0);

  return (
    <div className="badgeGrid">
      {badges.map((badge, index) => (
        <BadgeCard key={index} badge={badge} index={index} />
      ))}
    </div>
  );
};
