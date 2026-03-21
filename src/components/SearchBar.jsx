import { useState } from "react";
import { firstLetterUpperCase } from "../utils/helperFunctions";
import pokeball from "../assets/pokeb.webp";

export const SearchBar = ({
  query,
  setQuery,
  onClick,
  secondOnClick,
  clearFilter,
  isFiltered,
  list,
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
                onClick(query);
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

        <button onClick={() => onClick(query)} className="searchBarButton">
          Search 🔎
        </button>
      </div>

      <div className="randomBtnWrapper">
        <button
          onClick={secondOnClick}
          className={`randomPokemonButton ${isFiltered ? "" : "biggerRandomButton"}`}
        >
          {!isFiltered && (
            <img src={pokeball} alt="Pokeball" className="randomPokeballIcon" />
          )}
          Random Pokémon
        </button>

        {isFiltered && (
          <button onClick={clearFilter} className="clearFilterButton">
            Clear Filter
          </button>
        )}
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
                <div className="prevSearchListItemDiv">
                  {firstLetterUpperCase(item)}
                  <img
                    src="assets/pokeb.png"
                    className="searchHistoryPokeball"
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
