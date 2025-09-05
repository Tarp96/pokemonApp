import { getItem, setItem } from "./localStorage";

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
