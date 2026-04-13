import { useOutletContext } from "react-router-dom";
import {
  firstLetterUpperCase,
  formatHeight,
  formatWeight,
  formatEggCycles,
  pickEnglishFlavorText,
} from "../../utils/helperFunctions";
import { TypeBadge } from "../../components/TypeBadge";
import AudioPlayer from "../../components/ui/AudioPlayer";
import "../../styles/DetailPageStyle.css";
import { useState, useEffect, useMemo } from "react";
import { fetchAbilityDetails } from "../../utils/pokeApi";
import TypeRelations from "../../components/detailPage/TypeRelations";
import { SwitchButton } from "../../components/ui/SwitchButton";
import { InformationList } from "../../components/detailPage/InformationList";
import { GenderRate } from "../../components/detailPage/GenderRate";
import { AbilitiesList } from "../../components/detailPage/AbilitiesList";
import { BsVolumeUp } from "react-icons/bs";
import { EvolutionSection } from "../../components/detailPage/EvolutionSection";
import { AlternativeFormsSection } from "../../components/detailPage/AlternativeFormsSection";
import { PriceTag } from "../../components/PriceTag";
import { usePurchaseModal } from "./../../hooks/usePurchaseModal";
import { PaymentModal } from "../../components/modals/PaymentModal";
import { useOwnedPokemon } from "../../hooks/useOwnedPokemon";
import { useAbilityDetails } from "../../hooks/useAbilityDetails";

export const PokemonDetailOverView = () => {
  const [shiny, setShiny] = useState(false);
  const [showDefense, setShowDefense] = useState(true);

  const { pokemon, pokemonSpecies } = useOutletContext();

  const { isOpen, selectedPokemon, openModal, closeModal } = usePurchaseModal();
  const { isOwned } = useOwnedPokemon();
  const { abilityDetails, loading, error } = useAbilityDetails(
    pokemon.abilities,
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadAbilityDetails = async () => {
      if (!pokemon.abilities) return;

      try {
        const fetchedDetails = await Promise.all(
          pokemon.abilities.map(async (a) => {
            const detail = await fetchAbilityDetails(a.ability.name);
            const englishEntry = detail.effect_entries.find(
              (entry) => entry.language.name === "en",
            );

            return {
              name: a.ability.name,
              isHidden: a.is_hidden,
              effect: englishEntry?.short_effect || "No description available.",
            };
          }),
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
    [pokemonSpecies?.flavor_text_entries],
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
      <section className="detailsTopSection">
        <div className="overviewPageTopInfoSection">
          <div className="detailPageNameTitleContainer">
            <h2 className="pageTopInfoTitle">
              {firstLetterUpperCase(pokemon.name)}
            </h2>
            <div></div>
            <PriceTag
              pokemonName={pokemon.name}
              displayedOnCard={false}
              onClick={() => openModal(pokemon)}
              isOwned={isOwned(pokemon.id)}
            />
          </div>
          <div className="topInfoSectionTypeBadges" aria-label="Pokemon types">
            {types}
          </div>

          <p className="flavorTextDiv">{flavorText}</p>
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
          <div className="audioButtonContainer">
            {pokemon?.cries?.legacy && (
              <AudioPlayer
                src={pokemon.cries.legacy}
                className="audioButtonExpanded"
                aria-label={`Play ${pokemon.name} legacy cry`}
              >
                <BsVolumeUp aria-hidden="true" /> Legacy Cry
              </AudioPlayer>
            )}

            {pokemon?.cries?.latest && (
              <AudioPlayer
                src={pokemon.cries.latest}
                className="audioButtonExpanded"
                aria-label={`Play ${pokemon.name} latest cry`}
              >
                <BsVolumeUp aria-hidden="true" /> Latest Cry
              </AudioPlayer>
            )}
          </div>
          {sprite && (
            <img
              src={sprite}
              alt={`${firstLetterUpperCase(pokemon.name)} ${
                shiny ? "shiny" : "official"
              } artwork`}
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
      </section>
      <section className="overViewMiddleSection">
        <div className="middleSectionInfo">
          <h3 className="middleSectionTitleUnderline">Breeding</h3>
          <InformationList
            className="single-column"
            items={[
              {
                label: "Gender",
                value: <GenderRate rate={pokemonSpecies?.gender_rate} />,
              },

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
      </section>
      <section
        className="overViewEvolutionSection"
        aria-labelledby="evolution-heading"
      >
        <h3 className="evoTitle">Evolution Chain</h3>
        <EvolutionSection pokemon={pokemonSpecies} />
      </section>
      <section
        className="overViewAlternativeFormSection"
        aria-labelledby="alternative-form-heading"
      >
        <h3>Alternative Forms</h3>
        <AlternativeFormsSection species={pokemonSpecies} />
      </section>

      {isOpen && selectedPokemon && (
        <PaymentModal
          pokemon={selectedPokemon}
          closeModalOnClick={closeModal}
        />
      )}
    </>
  );
};
