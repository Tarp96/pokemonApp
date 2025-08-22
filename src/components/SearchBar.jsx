export const SearchBar = ({ query, setQuery, onClick, list }) => {
  return (
    <div className="searchBarContainer">
      <div className="searchBarDiv">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
          placeholder="Example: Charizard or Latios"
        />
        <button onClick={onClick} className="searchBarButton">
          Search 🔎
        </button>
      </div>
      {list.length > 0 && (
        <ul className="searchHistoryList">
          {list.map((item, index) => (
            <li
              key={index}
              className="searchHistoryItem"
              onClick={() => setQuery(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
