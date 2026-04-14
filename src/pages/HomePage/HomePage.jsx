import { useEffect, useState } from "react";
import PokemonDisplayCard from "../../components/pokemon/PokemonDisplayCard";
import {
  fetchData,
  safeFetchBatch,
} from "../../services/pokemon/pokeApiService";
import { FilterByTypeButtons } from "../../components/pokemon/FilterByTypeButtons";
import { SearchBar } from "../../components/ui/SearchBar";
import { NoPokemonMatchFilter } from "../../components/pokemon/NoPokemonMatchFilter";
import { PokemonGrid } from "../../components/pokemon/PokemonGrid";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../components/ui/Pagination";
import { setCachedPageFull } from "../../utils/storage/cache";
import { PaymentModal } from "../../components/modals/PaymentModal";
import PokemonDisplayCardSkeleton from "../../components/SkeletonLoading/PokemonDisplayCardSkeleton";
import { usePurchaseModal } from "./../../hooks/usePurchaseModal";
import { useOwnedPokemon } from "../../hooks/pokemon/useOwnedPokemon";
import { usePagination } from "./../../hooks/usePagination";
import { usePokemonSearch } from "../../hooks/pokemon/usePokemonSearch";
import { usePokemonFilters } from "../../hooks/pokemon/usePokemonFilters";

export const HomePage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(pokemon);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, selectedPokemon, openModal, closeModal } = usePurchaseModal();
  const { isOwned } = useOwnedPokemon();

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
    resetPage: resetFilteredPage,
  } = usePagination(filteredFullList);

  const {
    query,
    setQuery,
    searchHistory,
    showSearches,
    setShowSearches,
    searchPokemon,
    searchLoading,
    searchError,
    resetSearch,
  } = usePokemonSearch();

  const pageLoading = loading && !activeFilter;

  useEffect(() => {
    loadPokemonData(currentPage);
  }, [currentPage]);

  const loadPokemonData = async (currentPage) => {
    try {
      setLoading(true);

      const result = await fetchData(currentPage, 20);
      const pokemonNames = result.results.map((p) => p.name);

      const allPokemonDetails = await safeFetchBatch(pokemonNames);

      const pages = Math.ceil((result.count ?? 0) / 20);

      setPokemon(allPokemonDetails);
      setFilteredPokemon(allPokemonDetails);
      setTotalPages(pages);

      const lightweightList = allPokemonDetails.map((p) => ({
        id: p.id,
        name: p.name,
        sprite:
          p.sprites?.other?.["official-artwork"]?.front_default ??
          p.sprites?.front_default,
        types: p.types,
        cries: p.cries?.legacy ?? null,
      }));

      setCachedPageFull(currentPage, {
        list: lightweightList,
        totalPages: pages,
      });
    } catch (error) {
      console.error("Error loading Pokemon data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadPokemonData(page);
  };

  const renderSkeletonCards = (count = 20) =>
    Array.from({ length: count }, (_, i) => (
      <PokemonDisplayCardSkeleton key={i} />
    ));

  const renderPokemonCards = () => {
    const dataToRender = isFiltered
      ? paginatedFilteredPokemon
      : filteredPokemon;

    return dataToRender.map((pokemonItem, index) => (
      <PokemonDisplayCard
        key={index}
        name={pokemonItem.name}
        generation={pokemonItem.generation}
        sprite={pokemonItem.sprites.front_default}
        types={pokemonItem.types}
        height={pokemonItem.height}
        weight={pokemonItem.weight}
        cries={pokemonItem.cries}
        onClick={() =>
          navigate(`/pokemon/${pokemonItem.name}`, {
            state: { from: location },
          })
        }
        pokemon={pokemonItem}
        priceTagOnClick={() => openModal(pokemonItem)}
        isOwned={isOwned(pokemonItem.id)}
      />
    ));
  };

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
        onPageChange={isFiltered ? goToFilteredPage : handlePageChange}
      />

      {pageLoading || typeLoading ? (
        <PokemonGrid>{renderSkeletonCards(20)}</PokemonGrid>
      ) : randomLoading ? (
        <PokemonGrid>{renderSkeletonCards(4)}</PokemonGrid>
      ) : filteredPokemon.length > 0 ? (
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
