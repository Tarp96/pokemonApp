import { toCardData } from "./pokemonSlim";
import {
  fetchPokemonSpeciesByUrl,
  fetchPokemonSpeciesDetails,
} from "./pokeApi";

export async function fetchPokemonCardData(pokemonName) {
  const detailsRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  if (!detailsRes.ok) throw new Error(`Error fetching data for ${pokemonName}`);
  const details = await detailsRes.json();

  let species;
  try {
    species = await fetchPokemonSpeciesByUrl(details?.species?.url);
  } catch (e) {
    species = await fetchPokemonSpeciesDetails(pokemonName);
  }

  return toCardData(details, species);
}
