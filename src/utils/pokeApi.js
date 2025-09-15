import { cacheGet, cacheSet, cacheGetStale } from "./cache";

const ONE_DAY = 24 * 60 * 60 * 1000;

const normalizeKey = (nameOrId) => String(nameOrId).toLowerCase();

const pageKey = (pageNumber, pageSize) =>
  `cache:v1:page:${pageNumber}:${pageSize}`;

const detailKey = (nameOrId) => `cache:v1:pokemon:${normalizeKey(nameOrId)}`;
const speciesKey = (nameOrId) => `cache:v1:species:${normalizeKey(nameOrId)}`;

const metaKey = `cache:v1:meta:count`;

export const fetchData = async (pageNumber, pokemonPerPage) => {
  const cached = cacheGet(pageKey(pageNumber, pokemonPerPage), ONE_DAY);
  if (cached) return cached;

  const offset = (pageNumber - 1) * pokemonPerPage;
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${pokemonPerPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching Pokemon data");
    const result = await response.json();

    cacheSet(pageKey(pageNumber, pokemonPerPage), result);
    if (typeof result.count === "number") cacheSet(metaKey, result.count);
    return result;
  } catch (error) {
    console.error("Error fetching data, ", error);
    const stale = cacheGetStale(pageKey(pageNumber, pokemonPerPage));
    if (stale) return stale;
    throw error;
  }
};

export const fetchPokemonDetails = async (pokemonNameOrId) => {
  const key = detailKey(pokemonNameOrId);
  const cached = cacheGet(key, ONE_DAY);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching data for ${pokemonNameOrId}`);
    }
    const data = await response.json();
    cacheSet(key, data);
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    const stale = cacheGetStale(key);
    if (stale) return stale;
    throw error;
  }
};

export const fetchPokemonSpeciesDetails = async (pokemonName) => {
  const key = speciesKey(pokemonName);
  const cached = cacheGet(key, ONE_DAY);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
    );
    if (!response.ok) throw new Error(`Error fetching data for ${pokemonName}`);
    const data = await response.json();
    cacheSet(key, data);
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon species details:", error);
    const stale = cacheGetStale(key);
    if (stale) return stale;
    throw error;
  }
};

export const fetchAbilityDetails = async (ability) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/ability/${ability}/`
    );
    if (!response.ok) {
      throw new Error(`Error fetching data for ${ability}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ability details:", error);
    throw error;
  }
};
