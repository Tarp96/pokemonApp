import { cacheGet, cacheSet, cacheGetStale } from "./cache";
import { fetchPokemonCardData } from "./pokeApiCard";

const ONE_DAY = 24 * 60 * 60 * 1000;

const normalizeKey = (nameOrId) => String(nameOrId).toLowerCase();

const pageKey = (pageNumber, pageSize) =>
  `cache:v1:page:${pageNumber}:${pageSize}`;

const detailKey = (nameOrId) => `cache:v1:pokemon:${normalizeKey(nameOrId)}`;
const speciesKey = (nameOrId) => `cache:v1:species:${normalizeKey(nameOrId)}`;
const evoChainKey = (chainId) => `cache:v1:evochain:${chainId}`;

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

export const fetchTypeData = async (type) => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!res.ok) throw new Error(`Error fetching data for type: ${type}`);
  return res.json();
};

export const fetchMoveData = async (move) => {
  const res = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
  if (!res.ok) throw new Error(`Error fetching data for type: ${type}`);
  return res.json();
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

export const fetchPokemonSpeciesByUrl = async (url) => {
  if (!url) throw new Error("No species URL provided");

  const id = url.split("/").filter(Boolean).pop();
  return fetchPokemonSpeciesDetails(id);
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

export const fetchEvolutionChainById = async (chainId) => {
  const key = evoChainKey(chainId);
  const cached = cacheGet(key, ONE_DAY);
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${chainId}`
    );
    if (!res.ok) throw new Error(`Error fetching evolution chain ${chainId}`);
    const data = await res.json();
    cacheSet(key, data);
    return data;
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    const stale = cacheGetStale(key);
    if (stale) return stale;
    throw error;
  }
};

export async function safeFetchBatch(names) {
  const results = await Promise.allSettled(
    names.map(async (name) => {
      try {
        return await fetchPokemonCardData(name);
      } catch (e) {
        console.error(`Failed to fetch ${name}:`, e);
        return null;
      }
    })
  );

  return results
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => r.value);
}
