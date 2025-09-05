import { getItem, setItem } from "./localStorage";

const pageFullKey = (pageNumber) => `cache:v1:pageFull:${pageNumber}`;

export function getCachedPageFull(pageNumber) {
  return cacheGet(pageFullKey(pageNumber), ONE_DAY);
}

export function setCachedPageFull(pageNumber, value) {
  cacheSet(pageFullKey(pageNumber), value);
}

export function cacheSet(key, value) {
  const payload = { t: Date.now(), v: value };
  setItem(key, payload);
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
