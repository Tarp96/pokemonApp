import { useState, useEffect } from "react";
import {
  fetchPokemonDetails,
  fetchPokemonSpeciesDetails,
} from "../../utils/pokeApi";
import { useParams, Outlet, NavLink } from "react-router-dom";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { FaArrowLeft } from "react-icons/fa6";

export const PokemonDetailsPage = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState({});
  const [pokemonSpecies, setPokemonSpecies] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonDetails(name);
        setPokemon(data);
        const speciesData = await fetchPokemonSpeciesDetails(name);
        setPokemonSpecies(speciesData);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonDetails();
  }, [name]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="detailsPageContainer">
      <div className="detailsPageHeader">
        <NavLink to="/" className="navigateBackButton">
          <FaArrowLeft className="backIcon" />
          <span className="backText">Back</span>
        </NavLink>
        <h1 className="detailsPageTitle">
          {pokemon.name && firstLetterUpperCase(pokemon.name)} #{pokemon.id}
        </h1>
        <div></div>
      </div>

      <div className="detailsNavigationBar">
        <NavLink to="" end>
          Overview
        </NavLink>
        <NavLink to="stats" end>
          Stats
        </NavLink>
        <NavLink to="photos" end>
          Photos
        </NavLink>
        <NavLink to="games" end>
          Games
        </NavLink>
      </div>

      <Outlet context={{ pokemon, pokemonSpecies }} />
    </div>
  );
};
