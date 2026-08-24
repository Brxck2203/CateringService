import { useMemo, useState } from "react";
import cateringData from "../data/cateringData";
import CateringCard from "../components/CateringCard";

const initialFilters = {
  query: "",
  eventType: "",
  category: "",
  location: "",
  maxBudget: "",
  guests: "",
};

function MainMenu() {
  const [filters, setFilters] = useState(initialFilters);

  const eventTypes = useMemo(
    () => [...new Set(cateringData.flatMap((catering) => catering.tiposEvento))].sort(),
    [],
  );
  const categories = useMemo(
    () => [...new Set(cateringData.map((catering) => catering.categoria))].sort(),
    [],
  );
  const locations = useMemo(
    () => [...new Set(cateringData.map((catering) => catering.ubicacion))].sort(),
    [],
  );

  const filteredCatering = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();
    const maxBudget = Number(filters.maxBudget);
    const guests = Number(filters.guests);

    return cateringData.filter((catering) => {
      const searchableText = [
        catering.nombre,
        catering.categoria,
        catering.ubicacion,
        ...catering.tiposEvento,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesEventType = !filters.eventType || catering.tiposEvento.includes(filters.eventType);
      const matchesCategory = !filters.category || catering.categoria === filters.category;
      const matchesLocation = !filters.location || catering.ubicacion === filters.location;
      const matchesBudget = !maxBudget || catering.precioMinimo <= maxBudget;
      const matchesGuests = !guests || (guests >= catering.capacidadMinima && guests <= catering.capacidadMaxima);

      return (
        matchesQuery &&
        matchesEventType &&
        matchesCategory &&
        matchesLocation &&
        matchesBudget &&
        matchesGuests
      );
    });
  }, [filters]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }));
  };

  const clearFilters = () => setFilters(initialFilters);

  return (
    <main className="main-menu">
      <header className="main-menu__header">
        <p className="main-menu__eyebrow">Encuentra el servicio ideal para tu evento</p>
        <h1>Catering Services</h1>
        <p>Explora proveedores según sus servicios, ubicación, presupuesto y capacidad.</p>
      </header>

      <section className="filters" aria-label="Filtros de servicios de catering">
        <div className="filters__header">
          <h2>Buscar y filtrar</h2>
          <button className="filters__clear" type="button" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </div>

        <div className="filters__grid">
          <label className="filters__field filters__field--wide">
            Buscar por nombre o servicio
            <input
              type="search"
              name="query"
              value={filters.query}
              onChange={handleChange}
              placeholder="Ejemplo: boda, gourmet o San José"
            />
          </label>

          <label className="filters__field">
            Tipo de evento
            <select name="eventType" value={filters.eventType} onChange={handleChange}>
              <option value="">Todos</option>
              {eventTypes.map((eventType) => (
                <option key={eventType} value={eventType}>
                  {eventType}
                </option>
              ))}
            </select>
          </label>

          <label className="filters__field">
            Categoría
            <select name="category" value={filters.category} onChange={handleChange}>
              <option value="">Todas</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="filters__field">
            Ubicación
            <select name="location" value={filters.location} onChange={handleChange}>
              <option value="">Todas</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </label>

          <label className="filters__field">
            Presupuesto máximo (₡)
            <input
              type="number"
              min="0"
              name="maxBudget"
              value={filters.maxBudget}
              onChange={handleChange}
              placeholder="Ejemplo: 250000"
            />
          </label>

          <label className="filters__field">
            Número de invitados
            <input
              type="number"
              min="1"
              name="guests"
              value={filters.guests}
              onChange={handleChange}
              placeholder="Ejemplo: 80"
            />
          </label>
        </div>
      </section>

      <p className="results-count" aria-live="polite">
        {filteredCatering.length} {filteredCatering.length === 1 ? "servicio encontrado" : "servicios encontrados"}
      </p>

      {filteredCatering.length > 0 ? (
        <div className="catering-grid">
          {filteredCatering.map((catering) => (
            <CateringCard key={catering.id} catering={catering} />
          ))}
        </div>
      ) : (
        <section className="empty-state">
          <h2>No encontramos servicios con esos criterios</h2>
          <p>Prueba ampliar el presupuesto, cambiar la ubicación o limpiar los filtros.</p>
          <button type="button" onClick={clearFilters}>
            Ver todos los servicios
          </button>
        </section>
      )}
    </main>
  );
}

export default MainMenu;
