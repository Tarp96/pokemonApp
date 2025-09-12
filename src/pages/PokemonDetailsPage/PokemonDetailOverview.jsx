import { useOutletContext } from "react-router-dom";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { TypeBadge } from "../../components/TypeBadge";
import AudioPlayer from "../../components/AudioPlayer";
import "../../styles/DetailPageStyle.css";
import { useState, useEffect } from "react";
import { fetchAbilityDetails } from "../../utils/pokeApi";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import TypeRelations from "../../components/TypeRelations";
import { SwitchButton } from "../../components/SwitchButton";
import { InformationList } from "../../components/InformationList";

export const PokemonDetailOverView = () => {
  const [abilityDetails, setAbilityDetails] = useState([]);
  const [shiny, setShiny] = useState(false);
  const [showOffense, setShowOffense] = useState(true);

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
    if (genderRate === -1) {
      return <>Genderless</>;
    }

    const femaleRate = (genderRate / 8) * 100;
    const maleRate = ((8 - genderRate) / 8) * 100;
    return (
      <>
        {<BsGenderFemale />} {femaleRate}% {<BsGenderMale />}
        {maleRate}%
      </>
    );
  };

  const displayEggGroups =
    pokemonSpecies?.egg_groups?.map((e) => <>{e.name}</>) || [];

  const eggStepCounter = (hatchCounter) => {
    const steps = 256 * (hatchCounter + 1);
    return steps;
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
          <InformationList
            labelOne="Pokedex number"
            labelTwo="Introduced"
            labelThree="Height"
            labelFour="Weight"
            labelFive="Shape"
            labelSix="Color"
            listItemOne={pokemon?.order ?? "—"}
            listItemTwo={pokemonSpecies?.generation?.name ?? "—"}
            listItemThree={
              pokemon?.height != null
                ? `${heightAndWeightConverter(pokemon.height)} metres`
                : "—"
            }
            listItemFour={
              pokemon?.weight != null
                ? `${heightAndWeightConverter(pokemon.weight)} kg`
                : "—"
            }
            listItemFive={pokemonSpecies?.shape?.name ?? "—"}
            listItemSix={pokemonSpecies?.color?.name ?? "—"}
          />

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
            <SwitchButton
              condition={shiny}
              onClick={() => setShiny((prev) => !prev)}
              firstText="Normal"
              secondText="Shiny"
              className="imageSwitchButton"
            />
          </div>
        </div>
      </div>
      <div className="overViewMiddleSection">
        <div className="middleSectionInfo">
          <h3 className="middleSectionTitleUnderline">Breeding</h3>
          <ul className="infoList">
            <li>
              <span className="listItemTopic">Gender Distribution:</span>{" "}
              {genderRate(pokemonSpecies.gender_rate)}
            </li>
            <li>
              <span className="listItemTopic">Growth Rate:</span>
              {pokemonSpecies.growth_rate?.name}
            </li>
            <li>
              <span className="listItemTopic">Egg Cycles:</span>{" "}
              {pokemonSpecies.hatch_counter} cycles (
              {eggStepCounter(pokemonSpecies.hatch_counter)} steps)
            </li>
            <li>
              <span className="listItemTopic">Egg Groups:</span>
              {displayEggGroups}
            </li>
            <li>
              <span className="listItemTopic">
                Habitat:{pokemonSpecies.habitat?.name}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="middleSectionTitleUnderline">Training</h3>
          <ul className="infoList">
            <li>
              <span className="listItemTopic">Catch Rate:</span>
              {pokemonSpecies?.capture_rate}
            </li>
            <li>
              <span className="listItemTopic">Base Happiness:</span>
              {pokemonSpecies?.base_happiness}
            </li>
            <li>
              <span className="listItemTopic">Base XP:</span>
              {pokemon?.base_experience}
            </li>
            <li>
              <span className="listItemTopic">Held Items</span>
            </li>
          </ul>
        </div>
        <div>
          <div className="relationsTitleContainer">
            <h3>Relations</h3>
            <div className="relationsSwitchGroup">
              <SwitchButton
                condition={showOffense}
                onClick={() => setShowOffense((prev) => !prev)}
                firstText="Offense"
                secondText="Defense"
                className="relationsTabButton"
              />
            </div>
          </div>
          {showOffense ? (
            <TypeRelations pokemon={pokemon} view="defense" />
          ) : (
            <TypeRelations pokemon={pokemon} />
          )}
        </div>
      </div>
    </>
  );
};
