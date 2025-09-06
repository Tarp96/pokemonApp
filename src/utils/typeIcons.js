const files = import.meta.glob("../assets/typeIcons/*.svg", {
  eager: true,
  as: "url",
});

const iconMap = Object.fromEntries(
  Object.entries(files).map(([path, url]) => {
    const file = path.split("/").pop();
    const name = file.replace(".svg", "");
    return [name.toLowerCase(), url];
  })
);

export function normalizeType(type) {
  return String(type).trim().toLowerCase().replace(/\s+/g, "-");
}

export function getTypeIcon(type) {
  const key = normalizeType(type);
  return iconMap[key] || null;
}
