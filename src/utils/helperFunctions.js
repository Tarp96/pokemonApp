export function firstLetterUpperCase(word) {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1);
}

export const formatHeight = (decimeters) => {
  if (decimeters == null) return "—";
  return `${decimeters / 10} m`;
};

export const formatWeight = (hectograms) => {
  if (hectograms == null) return "—";
  return `${hectograms / 10} kg`;
};

export const getEggStepCount = (hatchCounter) => {
  if (hatchCounter == null) return null;
  return 256 * (hatchCounter + 1);
};

export const formatEggCycles = (hatchCounter) => {
  if (hatchCounter == null) return "—";
  const steps = getEggStepCount(hatchCounter);
  return `${hatchCounter} cycles (${steps} steps)`;
};

export const pickEnglishFlavorText = (
  entries,
  fallback = "No description available."
) => {
  if (!Array.isArray(entries)) return fallback;
  const english = entries.filter((e) => e?.language?.name === "en");
  const text = english[0]?.flavor_text || "";
  return (
    text
      .replace(/[\n\f\r]+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim() || fallback
  );
};
