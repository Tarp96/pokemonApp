import { getItem, setItem } from "./localStorage";

export function cacheSet(key, value) {
  const payload = { t: Date.now(), v: value };
  setItem(key, payload);
}
