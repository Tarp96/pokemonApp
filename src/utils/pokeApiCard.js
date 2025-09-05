import { toCardData } from "./pokemonSlim";

export async function fetchPokemonCardData(pokemonName) {
  const [detailsRes, speciesRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`),
  ]);
  if (!detailsRes.ok) throw new Error(`Error fetching data for ${pokemonName}`);
  if (!speciesRes.ok)
    throw new Error(`Error fetching species for ${pokemonName}`);

  const [details, species] = await Promise.all([
    detailsRes.json(),
    speciesRes.json(),
  ]);
  return toCardData(details, species);
}
