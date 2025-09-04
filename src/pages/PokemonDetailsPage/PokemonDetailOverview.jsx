import { useOutletContext } from "react-router-dom";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { TypeBadge } from "../../components/TypeBadge";
import AudioPlayer from "../../components/AudioPlayer";
import "../../styles/DetailPageStyle.css";
import { useState, useEffect } from "react";
import { fetchAbilityDetails } from "../../utils/pokeApi";

export const PokemonDetailOverView = () => {
  const [abilityDetails, setAbilityDetails] = useState([]);

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

  const abilities = pokemon.abilities?.map((a) => (
    <p key={a.ability.name}>{firstLetterUpperCase(a.ability.name)}</p>
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
        <div className="mainImageOuterContainer">
          <div
            className={`mainImageContainer typeGradientBorder ${pokemon.types?.[0]?.type.name}`}
          >
            {pokemon.sprites?.other["official-artwork"]?.front_default && (
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt="Official artwork"
                className="mainDetailImage"
              />
            )}
          </div>
        </div>

        <div className="flavorTextContainer">
          <p className="flavorText">{displayEnglishFavorText}</p>

          <div className="abilitiesAndTypesContainer">
            <div className="infoSection">
              <h2 className="sectionTitle">Abilities</h2>
              <div className="infoText">{abilities}</div>
            </div>
            <div className="infoSection">
              <h2 className="sectionTitle">Types</h2>
              <div className="typeList">{types}</div>
            </div>
          </div>

          <div className="infoSection">
            <h2 className="sectionTitle">Cries</h2>
            <div className="criesButtons">
              {pokemon.cries?.legacy && (
                <AudioPlayer src={pokemon.cries.legacy}>
                  <span className="audioButtonExpanded"> Legacy 🔊</span>
                </AudioPlayer>
              )}
              {pokemon.cries?.latest && (
                <AudioPlayer src={pokemon.cries.latest}>
                  <span className="audioButtonExpanded"> Latest 🔊 </span>
                </AudioPlayer>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
