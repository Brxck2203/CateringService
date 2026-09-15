export function getMenuItems(menu) {
  if (!menu) return [];

  if (Array.isArray(menu.items) && menu.items.length > 0) {
    return menu.items.filter(Boolean);
  }

  const description = String(menu.descripcion || menu.description || "").trim();
  if (!description) return [];

  const normalized = description.replace(/[.]$/, "");
  const parts = normalized
    .split(/,\s*|\s+y\s+(?=[^,]+$)/i)
    .map((item) => item.trim())
    .filter(Boolean);

  return parts.length > 1 ? parts : [normalized];
}
