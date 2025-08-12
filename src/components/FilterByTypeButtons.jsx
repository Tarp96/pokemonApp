import React from "react";
import typeColors from "./../utils/typecolors";
import { firstLetterUpperCase } from "../utils/helperFunctions";

export const FilterByTypeButtons = ({ filterByTypeFunc, activeFilter }) => {
  const myObj = typeColors;

  return (
    <div className="filterButtonContainer">
      {Object.keys(myObj).map((key) => {
        const isActive = activeFilter === key;

        return (
          <button
            key={key}
            style={{
              border: `solid 2px ${myObj[key]}`,
              backgroundColor: isActive ? myObj[key] : "white",
              color: isActive ? "white" : "black",
              marginRight: "5px",
            }}
            onClick={() => filterByTypeFunc(key)}
          >
            {firstLetterUpperCase(key)}
          </button>
        );
      })}
    </div>
  );
};
