import { useState, useEffect } from "react";
import { fetchAbilityDetails } from "../../utils/pokeApi";

export const useAbilityDetails = (abilities) => {
  const [abilityDetails, setAbilityDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!abilities || abilities.length === 0) {
      setAbilityDetails([]);
      return;
    }

    let isMounted = true;

    const loadAbilityDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          abilities.map(async (a) => {
            const detail = await fetchAbilityDetails(a.ability.name);

            const englishEntry = detail.effect_entries.find(
              (entry) => entry.language.name === "en",
            );

            return {
              name: a.ability.name,
              isHidden: a.is_hidden,
              effect: englishEntry?.short_effect || "No description available.",
            };
          }),
        );

        if (isMounted) {
          setAbilityDetails(results);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load ability details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAbilityDetails();

    return () => {
      isMounted = false;
    };
  }, [abilities]);

  return { abilityDetails, loading, error };
};
