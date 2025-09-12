export function firstLetterUpperCase(word) {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1);
}

export const heightAndWeightConverter = (statToConvert) => {
  const convertedStat = statToConvert / 10;
  return convertedStat;
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
