import { useEffect, useState } from "react";
import PokemonDisplayCard from "../../components/PokemonDisplayCard";
import { fetchData, fetchTypeData, safeFetchBatch } from "../../utils/pokeApi";
import { FilterByTypeButtons } from "../../components/FilterByTypeButtons";
import { SearchBar } from "../../components/SearchBar";
import { NoPokemonMatchFilter } from "../../components/NoPokemonMatchFilter";
import { PokemonGrid } from "../../components/PokemonGrid";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { getItem, setItem } from "../../utils/localStorage";
import { setCachedPageFull } from "../../utils/cache";
import { PaymentModal } from "../../components/PaymentModal";
import PokemonDisplayCardSkeleton from "../../components/SkeletonLoading/PokemonDisplayCardSkeleton";
import { usePurchaseModal } from "./../../hooks/usePurchaseModal";
import { useOwnedPokemon } from "../../hooks/useOwnedPokemon";
import { usePagination } from "./../../hooks/usePagination";

export const HomePage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(pokemon);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchHistory, setSearchHistory] = useState(() => {
    const item = getItem("searchHistory");
    return item || [];
  });
  const [showSearches, setShowSearches] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
  const [filteredFullList, setFilteredFullList] = useState([]);

  const pageLoading = loading && !activeFilter;

  const [randomLoading, setRandomLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, selectedPokemon, openModal, closeModal } = usePurchaseModal();
  const { isOwned } = useOwnedPokemon();
  const {
    currentPage: filteredPage,
    totalPages: filteredTotalPages,
    currentData: paginatedFilteredPokemon,
    goToPage: goToFilteredPage,
    resetPage: resetFilteredPage,
  } = usePagination(filteredFullList, 20);

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
    setFilteredPokemon(pokemon);
    setActiveFilter(null);
    setIsFiltered(false);
    setQuery("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadPokemonData(page);
  };

  const filterByType = async (key) => {
    if (isFiltered && activeFilter === key) {
      setIsFiltered(false);
      setActiveFilter(null);
      resetFilteredPage();
      return;
    }

    try {
      setTypeLoading(true);

      const result = await fetchTypeData(key);

      const pokemonNames = (result?.pokemon || [])
        .map((p) => p?.pokemon?.name)
        .filter(Boolean);

      const allPokemonDetails = await safeFetchBatch(pokemonNames);

      setFilteredFullList(allPokemonDetails);

      resetFilteredPage();
      setCurrentPage(1);
      setActiveFilter(key);
      setIsFiltered(true);
    } catch (error) {
      console.error("Error fetching type data:", error);
    } finally {
      setTypeLoading(false);
    }
  };

  const renderSkeletonCards = (count = 20) =>
    Array.from({ length: count }, (_, i) => (
      <PokemonDisplayCardSkeleton key={i} />
    ));

  const removeFilter = () => {
    setActiveFilter(null);
    setFilteredPokemon(pokemon);
    setQuery("");
    setIsFiltered(false);
  };

  const renderQueryPokemonCard = async (customQuery) => {
    const searchTerm = String(customQuery ?? query).trim();
    if (!searchTerm) {
      alert("Please enter a Pokémon name before searching.");
      return;
    }

    try {
      const [details] = await safeFetchBatch([searchTerm.toLowerCase()]);
      if (details) {
        setFilteredPokemon([details]);
        setIsFiltered(true);

        const updatedHistory = Array.from(
          new Set([searchTerm, ...searchHistory]),
        ).slice(0, 10);
        setSearchHistory(updatedHistory);
        setItem("searchHistory", updatedHistory);
        setQuery(searchTerm);
      } else {
        setFilteredPokemon([]);
      }
    } catch (error) {
      console.log("Pokemon not found");
      setFilteredPokemon([]);
    }
  };

  const getRandomPokemon = async () => {
    setRandomLoading(true);

    try {
      const ids = Array.from(
        { length: 4 },
        () => Math.floor(Math.random() * 1025) + 1,
      );

      const results = await Promise.all(
        ids.map((id) => safeFetchBatch([String(id)])),
      );

      const pokemon = results.map(([details]) => details).filter(Boolean);

      setFilteredFullList(pokemon);

      resetFilteredPage();

      setIsFiltered(true);
      setActiveFilter("random");
    } catch (error) {
      console.log("Something went wrong");
      setFilteredFullList([]);
    }

    setRandomLoading(false);
  };

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
        onClick={renderQueryPokemonCard}
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
          onClick={removeFilter}
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
