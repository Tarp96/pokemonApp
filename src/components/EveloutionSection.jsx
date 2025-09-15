import { useEffect, useState } from "react";

export const EvolutionSection = ({ pokemon }) => {
  const [paths, setPaths] = useState([]);
  const [monMap, setMonMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemon?.id) return;
    let cancelled = false;

    const loadEvolution = async () => {
      try {
        setLoading(true);
        setError(null);

        const species = await fetchPokemonSpecies(pokemon.id);

        const chainUrl = species?.evolution_chain?.url;
        if (!chainUrl) throw new Error("No evolution chain for this species");
        const chainId = chainUrl.split("/").filter(Boolean).pop();

        const chainData = await fetchEvolutionChainById(chainId);

        const evoPaths = buildEvolutionPaths(chainData);

        const uniqueNames = Array.from(
          new Set(evoPaths.flatMap((p) => p.map((n) => n.name)))
        );
        const detailEntries = await Promise.all(
          uniqueNames.map(async (name) => {
            try {
              const d = await fetchPokemonDetails(name);
              return [name, d];
            } catch {
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
  }, [pokemon?.id]);

  if (loading) return <div>Loading evolution…</div>;
  if (error) return <div>Could not load evolution chain.</div>;
  if (!paths.length) return <div>No evolution data.</div>;

  return (
    <div className="evoSection">
      {paths.map((path, i) => (
        <div className="evoPath" key={i}>
          {path.map((node, idx) => {
            const isCurrent = node.name === pokemon.name?.toLowerCase();
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
