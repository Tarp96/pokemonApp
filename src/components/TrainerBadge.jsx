import { getTrainerBadge } from "../utils/getTrainerBadge";

export const TrainerBadge = ({ pokemonCaught }) => {
  const badge = getTrainerBadge(pokemonCaught);

  return (
    <div className="trainerBadge" style={{ borderColor: badge.color }}>
      <span className="badgeEmoji">{badge.emoji}</span>
      <span className="badgeTitle">{badge.title}</span>
    </div>
  );
};
