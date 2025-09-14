import { useOutletContext } from "react-router-dom";
import {
  firstLetterUpperCase,
  formatHeight,
  formatWeight,
  formatEggCycles,
  pickEnglishFlavorText,
} from "../../utils/helperFunctions";
import { TypeBadge } from "../../components/TypeBadge";
import AudioPlayer from "../../components/AudioPlayer";
import "../../styles/DetailPageStyle.css";
import { useState, useEffect, useMemo } from "react";
import { fetchAbilityDetails } from "../../utils/pokeApi";
import TypeRelations from "../../components/TypeRelations";
import { SwitchButton } from "../../components/SwitchButton";
import { InformationList } from "../../components/InformationList";
import { GenderRate } from "../../components/GenderRate";
import { AbilitiesList } from "../../components/AbilitiesList";
import { BsVolumeUp } from "react-icons/bs";

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

  const types = pokemon.types?.map((type) => (
    <TypeBadge
      key={type.type.name}
      type={type.type.name}
      withIcon
      variant="detail"
    />
  ));

  const flavorText = useMemo(
    () => pickEnglishFlavorText(pokemonSpecies?.flavor_text_entries),
    [pokemonSpecies?.flavor_text_entries]
  );

  const eggGroupsText =
    (pokemonSpecies?.egg_groups ?? [])
      .map((g) => g?.name)
      .filter(Boolean)
      .join(", ") || "—";

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

          <div className="flavorTextDiv">{flavorText}</div>
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
                value: formatHeight(pokemon?.height),
              },
              {
                label: "Weight",
                value: formatWeight(pokemon?.weight),
              },
              { label: "Shape", value: pokemonSpecies?.shape?.name ?? "—" },
              { label: "Color", value: pokemonSpecies?.color?.name ?? "—" },
            ]}
          />

          <div className="abilityInfoContainer">
            <h3>Abilities</h3>
            <AbilitiesList abilities={abilityDetails} />
          </div>
        </div>
        <div className="overviewPageMainImageContainer">
          <div className="audioButtonContainer ">
            <AudioPlayer
              src={pokemon?.cries?.legacy}
              className="audioButtonExpanded"
            >
              <BsVolumeUp aria-hidden="true" /> Legacy Cry
            </AudioPlayer>
            <AudioPlayer
              src={pokemon?.cries?.latest}
              className="audioButtonExpanded"
            >
              <BsVolumeUp aria-hidden="true" /> Latest Cry
            </AudioPlayer>
          </div>
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
                value: <GenderRate rate={pokemonSpecies?.gender_rate} />,
              },
              ,
              {
                label: "Growth rate",
                value: pokemonSpecies?.growth_rate?.name ?? "—",
              },
              {
                label: "Egg Cycles",
                value: formatEggCycles(pokemonSpecies?.hatch_counter),
              },
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
      <div className="overviewBottomSection"></div>
    </>
  );
};
