import { useOutletContext } from "react-router-dom";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { TypeBadge } from "../../components/TypeBadge";
import AudioPlayer from "../../components/AudioPlayer";
import "../../styles/DetailPageStyle.css";
import { useState, useEffect } from "react";
import { fetchAbilityDetails } from "../../utils/pokeApi";

export const PokemonDetailOverView = () => {
  const [abilityDetails, setAbilityDetails] = useState([]);
  const [shiny, setShiny] = useState(false);

  const { pokemon, pokemonSpecies } = useOutletContext();

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

  const sprite = shiny
    ? pokemon.sprites?.other["official-artwork"]?.front_shiny
    : pokemon.sprites?.other["official-artwork"]?.front_default;

  const renderedAbilities = abilityDetails.map((ab) => (
    <div key={ab.name} className="abilityCard">
      <p className="abilityName">
        {firstLetterUpperCase(ab.name)}{" "}
        {ab.isHidden && <span className="hiddenTag">Hidden</span>}
      </p>
      <p className="abilityEffect">{ab.effect}</p>
    </div>
  ));

  const types = pokemon.types?.map((type) => (
    <TypeBadge key={type.type.name} type={type.type.name} />
  ));

  const englishFlavorText =
    pokemonSpecies?.flavor_text_entries?.filter(
      (item) => item.language.name === "en"
    ) || [];

  const displayEnglishFavorText =
    englishFlavorText[0]?.flavor_text || "No description available.";

  return (
    <>
      <div className="detailsTopSection">
        <div className="overviewPageMainImageContainer">
          {sprite && (
            <img
              src={sprite}
              alt={shiny ? "Shiny artwork" : "Official artwork"}
              className="mainDetailImage"
            />
          )}

          <div className="overViewPageImageSwitchButtonContainer">
            <button
              className={`tabButton ${!shiny ? "active" : ""}`}
              onClick={() => setShiny(false)}
            >
              Normal
            </button>
            <button
              className={`tabButton ${shiny ? "active" : ""}`}
              onClick={() => setShiny(true)}
            >
              Shiny
            </button>
          </div>
        </div>
        <div className="overviewPageTopInfoSection">
          <h2>{firstLetterUpperCase(pokemon.name)}</h2>
          {displayEnglishFavorText}
        </div>
      </div>
    </>
  );
};
