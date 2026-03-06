import typeColors from "./../utils/typecolors";
import { firstLetterUpperCase } from "../utils/helperFunctions";
import { getTypeIcon } from "../utils/typeIcons";
import { useState } from "react";

export const FilterByTypeButtons = ({ filterByTypeFunc, activeFilter }) => {
  const myObj = typeColors;

  const [showFilters, setShowFilters] = useState(window.innerWidth > 480);

  return (
    <>
      <button
        className="filterToggleBtn"
        onClick={() => setShowFilters(!showFilters)}
      >
        Filter by Type {showFilters ? "▲" : "▼"}
      </button>

      {showFilters && (
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
                onClick={() => {
                  filterByTypeFunc(key);
                  setShowFilters(false);
                }}
              >
                <span>{firstLetterUpperCase(key)}</span>
                <img src={iconUrl} alt={`${key} icon`} />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};
