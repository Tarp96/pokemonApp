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
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const purchaseModal = usePurchaseModal();
  const { isOwned } = useOwnedPokemon();
  const pokemonList = usePokemonList();
  const filters = usePokemonFilters();
  const pagination = usePagination(filters.filteredFullList);
  const search = usePokemonSearch();

  useEffect(() => {
    setFilteredPokemon(pokemonList.pokemon);
  }, [pokemonList.pokemon]);

  const pageLoading = pokemonList.loading && !filters.activeFilter;

  const clearFilter = () => {
    filters.clearFilters();
    search.resetSearch();
    setFilteredPokemon(pokemonList.pokemon);
  };

  const handleSearch = async (customQuery) => {
    const result = await search.searchPokemon(customQuery);

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

  const dataToRender = filters.isFiltered
    ? pagination.currentData
    : filteredPokemon;

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
        priceTagOnClick={() => purchaseModal.openModal(pokemonItem)}
      />
    ));

  return (
    <div className="mainContainer">
      <SearchBar
        query={search.query}
        setQuery={search.setQuery}
        onClick={handleSearch}
        clearFilter={clearFilter}
        isFiltered={filters.isFiltered}
        list={search.searchHistory}
        showSearches={search.showSearches}
        setShowSearches={search.setShowSearches}
        secondOnClick={filters.getRandomPokemon}
      />

      <FilterByTypeButtons
        filterByTypeFunc={filters.filterByType}
        activeFilter={filters.activeFilter}
      />

      <Pagination
        currentPage={
          filters.isFiltered ? pagination.currentPage : pokemonList.currentPage
        }
        totalPages={
          filters.isFiltered ? pagination.totalPages : pokemonList.totalPages
        }
        onPageChange={
          filters.isFiltered ? pagination.goToPage : pokemonList.goToPage
        }
      />

      {pageLoading || filters.typeLoading ? (
        <PokemonGrid>{renderSkeletonCards(20)}</PokemonGrid>
      ) : filters.randomLoading ? (
        <PokemonGrid>{renderSkeletonCards(4)}</PokemonGrid>
      ) : dataToRender.length > 0 ? (
        <PokemonGrid>{renderPokemonCards()}</PokemonGrid>
      ) : (
        <NoPokemonMatchFilter
          onClick={clearFilter}
          type={filters.activeFilter ? "type" : search.query ? "search" : null}
        />
      )}

      {purchaseModal.isOpen && purchaseModal.selectedPokemon && (
        <PaymentModal
          pokemon={purchaseModal.selectedPokemon}
          closeModalOnClick={purchaseModal.closeModal}
        />
      )}
    </div>
  );
};
