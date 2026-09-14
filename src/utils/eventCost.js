export function calculateEventTotalCost(event, menus) {
  if (!event || !event.menuId) return null;

  const menu = menus.find((item) => item.id === event.menuId);
  if (!menu) return null;

  const price = Number(menu.price);
  if (!Number.isFinite(price)) return null;

  if (menu.pricingModel === 'Por persona') {
    const guests = Number(event.guests) || 0;
    return price * guests;
  }

  return price;
}
