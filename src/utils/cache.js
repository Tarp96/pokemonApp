import { getItem, setItem } from "./localStorage";

const PREFIX = "cache:v1:";
const ONE_DAY = 24 * 60 * 60 * 1000;

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
  const toRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) toRemove.push(k);
  }
  toRemove.forEach((k) => localStorage.removeItem(k));
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
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k || !k.startsWith(PREFIX)) continue;
    try {
      const parsed = JSON.parse(localStorage.getItem(k));
      items.push({ k, t: parsed?.t ?? 0 });
    } catch {
      items.push({ k, t: 0 });
    }
  }
  items.sort((a, b) => a.t - b.t);
  for (let i = 0; i < Math.min(n, items.length); i++) {
    localStorage.removeItem(items[i].k);
  }
}

const pageFullKey = (pageNumber) => `${PREFIX}pageFull:${pageNumber}`;
const pagesIndexKey = `${PREFIX}pages:index`;
const MAX_PAGES = 5;

export function getCachedPageFull(pageNumber, ttlMs = ONE_DAY) {
  const raw = localStorage.getItem(pageFullKey(pageNumber));
  if (!raw) return null;
  try {
    const { t, v } = JSON.parse(raw);
    if (Date.now() - t > ttlMs) return null;
    return v;
  } catch {
    return null;
  }
}

export function setCachedPageFull(pageNumber, value) {
  const payload = { t: Date.now(), v: value };
  localStorage.setItem(pageFullKey(pageNumber), JSON.stringify(payload));
}
