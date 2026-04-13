import { firstLetterUpperCase } from "../../utils/format/helperFunctions";

export const AbilityCard = ({ name, isHidden, effect }) => {
  return (
    <div className="abilityCard">
      <p className="abilityName">
        {firstLetterUpperCase(name)}{" "}
        {isHidden ? <span className="hiddenTag">(Hidden)</span> : null}
      </p>
      <p className="abilityEffect">{effect ?? "No description available."}</p>
    </div>
  );
};
