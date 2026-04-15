import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PokemonDisplayCard from "../../components/pokemon/PokemonDisplayCard";
import { FilterByTypeButtons } from "../../components/pokemon/FilterByTypeButtons";
import { SearchBar } from "../../components/ui/SearchBar";
import { NoPokemonMatchFilter } from "../../components/pokemon/NoPokemonMatchFilter";
import { PokemonGrid } from "../../components/pokemon/PokemonGrid";
import Pagination from "../../components/ui/Pagination";
import { PaymentModal } from "../../components/modals/PaymentModal";
import PokemonDisplayCardSkeleton from "../../components/SkeletonLoading/PokemonDisplayCardSkeleton";
import { usePurchaseModal } from "../../hooks/usePurchaseModal";
import { useOwnedPokemon } from "../../hooks/pokemon/useOwnedPokemon";
import { usePagination } from "../../hooks/usePagination";
import { usePokemonSearch } from "../../hooks/pokemon/usePokemonSearch";
import { usePokemonFilters } from "../../hooks/pokemon/usePokemonFilters";
import { usePokemonList } from "../../hooks/pokemon/usePokemonList";

export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, selectedPokemon, openModal, closeModal } = usePurchaseModal();

  const { isOwned } = useOwnedPokemon();

  const { pokemon, loading, currentPage, totalPages, goToPage } =
    usePokemonList();

  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    setFilteredPokemon(pokemon);
  }, [pokemon]);

  const {
    activeFilter,
    isFiltered,
    typeLoading,
    randomLoading,
    filteredFullList,
    filterByType,
    getRandomPokemon,
    clearFilters,
  } = usePokemonFilters();

  const {
    currentPage: filteredPage,
    totalPages: filteredTotalPages,
    currentData: paginatedFilteredPokemon,
    goToPage: goToFilteredPage,
  } = usePagination(filteredFullList);

  const {
    query,
    setQuery,
    searchHistory,
    showSearches,
    setShowSearches,
    searchPokemon,
    resetSearch,
  } = usePokemonSearch();

  const pageLoading = loading && !activeFilter;

  const clearFilter = () => {
    clearFilters();
    resetSearch();
    setFilteredPokemon(pokemon);
  };

  const handleSearch = async (customQuery) => {
    const result = await searchPokemon(customQuery);

    if (result) {
      setFilteredPokemon([result]);
    } else {
      setFilteredPokemon([]);
    }
  };

  const renderSkeletonCards = (count = 20) =>
    Array.from({ length: count }, (_, i) => (
      <PokemonDisplayCardSkeleton key={i} />
    ));

  const dataToRender = isFiltered ? paginatedFilteredPokemon : filteredPokemon;

  const renderPokemonCards = () =>
    dataToRender.map((pokemonItem) => (
      <PokemonDisplayCard
        key={pokemonItem.id}
        name={pokemonItem.name}
        generation={pokemonItem.generation}
        sprite={pokemonItem.sprites.front_default}
        types={pokemonItem.types}
        height={pokemonItem.height}
        weight={pokemonItem.weight}
        cries={pokemonItem.cries}
        pokemon={pokemonItem}
        isOwned={isOwned(pokemonItem.id)}
        onClick={() =>
          navigate(`/pokemon/${pokemonItem.name}`, {
            state: { from: location },
          })
        }
        priceTagOnClick={() => openModal(pokemonItem)}
      />
    ));

  return (
    <div className="mainContainer">
      <SearchBar
        query={query}
        setQuery={setQuery}
        onClick={handleSearch}
        clearFilter={clearFilter}
        isFiltered={isFiltered}
        list={searchHistory}
        showSearches={showSearches}
        setShowSearches={setShowSearches}
        secondOnClick={getRandomPokemon}
      />

      <FilterByTypeButtons
        filterByTypeFunc={filterByType}
        activeFilter={activeFilter}
        isFiltered={isFiltered}
      />

      <Pagination
        currentPage={isFiltered ? filteredPage : currentPage}
        totalPages={isFiltered ? filteredTotalPages : totalPages}
        onPageChange={isFiltered ? goToFilteredPage : goToPage}
      />

      {pageLoading || typeLoading ? (
        <PokemonGrid>{renderSkeletonCards(20)}</PokemonGrid>
      ) : randomLoading ? (
        <PokemonGrid>{renderSkeletonCards(4)}</PokemonGrid>
      ) : dataToRender.length > 0 ? (
        <PokemonGrid>{renderPokemonCards()}</PokemonGrid>
      ) : (
        <NoPokemonMatchFilter
          onClick={clearFilter}
          type={activeFilter ? "type" : query ? "search" : null}
        />
      )}

      {isOpen && selectedPokemon && (
        <PaymentModal
          pokemon={selectedPokemon}
          closeModalOnClick={closeModal}
        />
      )}
    </div>
  );
};
