export function setItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("There was an error", err);
  }
}

export function getItem(key) {
  try {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : undefined;
  } catch (err) {
    console.error("There was an error", err);
  }
}
