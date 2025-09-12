export function firstLetterUpperCase(word) {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1);
}

export const heightAndWeightConverter = (statToConvert) => {
  const convertedStat = statToConvert / 10;
  return convertedStat;
};
