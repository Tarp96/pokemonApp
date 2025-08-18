import { useOutletContext } from "react-router-dom";
import { firstLetterUpperCase } from "./../../utils/helperFunctions";

export const PokemonStats = () => {
  const { pokemon } = useOutletContext();

  console.log("From Pokemonstats:", pokemon);

  return (
    <>
      <h1>Pokemon Stats</h1>
    </>
  );
};
