import { useState, useEffect } from "react";
import {
  fetchPokemonDetails,
  fetchPokemonSpeciesDetails,
} from "../../utils/pokeApi";
import { useParams, Outlet, NavLink } from "react-router-dom";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { FaArrowLeft } from "react-icons/fa6";
import { PageNavigationBar } from "../../components/PageNavigationbar";

export const PokemonDetailsPage = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState({});
  const [pokemonSpecies, setPokemonSpecies] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadPokemonDetails = async () => {
      try {
        setError(null);
        setLoading(true);

        const [data, speciesData] = await Promise.all([
          fetchPokemonDetails(name),
          fetchPokemonSpeciesDetails(name),
        ]);

        if (cancelled) return;
        setPokemon(data);
        setPokemonSpecies(speciesData);
      } catch (err) {
        console.error("Failed to fetch Pokémon details:", err);
        if (!cancelled) setError("Could not load Pokémon data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadPokemonDetails();
    return () => {
      cancelled = true;
    };
  }, [name]);

  if (loading || !pokemon || !pokemonSpecies) {
    return <p>Loading...</p>;
  }

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

      <PageNavigationBar
        links={[
          { path: "", label: "Overview" },
          { path: "stats", label: "Stats" },
          { path: "photos", label: "Photos" },
          { path: "games", label: "Games" },
          { path: "moves", label: "Moves" },
        ]}
      />

      <Outlet context={{ pokemon, pokemonSpecies }} />
    </div>
  );
};
