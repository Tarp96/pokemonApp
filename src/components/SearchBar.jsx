export const SearchBar = ({ query, setQuery, onClick }) => {
  return (
    <div className="searchbarContainer">
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Example: Charizard or water 🔎"
      />
      <button onClick={onClick}>Search 🔎</button>
    </div>
  );
};
