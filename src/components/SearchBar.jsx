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
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </div>
  );
};
