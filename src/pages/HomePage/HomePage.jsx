import { useEffect, useState } from "react";
import PokemonDisplayCard from "../../components/PokemonDisplayCard";
import {
  fetchData,
  fetchPokemonDetails,
  fetchTypeData,
  safeFetchBatch,
} from "../../utils/pokeApi";
import { FilterByTypeButtons } from "../../components/FilterByTypeButtons";
import { SearchBar } from "../../components/SearchBar";
import { NoPokemonMatchFilter } from "../../components/NoPokemonMatchFilter";
import { PokemonGrid } from "../../components/PokemonGrid";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { getItem, setItem } from "../../utils/localStorage";
import { setCachedPageFull } from "../../utils/cache";
import CenterSpinner from "../../components/CenterSpinner";
import { PaymentModal } from "../../components/PaymentModal";

export const HomePage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(pokemon);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchHistory, setSearchHistory] = useState(() => {
    const item = getItem("searchHistory");
    return item || [];
  });
  const [showSearches, setShowSearches] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
  const pageLoading = loading && !activeFilter;
  const [priceTagClicked, setPriceTagClicked] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadPokemonData(pageNumber);
  }, [pageNumber]);

  const loadPokemonData = async (pageNumber) => {
    try {
      setLoading(true);

      const result = await fetchData(pageNumber, 20);
      const pokemonNames = result.results.map((p) => p.name);

      const allPokemonDetails = await safeFetchBatch(pokemonNames);

      const pages = Math.ceil((result.count ?? 0) / 20);
      setPokemon(allPokemonDetails);
      setFilteredPokemon(allPokemonDetails);
      setTotalPages(pages);

      setCachedPageFull(pageNumber, {
        list: allPokemonDetails,
        totalPages: pages,
      });
    } catch (error) {
      console.error("Error loading Pokemon data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterByType = async (key) => {
    if (isFiltered && activeFilter === key) {
      setFilteredPokemon(pokemon);
      setActiveFilter(null);
      setIsFiltered(false);
      return;
    }

    try {
      setTypeLoading(true);
      const result = await fetchTypeData(key);
      const pokemonNames = (result?.pokemon || [])
        .map((p) => p?.pokemon?.name)
        .filter(Boolean);

      const allPokemonDetails = await safeFetchBatch(pokemonNames);
      setFilteredPokemon(allPokemonDetails);

      setActiveFilter(key);
      setIsFiltered(true);
    } catch (error) {
      console.error("Error fetching type data:", error);
      setFilteredPokemon([]);
    } finally {
      setTypeLoading(false);
    }
  };

  const removeFilter = () => {
    setActiveFilter((prev) => (prev = null));
    setFilteredPokemon(pokemon);
    setQuery("");
  };
  const renderQueryPokemonCard = async (customQuery) => {
    const searchTerm = String(customQuery ?? query).trim();
    if (!searchTerm) {
      alert("Please enter a Pokémon name before searching.");
      return;
    }

    try {
      // Use the same enrichment pipeline
      const [details] = await safeFetchBatch([searchTerm.toLowerCase()]);
      if (details) {
        setFilteredPokemon([details]);

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
    const id = Math.floor(Math.random() * 1025) + 1;

    try {
      const [details] = await safeFetchBatch([String(id)]);
      if (details) {
        setFilteredPokemon([details]);
      } else {
        setFilteredPokemon([]);
      }
    } catch (error) {
      console.log("Something went wrong");
      setFilteredPokemon([]);
    }
  };

  const renderPokemonCards = () => {
    return filteredPokemon.map((pokemonItem, index) => (
      <PokemonDisplayCard
        key={index}
        name={pokemonItem.name}
        generation={pokemonItem.generation}
        sprite={pokemonItem.sprites.front_default}
        types={pokemonItem.types}
        height={pokemonItem.height}
        weight={pokemonItem.weight}
        cries={pokemonItem.cries}
        onClick={() => navigate(`/pokemon/${pokemonItem.name}`)}
        pokemon={pokemonItem}
        priceTagOnClick={() => flipPriceTagClicked(pokemonItem)}
      />
    ));
  };

  const flipPriceTagClicked = (pokemonItem) => {
    setSelectedPokemon(pokemonItem);
    setPriceTagClicked(true);
  };

  const closeModal = () => {
    setPriceTagClicked(false);
  };

  return (
    <div className="mainContainer">
      <SearchBar
        query={query}
        setQuery={setQuery}
        onClick={renderQueryPokemonCard}
        list={searchHistory}
        showSearches={showSearches}
        setShowSearches={setShowSearches}
        secondOnClick={getRandomPokemon}
      />

      <FilterByTypeButtons
        filterByTypeFunc={filterByType}
        activeFilter={activeFilter}
      />

      {!activeFilter && (
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={(newPage) => setPageNumber(newPage)}
        />
      )}

      {pageLoading || typeLoading ? (
        <CenterSpinner />
      ) : filteredPokemon.length > 0 ? (
        <PokemonGrid>{renderPokemonCards()}</PokemonGrid>
      ) : (
        <NoPokemonMatchFilter
          onClick={removeFilter}
          type={activeFilter ? "type" : query ? "search" : null}
        />
      )}

      {priceTagClicked && selectedPokemon && (
        <PaymentModal
          pokemon={selectedPokemon}
          closeModalOnClick={closeModal}
        />
      )}
    </div>
  );
};
