import { useOutletContext } from "react-router-dom";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { TypeBadge } from "../../components/TypeBadge";
import AudioPlayer from "../../components/AudioPlayer";
import "../../styles/DetailPageStyle.css";
import { useState, useEffect } from "react";
import { fetchAbilityDetails } from "../../utils/pokeApi";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

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
        {ab.isHidden && <span className="hiddenTag">(Hidden)</span>}
      </p>
      <p className="abilityEffect">{ab.effect}</p>
    </div>
  ));

  const types = pokemon.types?.map((type) => (
    <TypeBadge
      key={type.type.name}
      type={type.type.name}
      withIcon
      variant="detail"
    />
  ));

  const englishFlavorText =
    pokemonSpecies?.flavor_text_entries?.filter(
      (item) => item.language.name === "en"
    ) || [];

  const displayEnglishFavorText =
    englishFlavorText[0]?.flavor_text || "No description available.";

  const heightAndWeightConverter = (statToConvert) => {
    const convertedStat = statToConvert / 10;
    return convertedStat;
  };

  const genderRate = (genderRate) => {
    const femaleRate = (genderRate / 8) * 100;
    const maleRate = ((8 - genderRate) / 8) * 100;
    return (
      <p>
        Female <BsGenderFemale />: {femaleRate}% Male <BsGenderMale />:
        {maleRate}%
      </p>
    );
  };

  return (
    <>
      <div className="detailsTopSection">
        <div className="overviewPageTopInfoSection">
          <h2 className="pageTopInfoTitle">
            {firstLetterUpperCase(pokemon.name)}
            <div className="topInfoSectionTypeBadges">{types}</div>
          </h2>

          <div className="flavorTextDiv">{displayEnglishFavorText}</div>
          <div className="infoList">
            <ul>
              <li>
                <span className="listItemTopic">Pokedex number: </span>
                {pokemon?.order ?? "—"}
              </li>
              <li>
                <span className="listItemTopic">Introduced:</span>{" "}
                {pokemonSpecies?.generation?.name ?? "—"}
              </li>
              <li>
                <span className="listItemTopic">Height: </span>
                {pokemon?.height != null
                  ? `${heightAndWeightConverter(pokemon.height)} metres`
                  : "—"}
              </li>
              <li>
                <span className="listItemTopic">Weight: </span>

                {pokemon?.weight != null
                  ? `${heightAndWeightConverter(pokemon.weight)} kg`
                  : "—"}
              </li>
              <li>
                <span className="listItemTopic">Shape:</span>{" "}
                {pokemonSpecies?.shape?.name ?? "—"}
              </li>
              <li>
                <span className="listItemTopic">Color:</span>{" "}
                {pokemonSpecies?.color?.name ?? "—"}
              </li>
            </ul>
          </div>

          <div className="abilityInfoContainer">
            <h3>Abilities</h3>
            {renderedAbilities}
          </div>
        </div>
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
      </div>
      <div className="middleSection">
        <div className="middleSectionInfo">
          <ul>
            <li>
              Gender Distribution: {genderRate(pokemonSpecies.gender_rate)}
            </li>
          </ul>
        </div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};
