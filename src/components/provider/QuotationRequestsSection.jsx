import { useMemo, useState } from 'react';

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0
  }).format(Number(value || 0));

const statusOptions = ['Pendiente', 'Aceptada', 'Rechazada'];

const QuotationRequestsSection = ({ quotations, onQuotationsChange }) => {
  const [selectedId, setSelectedId] = useState(quotations[0]?.id || '');

  const selectedQuotation = useMemo(
    () => quotations.find((quote) => quote.id === selectedId) || quotations[0],
    [quotations, selectedId]
  );

  const updateStatus = (id, status) => {
    const updatedQuotations = quotations.map((item) =>
      item.id === id ? { ...item, status } : item
    );

    onQuotationsChange(updatedQuotations);
  };

  return (
    <section className="provider-section">
      <div className="provider-section-header">
        <div>
          <p className="provider-section-label">Inicio</p>
          <h2>Gestión de contrataciones</h2>
        </div>
      </div>

      <div className="provider-grid two-columns">
        <div className="provider-panel">
          <h3>Solicitudes de cotización</h3>

          {quotations.length === 0 ? (
            <div className="provider-alert error">
              No hay solicitudes de cotización en este momento.
            </div>
          ) : (
            <div className="request-list">
              {quotations.map((quote) => (
                <button
                  key={quote.id}
                  type="button"
                  className={
                    selectedQuotation?.id === quote.id
                      ? 'request-card selected'
                      : 'request-card'
                  }
                  onClick={() => setSelectedId(quote.id)}
                >
                  <div className="request-card-top">
                    <div>
                      <p className="request-client">{quote.clientName}</p>
                      <span className="request-event-type">{quote.eventType}</span>
                    </div>
                    <span
                      className={
                        quote.status === 'Aceptada'
                          ? 'request-status accepted'
                          : quote.status === 'Rechazada'
                            ? 'request-status rejected'
                            : 'request-status pending'
                      }
                    >
                      {quote.status}
                    </span>
                  </div>

                  <div className="request-card-meta">
                    <span>{quote.eventDate}</span>
                    <span>{quote.guests} asistentes</span>
                  </div>

                  <p className="request-summary">{quote.summary}</p>

                  <strong>{formatCurrency(quote.budget)}</strong>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="provider-panel">
          {selectedQuotation ? (
            <>
              <h3>Detalle de la proforma</h3>

              <div className="request-detail">
                <div className="request-detail-header">
                  <div>
                    <p className="request-client">{selectedQuotation.clientName}</p>
                    <span className="request-event-type">{selectedQuotation.eventType}</span>
                  </div>

                  <span
                    className={
                      selectedQuotation.status === 'Aceptada'
                        ? 'request-status accepted'
                        : selectedQuotation.status === 'Rechazada'
                          ? 'request-status rejected'
                          : 'request-status pending'
                    }
                  >
                    {selectedQuotation.status}
                  </span>
                </div>

                <div className="request-detail-grid">
                  <div>
                    <strong>Correo:</strong> {selectedQuotation.email}
                  </div>
                  <div>
                    <strong>Fecha del evento:</strong> {selectedQuotation.eventDate}
                  </div>
                  <div>
                    <strong>Ubicación:</strong> {selectedQuotation.location}
                  </div>
                  <div>
                    <strong>Asistentes:</strong> {selectedQuotation.guests}
                  </div>
                  <div>
                    <strong>Paquete:</strong> {selectedQuotation.menuName}
                  </div>
                  <div>
                    <strong>Presupuesto:</strong> {formatCurrency(selectedQuotation.budget)}
                  </div>
                </div>

                <div className="request-detail-block">
                  <h4>Resumen del cliente</h4>
                  <p>{selectedQuotation.summary}</p>
                </div>

                <div className="request-detail-block">
                  <h4>Requerimientos</h4>
                  <ul>
                    {selectedQuotation.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="request-detail-block">
                  <h4>Notas adicionales</h4>
                  <p>{selectedQuotation.notes}</p>
                </div>

                <div className="request-actions">
                  <button
                    type="button"
                    className="provider-primary-btn"
                    onClick={() => updateStatus(selectedQuotation.id, 'Aceptada')}
                  >
                    Aceptar proforma
                  </button>

                  <button
                    type="button"
                    className="provider-secondary-btn"
                    onClick={() => updateStatus(selectedQuotation.id, 'Rechazada')}
                  >
                    Rechazar proforma
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="provider-alert error">
              Selecciona una solicitud para ver el detalle.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuotationRequestsSection;