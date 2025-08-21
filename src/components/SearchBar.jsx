export const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="searchbarContainer">
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Example: Charizard or water 🔎"
      />
    </div>
  );
};
