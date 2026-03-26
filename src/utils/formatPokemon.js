export const formatPokemonForTeam = (pokemon) => ({
  name: pokemon.name,
  id: pokemon.id,
  sprite: pokemon.sprites?.front_default || null,
  types: pokemon.types?.map((t) => t.type.name) || [],
  generation: pokemon.generation ?? "unknown",
  purchasedAt: new Date(),
});
