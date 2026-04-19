export const NoPokemonMatchFilter = ({ onClick, type }) => {
  const message =
    type === "type"
      ? "No Pokémon found with the selected type. 🧬\nTry another type!"
      : "No Pokémon found matching that name. \nCheck the spelling and try again!";

  return (
    <div className="ifNoPokemonMatchFilter">
      <p>{message}</p>

      <img
        src="assets/pikaconfused.gif"
        alt="yellow mouse looking dizzy"
        className="ifNoPokemonInFilterImage"
      />
      <button onClick={onClick}>Remove Filter</button>
    </div>
  );
};
