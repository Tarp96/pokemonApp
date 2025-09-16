import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPokemonDetails } from "../utils/pokeApi";

export const AlternativeFormsSection = ({ species }) => {
  const navigate = useNavigate();
  const [formsMap, setFormsMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const forms = useMemo(() => {
    const list = species?.varieties ?? [];
    return list.filter((v) => !v.is_default).map((v) => v.pokemon);
  }, [species]);

  useEffect(() => {
    if (!forms || forms.length === 0) return;

    let cancelled = false;
    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const entries = await Promise.all(
          forms.map(async (p) => {
            try {
              const d = await fetchPokemonDetails(p.name);
              return [p.name, d];
            } catch (e) {
              console.warn("[AlternativeForms] details failed:", p.name, e);
              return [p.name, null];
            }
          })
        );

        setFormsMap(Object.fromEntries(entries));

        if (!cancelled) {
          setFormsMap(Object.fromEntries(entries));
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load forms");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [forms]);

  if (!species) return null;

  return (
    <div className="altFormsSection">
      {loading && <p>Loading forms…</p>}
      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

      {forms.length === 0 ? (
        <p className="altFormsNoData">
          This Pokémon does not have any alternative forms.
        </p>
      ) : (
        <div className="altFormsGrid">
          {forms.map((p) => {
            const d = formsMap[p.name];
            const official =
              d?.sprites?.other?.["official-artwork"]?.front_default;
            const frontDefault = d?.sprites?.front_default;
            const dream = d?.sprites?.other?.dream_world?.front_default;
            const home = d?.sprites?.other?.home?.front_default;
            const img = official || frontDefault || dream || home || null;

            return (
              <button
                key={p.name}
                className="altFormCard"
                onClick={() => navigate(`/pokemon/${p.name}`)}
                title={`Go to ${p.name}`}
              >
                <div className="altFormImageWrap">
                  {img ? (
                    <img src={img} alt={p.name} />
                  ) : (
                    <div className="altFormImageFallback">?</div>
                  )}
                </div>
                <div className="altFormLabel">
                  <div className="altFormId">{d?.id ? `#${d.id}` : ""}</div>
                  <div className="altFormName">
                    {p.name?.replace(/-/g, " ")}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
