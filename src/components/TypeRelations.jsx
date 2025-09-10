import { useEffect, useMemo, useState } from "react";

const ALL_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const DISPLAY_BUCKETS = [4, 2, 1, 0.5, 0.25, 0];

function applyDefensiveRelations(acc, damageRelations) {
  const {
    double_damage_from = [],
    half_damage_from = [],
    no_damage_from = [],
  } = damageRelations;

  double_damage_from.forEach(({ name }) => {
    acc[name] *= 2;
  });
  half_damage_from.forEach(({ name }) => {
    acc[name] *= 0.5;
  });
  no_damage_from.forEach(({ name }) => {
    acc[name] = 0;
  });
}

function applyOffensiveRelations(best, damageRelations) {
  const {
    double_damage_to = [],
    half_damage_to = [],
    no_damage_to = [],
  } = damageRelations;

  double_damage_to.forEach(({ name }) => {
    best[name] = Math.max(best[name], 2);
  });
  half_damage_to.forEach(({ name }) => {
    best[name] = Math.max(best[name], 0.5);
  });
  no_damage_to.forEach(({ name }) => {
    best[name] = Math.max(best[name], 0);
  });
}

const _typeCache = new Map();
async function fetchTypeByUrl(url) {
  if (_typeCache.has(url)) return _typeCache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const data = await res.json();
  _typeCache.set(url, data);
  return data;
}

export default function TypeRelations({ pokemon, view = "offense" }) {
  const [status, setStatus] = useState("idle");
  const [typeDatas, setTypeDatas] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const pokemonTypes =
    pokemon?.types?.map((t) => ({
      name: t.type?.name,
      url: t.type?.url,
    })) ?? [];

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        const datas = await Promise.all(
          pokemonTypes.map((t) => fetchTypeByUrl(t.url))
        );
        if (!cancelled) {
          setTypeDatas(datas);
          setStatus("ready");
        }
      } catch (e) {
        if (!cancelled) {
          setErrMsg(e?.message || "Failed to load type data");
          setStatus("error");
        }
      }
    }

    if (pokemonTypes.length > 0) {
      load();
    } else {
      setTypeDatas([]);
      setStatus("ready");
    }

    return () => {
      cancelled = true;
    };
  }, [pokemonTypes.map((t) => t.url).join(",")]);

  const defensive = useMemo(() => {
    const incoming = Object.fromEntries(ALL_TYPES.map((t) => [t, 1]));
    typeDatas.forEach((td) =>
      applyDefensiveRelations(incoming, td.damage_relations || {})
    );
    return incoming;
  }, [typeDatas]);

  const offensive = useMemo(() => {
    const best = Object.fromEntries(ALL_TYPES.map((t) => [t, 1]));
    typeDatas.forEach((td) =>
      applyOffensiveRelations(best, td.damage_relations || {})
    );
    return best;
  }, [typeDatas]);

  function groupByMultiplier(mapObj) {
    const groups = Object.fromEntries(DISPLAY_BUCKETS.map((m) => [m, []]));
    for (const [type, mult] of Object.entries(mapObj)) {
      let bucket = 1;
      if (mult === 0) bucket = 0;
      else if (Math.abs(mult - 4) < 1e-6) bucket = 4;
      else if (Math.abs(mult - 2) < 1e-6) bucket = 2;
      else if (Math.abs(mult - 0.5) < 1e-6) bucket = 0.5;
      else if (Math.abs(mult - 0.25) < 1e-6) bucket = 0.25;
      groups[bucket].push(type);
    }
    return groups;
  }

  const chosenMap = view === "defense" ? defensive : offensive;
  const groups = useMemo(() => groupByMultiplier(chosenMap), [chosenMap]);

  return (
    <div className="relationsSection">
      {renderHeader ? (
        renderHeader({ view, types: pokemonTypes.map((t) => t.name) })
      ) : (
        <h3>Relations</h3>
      )}

      {status === "loading" && (
        <div className="skeletonRelations">
          <div className="skeletonBar" />
          <div className="skeletonBar" />
          <div className="skeletonBar" />
        </div>
      )}

      {status === "error" && (
        <p className="errorText">Couldn’t load type relations: {errMsg}</p>
      )}

      {status === "ready" && (
        <div className="relationsSingle">
          <div className="multiplierHeader">
            <span className="multiplierTag">{view.toUpperCase()}</span>
            {view === "offense" ? (
              <span className="subtitle">
                Best effectiveness of{" "}
                {pokemonTypes.map((t) => t.name).join(" / ") || "—"} moves
              </span>
            ) : (
              <span className="subtitle">Incoming damage to this Pokémon</span>
            )}
          </div>

          {DISPLAY_BUCKETS.map((m) => (
            <GroupRow key={`${view}-${m}`} label={`×${m}`} types={groups[m]} />
          ))}
        </div>
      )}
    </div>
  );
}

function GroupRow({ label, types }) {
  if (!types || !types.length) return null;
  return (
    <div className="groupRow">
      <span className="groupLabel">{label}</span>
      <div className="typeRow">
        {types.map((t) => (
          <span key={t} className={`typeBadge type-${t}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
