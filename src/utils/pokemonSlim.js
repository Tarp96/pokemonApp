export function toCardData(details, species) {
  return {
    id: details.id,
    name: details.name,
    types: details.types,
    cries: details.cries,
    sprites: { front_default: details?.sprites?.front_default ?? null },
    generation: species?.generation?.name ?? "unknown",
  };
}
