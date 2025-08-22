export const SearchBar = ({ query, setQuery, onClick }) => {
  return (
    <div className="searchbarContainer">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Example: Charizard or Latios 🔎"
      />
      <button onClick={onClick} className="searchBarButton">
        Search 🔎
      </button>
    </div>
  );
};
