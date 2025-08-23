import { useState } from "react";
import { firstLetterUpperCase } from "../utils/helperFunctions";

export const SearchBar = ({
  query,
  setQuery,
  onClick,
  list,
  displayPrevSearches,
  showSearches,
  setShowSearches,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="searchBarContainer">
      <div className="searchBarDiv">
        <div className="searchBarAndClearBtn">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSearches(true)}
            onBlur={() => setTimeout(() => setShowSearches(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onClick();
              }
            }}
            placeholder="Example: Charizard or Latios"
          />
          {query && (
            <button
              className="clearSearchButton"
              onClick={() => setQuery("")}
              aria-label="Clear search input"
            >
              ✕
            </button>
          )}
        </div>
        <button onClick={onClick} className="searchBarButton">
          Search 🔎
        </button>
      </div>

      {showSearches && list.length > 0 && (
        <>
          <h2 className="prevSearchesTitle">Previous searches:</h2>
          <ul className="searchHistoryList">
            {list.map((item, index) => (
              <li
                key={index}
                className={`searchHistoryItem ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => {
                  setQuery(item);
                  onClick(item);
                  setTimeout(() => setActiveIndex(null), 300);
                }}
              >
                <div>
                  {firstLetterUpperCase(item)}
                  <img src="assets/pokeb.png" />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
