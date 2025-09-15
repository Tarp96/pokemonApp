import { useEffect, useState } from "react";
import {
  fetchPokemonSpeciesDetails,
  fetchEvolutionChainById,
  fetchPokemonDetails,
} from "./../utils/pokeApi";
import { buildEvolutionPaths } from "../utils/helperFunctions";

export const EvolutionSection = ({ pokemon }) => {
  const [paths, setPaths] = useState([]);
  const [monMap, setMonMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Accept name or id from either details or species object
    const idOrName = pokemon?.id ?? pokemon?.name;
    if (!idOrName) return;

    let cancelled = false;

    const loadEvolution = async () => {
      try {
        setLoading(true);
        setError(null);

        const species = await fetchPokemonSpeciesDetails(idOrName);

        const chainUrl = species?.evolution_chain?.url;
        if (!chainUrl) {
          if (!cancelled) {
            setPaths([]);
            setMonMap({});
          }
          return;
        }

        const segments = chainUrl.split("/").filter(Boolean);
        const chainId = segments[segments.length - 1];
        if (!chainId) {
          throw new Error(`Could not parse chain id from URL: ${chainUrl}`);
        }

        const chainData = await fetchEvolutionChainById(chainId);

        const evoPaths = buildEvolutionPaths(chainData);

        if (!evoPaths || evoPaths.length === 0) {
          if (!cancelled) {
            setPaths([]);
            setMonMap({});
          }
          return;
        }

        const uniqueNames = Array.from(
          new Set(evoPaths.flatMap((p) => p.map((n) => n.name)))
        );

        const detailEntries = await Promise.all(
          uniqueNames.map(async (name) => {
            try {
              const d = await fetchPokemonDetails(name);
              return [name, d];
            } catch (e) {
              console.warn("[EvolutionSection] failed details for:", name, e);
              return [name, null];
            }
          })
        );

        const detailsMap = Object.fromEntries(detailEntries);

        if (!cancelled) {
          setPaths(evoPaths);
          setMonMap(detailsMap);
        }
      } catch (err) {
        console.error("[EvolutionSection] loadEvolution failed:", err);
        if (!cancelled)
          setError(err.message || "Failed to load evolution chain");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadEvolution();
    return () => {
      cancelled = true;
    };
  }, [pokemon?.id, pokemon?.name]);

  if (loading) return <div>Loading evolution…</div>;
  if (error) return <div style={{ color: "#b91c1c" }}>{error}</div>;
  if (!paths.length) return <div>No evolution data.</div>;

  return (
    <div className="evoSection">
      {paths.map((path, i) => (
        <div className="evoPath" key={i}>
          {path.map((node, idx) => {
            const isCurrent =
              node.name === (pokemon?.name?.toLowerCase?.() ?? "");
            const mon = monMap[node.name];

            return (
              <div
                className={`evoNode ${isCurrent ? "current" : ""}`}
                key={node.name + idx}
              >
                <div className="evoImgWrap">
                  {mon?.sprites?.other?.["official-artwork"]?.front_default ? (
                    <img
                      src={mon.sprites.other["official-artwork"].front_default}
                      alt={node.name}
                    />
                  ) : (
                    <div className="evoImgFallback">?</div>
                  )}
                </div>
                <div className="evoLabel">
                  #{mon?.id ?? "—"} {node.name}
                </div>
                {idx < path.length - 1 && <div className="evoArrow">→</div>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
