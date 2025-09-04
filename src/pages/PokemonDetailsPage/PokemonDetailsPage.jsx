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

  useEffect(() => {
    const controller = new AbortController();

    const loadAbilityDetails = async () => {
      if (!pokemon.abilities) return;

      try {
        const fetchedDetails = await Promise.all(
          pokemon.abilities.map(async (a) => {
            const detail = await fetchAbilityDetails(a.ability.name);
            const englishEntry = detail.effect_entries.find(
              (entry) => entry.language.name === "en"
            );

            return {
              name: a.ability.name,
              isHidden: a.is_hidden,
              effect: englishEntry?.short_effect || "No description available.",
            };
          })
        );

        setAbilityDetails(fetchedDetails);
      } catch (error) {
        console.error("Failed to load ability details:", error);
      }
    };

    loadAbilityDetails();

    return () => controller.abort();
  }, [pokemon]);

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
