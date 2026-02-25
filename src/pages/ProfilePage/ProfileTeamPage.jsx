import { useOutletContext } from "react-router-dom";

export const ProfileTeamPage = () => {
  const { team } = useOutletContext();

  const teamItems = team.map((pokemonItem, index) => (
    <li key={index}>{pokemonItem.name}</li>
  ));

  return <>{teamItems}</>;
};
