import typeColors from "../../utils/typecolors";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { getTypeIcon } from "../../utils/typeIcons";
import { useState, useEffect } from "react";

export const FilterByTypeButtons = ({
  filterByTypeFunc,
  activeFilter,
  isFiltered,
}) => {
  const myObj = typeColors;

  const [showFilters, setShowFilters] = useState(window.innerWidth > 480);

  useEffect(() => {
    if (!isFiltered) {
      setShowFilters(true);
    }
  }, [isFiltered]);

  return (
    <>
      <button
        className="filterToggleBtn"
        onClick={() => setShowFilters(!showFilters)}
        aria-expanded={showFilters}
        aria-controls="filter-buttons"
      >
        Filter by Type {showFilters ? "▲" : "▼"}
      </button>

      {showFilters && (
        <div id="filter-buttons" className="filterButtonContainer">
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
                  if (window.innerWidth < 480) {
                    setShowFilters(false);
                  }
                }}
                aria-label={`Filter by ${firstLetterUpperCase(key)} type`}
                aria-pressed={isActive}
              >
                <span aria-hidden="true">{firstLetterUpperCase(key)}</span>
                <img src={iconUrl} alt="" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};
