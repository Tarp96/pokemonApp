import { useOutletContext } from "react-router-dom";
import {
  firstLetterUpperCase,
  heightAndWeightConverter,
} from "../../utils/helperFunctions";
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
  const [showDefense, setShowDefense] = useState(true);

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
  const eggGroupsText =
    (pokemonSpecies?.egg_groups ?? [])
      .map((g) => g?.name)
      .filter(Boolean)
      .join(", ") || "—";

  const eggStepCounter = (hatchCounter) => {
    return 256 * (hatchCounter + 1);
  };

  const eggCyclesText =
    pokemonSpecies?.hatch_counter != null
      ? `${pokemonSpecies.hatch_counter} cycles (${eggStepCounter(
          pokemonSpecies.hatch_counter
        )} steps)`
      : "—";

  const heldItemsText =
    (pokemon?.held_items ?? [])
      .map((h) => h?.item?.name)
      .filter(Boolean)
      .join(", ") || "—";

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
            className="two-columns"
            items={[
              { label: "Pokedex number", value: pokemon?.order ?? "—" },
              {
                label: "Introduced",
                value: pokemonSpecies?.generation?.name ?? "—",
              },
              {
                label: "Height",
                value:
                  pokemon?.height != null
                    ? `${heightAndWeightConverter(pokemon.height)} metres`
                    : "—",
              },
              {
                label: "Weight",
                value:
                  pokemon?.weight != null
                    ? `${heightAndWeightConverter(pokemon.weight)} kg`
                    : "—",
              },
              { label: "Shape", value: pokemonSpecies?.shape?.name ?? "—" },
              { label: "Color", value: pokemonSpecies?.color?.name ?? "—" },
            ]}
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
          <InformationList
            className="single-column"
            items={[
              {
                label: "Gender",
                value: genderRate(pokemonSpecies?.gender_rate),
              },
              ,
              {
                label: "Growth rate",
                value: pokemonSpecies?.growth_rate?.name ?? "—",
              },
              { label: "Egg Cycles", value: eggCyclesText },
              { label: "Egg Groups", value: eggGroupsText },
              { label: "Habitat", value: pokemonSpecies?.habitat?.name ?? "—" },
            ]}
          />
        </div>
        <div>
          <h3 className="middleSectionTitleUnderline">Training</h3>
          <InformationList
            className="single-column"
            items={[
              {
                label: "Catch Rate",
                value: pokemonSpecies?.capture_rate ?? "—",
              },
              {
                label: "Base Happiness",
                value: pokemonSpecies?.base_happiness ?? "—",
              },
              { label: "Base XP", value: pokemon?.base_experience ?? "—" },
              { label: "Held Items", value: heldItemsText },
            ]}
          />
        </div>
        <div>
          <div className="relationsTitleContainer">
            <h3>Relations</h3>
            <div className="relationsSwitchGroup">
              <SwitchButton
                condition={showDefense}
                onClick={() => setShowDefense((prev) => !prev)}
                firstText="Offense"
                secondText="Defense"
                className="relationsTabButton"
              />
            </div>
          </div>
          {showDefense ? (
            <TypeRelations pokemon={pokemon} view="defense" />
          ) : (
            <TypeRelations pokemon={pokemon} />
          )}
        </div>
      </div>
    </>
  );
};
