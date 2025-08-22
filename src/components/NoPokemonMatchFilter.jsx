export const NoPokemonMatchFilter = ({ onClick }) => {
  return (
    <div className="ifNoPokemonMatchFilter">
      <p>
        No matching Pokémon found for your current search or type filter. 🧭
        <br />
        Try a different name or choose another type!
      </p>
      <button onClick={onClick}>Remove Filter</button>
      <img
        src="assets/pikaconfused.gif"
        alt="yellow mouse looking dizzy"
        className="ifNoPokemonInFilterImage"
      />
    </div>
  );
};
