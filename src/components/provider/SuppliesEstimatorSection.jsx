import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

const formatNumber = (value) =>
  Number(value).toLocaleString('es-CR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });

const SuppliesEstimatorSection = ({ events, menus, recipes }) => {
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) || events[0],
    [events, selectedEventId]
  );

  const menuRecipes = recipes.find((recipe) => recipe.menuId === selectedEvent?.menuId) || {
    dishes: []
  };

  const estimates = useMemo(() => {
    if (!selectedEvent || selectedEvent.status !== 'Confirmado') {
      return [];
    }

    const grouped = new Map();

    for (const dish of menuRecipes.dishes || []) {
      for (const ingredient of dish.ingredients || []) {
        const key = ingredient.name;

        if (!grouped.has(key)) {
          grouped.set(key, {
            name: ingredient.name,
            unit: ingredient.unit,
            total: 0,
            category: dish.category || 'General',
            dishes: [dish.dishName]
          });
        }

        const existing = grouped.get(key);
        existing.total += Number(ingredient.quantityPerGuest) * Number(selectedEvent.guests || 0);
        if (!existing.dishes.includes(dish.dishName)) {
          existing.dishes.push(dish.dishName);
        }
      }
    }

    return Array.from(grouped.values()).map((item) => ({
      ...item,
      total: Number(item.total.toFixed(2))
    }));
  }, [selectedEvent, menuRecipes]);

  const exportToExcel = () => {
    const data = estimates.map(item => ({
      name: item.name,
      category: item.category,
      dishes: item.dishes,
      total: item.total,
      unit: item.unit
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Estimación de insumos');

    XLSX.writeFile(wb, 'Estimación de insumos.xlsx');
  };

  return (
    <section className="provider-section">
      <div className="provider-section-header">
        <div>
          <p className="provider-section-label">Etapa 3</p>
          <h2>Estimación de insumos</h2>
        </div>
      </div>

      <div className="provider-grid two-columns">
        <div className="provider-panel">
          <h3>Eventos confirmados</h3>

          <div className="provider-inline-form">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.clientName} - {event.date}
                </option>
              ))}
            </select>
          </div>

          {selectedEvent ? (
            <div className="event-detail-card">
              <h4>{selectedEvent.clientName}</h4>
              <ul>
                <li>
                  <strong>Tipo:</strong> {selectedEvent.eventType}
                </li>
                <li>
                  <strong>Fecha:</strong> {selectedEvent.date} {selectedEvent.time}
                </li>
                <li>
                  <strong>Ubicación:</strong> {selectedEvent.location}
                </li>
                <li>
                  <strong>Comensales:</strong> {selectedEvent.guests}
                </li>
                <li>
                  <strong>Menú:</strong> {selectedEvent.menuName}
                </li>
                <li>
                  <strong>Observaciones:</strong> {selectedEvent.notes}
                </li>
              </ul>
            </div>
          ) : (
            <div className="provider-alert error">
              No hay eventos confirmados para estimar insumos.
            </div>
          )}
        </div>

        <div className="provider-panel">
          <h3>Resultado de estimación</h3>

          {selectedEvent?.status !== 'Confirmado' ? (
            <div className="provider-alert error">
              Solo pueden calcularse insumos para eventos en estado confirmado.
            </div>
          ) : estimates.length === 0 ? (
            <div className="provider-alert error">
              El menú seleccionado no tiene receta configurada para estimar insumos.
            </div>
          ) : (
            <>
              <div className="provider-meta">
                <strong>{selectedEvent.guests}</strong> asistentes
              </div>

              <div className="transaction-table-wrapper">
                <table className="provider-table">
                  <thead>
                    <tr>
                      <th>Insumo</th>
                      <th>Categoría</th>
                      <th>Platillos</th>
                      <th>Cantidad</th>
                      <th>Unidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimates.map((item) => (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.dishes.join(', ')}</td>
                        <td>{formatNumber(item.total)}</td>
                        <td>{item.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                className="provider-primary-btn"
                onClick={() => {
                  const rows = estimates.map((item) => ({
                    Insumo: item.name,
                    Categoría: item.category,
                    Platillos: item.dishes.join(', '),
                    Cantidad: item.total,
                    Unidad: item.unit
                  }));

                  const worksheet = XLSX.utils.json_to_sheet(rows);
                  const workbook = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(workbook, worksheet, 'Insumos');
                  XLSX.writeFile(workbook, `insumos-${selectedEvent?.clientName || 'evento'}.xlsx`);
                }}
              >
                Exportar Excel
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuppliesEstimatorSection;