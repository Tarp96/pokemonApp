import { AbilityCard } from "./AbilityCard";

export const AbilitiesList = ({ abilities }) => {
  if (!abilities?.length) return null;

  return (
    <>
      {abilities.map((ab) => (
        <AbilityCard
          key={ab.name}
          name={ab.name}
          isHidden={ab.isHidden}
          effect={ab.effect}
        />
      ))}
    </>
  );
};
