import { getItem, setItem } from "./localStorage";

const PREFIX = "cache:v1:";

export function cacheSet(key, value) {
  const payload = { t: Date.now(), v: value };
  try {
    setItem(key, payload);
  } catch (e) {
    if (!isQuotaExceeded(e)) throw e;
    tryEvictOldest(5);
    try {
      setItem(key, payload);
    } catch {
      console.warn("Cache full; skipping write for", key);
    }
  }
}

export function cacheGet(key, maxAgeMs) {
  const payload = getItem(key);
  if (!payload || typeof payload !== "object") return null;
  const { t, v } = payload;
  if (typeof t !== "number") return null;
  if (Date.now() - t > maxAgeMs) return null;
  return v;
}

export function cacheGetStale(key) {
  const payload = getItem(key);
  return payload ? payload.v ?? null : null;
}

export function clearCachePrefix(prefix = PREFIX) {
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) keysToRemove.push(k);
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
}

function isQuotaExceeded(e) {
  return (
    e &&
    (e.name === "QuotaExceededError" ||
      e.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
      e.code === 22 ||
      e.code === 1014)
  );
}

function tryEvictOldest(n = 5) {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PREFIX)) {
      try {
        const p = JSON.parse(localStorage.getItem(k));
        keys.push({ k, t: p?.t ?? 0 });
      } catch {
        keys.push({ k, t: 0 });
      }
    }
  }
  keys.sort((a, b) => a.t - b.t);
  for (let i = 0; i < Math.min(n, keys.length); i++) {
    localStorage.removeItem(keys[i].k);
  }
}
