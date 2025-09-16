import typeColors from "./../utils/typecolors";
import { firstLetterUpperCase } from "../utils/helperFunctions";
import { getTypeIcon } from "../utils/typeIcons";

export const FilterByTypeButtons = ({ filterByTypeFunc, activeFilter }) => {
  const myObj = typeColors;

  return (
    <div className="filterButtonContainer">
      {Object.keys(myObj).map((key) => {
        const isActive = activeFilter === key;
        const iconUrl = getTypeIcon(key);

        return (
          <button
            key={key}
            className={isActive ? "active" : ""}
            style={{
              border: `2px solid ${myObj[key]}`,
              backgroundColor: isActive ? myObj[key] : "white",
              color: isActive ? "white" : "black",
            }}
            onClick={() => filterByTypeFunc(key)}
          >
            <span>{firstLetterUpperCase(key)}</span>
            <img src={iconUrl} alt={`${key} icon`} />
          </button>
        );
      })}
    </div>
  );
};
