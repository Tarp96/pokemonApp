import { useEffect, useState, useRef } from "react";
import PokemonDisplayCard from "../../components/PokemonDisplayCard";
import {
  fetchData,
  fetchPokemonDetails,
  fetchPokemonNamesByType,
} from "../../utils/pokeApi";
import { FilterByTypeButtons } from "../../components/FilterByTypeButtons";
import { SearchBar } from "../../components/SearchBar";
import { NoPokemonMatchFilter } from "../../components/NoPokemonMatchFilter";
import { PokemonGrid } from "../../components/PokemonGrid";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { getItem, setItem } from "../../utils/localStorage";
import { fetchPokemonCardData } from "../../utils/pokeApiCard";
import { setCachedPageFull } from "../../utils/cache";
import { firstLetterUpperCase } from "../../utils/helperFunctions";

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
  const [typeNames, setTypeNames] = useState([]);
  const [typeLoadedCount, setTypeLoadedCount] = useState(0);
  const [typeTotal, setTypeTotal] = useState(0);

  const TYPE_BATCH_SIZE = 20;
  const DETAIL_CONCURRENCY = 6;
  const requestIdRef = useRef(0);

  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const shouldWatch =
      !!activeFilter &&
      Array.isArray(typeNames) &&
      typeLoadedCount < typeTotal &&
      !loading;

    if (!shouldWatch) {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !typeLoading) {
          setTimeout(() => {
            if (
              Array.isArray(typeNames) &&
              typeLoadedCount < typeTotal &&
              !typeLoading
            ) {
              loadTypeBatch(typeNames, typeLoadedCount);
            }
          }, 0);
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0.01,
      }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [
    activeFilter,
    typeNames,
    typeLoadedCount,
    typeTotal,
    typeLoading,
    loading,
  ]);

  useEffect(() => {
    loadPokemonData(pageNumber);
  }, [pageNumber]);

  const loadPokemonData = async (pageNumber) => {
    try {
      setLoading(true);

      const result = await fetchData(pageNumber, 20);
      const pokemonNames = result.results.map((p) => p.name);

      const allPokemonDetails = await Promise.all(
        pokemonNames.map((pokemonName) => fetchPokemonCardData(pokemonName))
      );

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

  async function fetchCardsForNames(names, concurrency = DETAIL_CONCURRENCY) {
    const results = new Array(names.length);
    let index = 0;

    async function worker() {
      while (index < names.length) {
        const myIdx = index++;
        const name = names[myIdx];
        try {
          const card = await fetchPokemonCardData(name);
          results[myIdx] = card;
        } catch (e) {
          results[myIdx] = null; // tolerate failures
        }
      }
    }

    const workers = Array.from(
      { length: Math.min(concurrency, names.length) },
      () => worker()
    );
    await Promise.all(workers);
    return results.filter(Boolean);
  }

  async function loadTypeBatch(
    arg1 = typeNames,
    arg2 = 0,
    reqId = requestIdRef.current
  ) {
    let namesSource, startFrom;

    if (Array.isArray(arg1)) {
      namesSource = arg1;
      startFrom = Number(arg2) || 0;
    } else if (typeof arg1 === "number") {
      namesSource = typeNames;
      startFrom = arg1;
    } else {
      namesSource = typeNames;
      startFrom = Number(arg2) || 0;
    }

    if (!Array.isArray(namesSource)) {
      console.error("loadTypeBatch: namesSource is not an array", {
        arg1,
        arg2,
        namesSource,
      });
      return;
    }

    const end = Math.min(startFrom + TYPE_BATCH_SIZE, namesSource.length);
    const slice = namesSource.slice(startFrom, end);
    if (slice.length === 0) return;

    setTypeLoading(true);
    try {
      const cards = await fetchCardsForNames(slice);

      if (reqId !== requestIdRef.current) return;

      setFilteredPokemon((prev) => [...prev, ...cards]);
      setTypeLoadedCount(end);
    } catch (e) {
      console.error("Failed loading type batch:", e);
    } finally {
      if (reqId === requestIdRef.current) setTypeLoading(false);
    }
  }

  const filterPokemonByType = async (key) => {
    if (activeFilter === key) {
      // Invalidate in-flight requests
      ++requestIdRef.current;
      removeFilter();
      return;
    }

    const myReqId = ++requestIdRef.current;

    setActiveFilter(key);
    setIsFiltered(true);
    setFilteredPokemon([]);
    setTypeNames([]);
    setTypeLoadedCount(0);
    setTypeTotal(0);
    setTypeLoading(true);

    try {
      const cacheKey = `typeNames:${key}`;
      let names = getItem(cacheKey);
      if (!Array.isArray(names) || names.length === 0) {
        names = await fetchPokemonNamesByType(key);
        setItem(cacheKey, names);
      }

      setTypeNames(names);
      setTypeTotal(names.length);

      await loadTypeBatch(names, 0, myReqId);
    } catch (e) {
      console.error("Error loading type list:", e);
      if (myReqId === requestIdRef.current) setFilteredPokemon([]);
    } finally {
      if (myReqId === requestIdRef.current) setTypeLoading(false);
    }
  };

  const removeFilter = () => {
    requestIdRef.current;
    setActiveFilter(null);
    setIsFiltered(false);
    setFilteredPokemon(pokemon);
    setQuery("");

    setTypeNames([]);
    setTypeLoadedCount(0);
    setTypeTotal(0);
    setTypeLoading(false);
  };

  const renderQueryPokemonCard = async (customQuery) => {
    const searchTerm = String(customQuery ?? query).trim();

    if (!searchTerm) {
      alert("Please enter a Pokémon name before searching.");
      return;
    }

    try {
      const pokemonDetails = await fetchPokemonDetails(
        searchTerm.toLowerCase()
      );
      setFilteredPokemon([pokemonDetails]);

      const updatedHistory = Array.from(
        new Set([searchTerm, ...searchHistory])
      ).slice(0, 10);
      setSearchHistory(updatedHistory);
      setItem("searchHistory", updatedHistory);
      setQuery(searchTerm);
    } catch (error) {
      console.log("Pokemon not found");
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
        className={`pokemon-card-${pokemonItem.name}`}
      />
    ));
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
      />

      <FilterByTypeButtons
        filterByTypeFunc={filterPokemonByType}
        activeFilter={activeFilter}
      />

      {/* Show pagination only in normal (non-type) mode */}
      {!activeFilter && (
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={(newPage) => setPageNumber(newPage)}
        />
      )}

      {/* Type mode header */}
      {activeFilter && typeLoadedCount > 0 && (
        <div
          className="typeHeader"
          style={{ textAlign: "center", margin: "10px 0" }}
        >
          <strong>
            {firstLetterUpperCase(activeFilter)} Pokémon • Showing{" "}
            {typeLoadedCount} / {typeTotal}
          </strong>
        </div>
      )}

      {loading || typeLoading ? (
        <p>Loading Pokémon...</p>
      ) : filteredPokemon.length > 0 ? (
        <>
          <PokemonGrid>{renderPokemonCards()}</PokemonGrid>

          {/* Infinite scroll sentinel (only when more remain in type mode) */}
          {activeFilter && typeLoadedCount < typeTotal && (
            <div
              ref={sentinelRef}
              style={{ height: 1, margin: 0, padding: 0 }}
              aria-hidden="true"
            />
          )}
        </>
      ) : (
        <NoPokemonMatchFilter
          onClick={removeFilter}
          type={activeFilter ? "type" : query ? "search" : null}
        />
      )}
    </div>
  );
};
