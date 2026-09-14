import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { calculateEventTotalCost } from '../../utils/eventCost';

const transactionCategories = [
  'Anticipo',
  'Pago final',
  'Insumos',
  'Alquiler',
  'Personal',
  'Decoración',
  'Otros'
];

const emptyTransactionForm = {
  id: '',
  type: 'income',
  eventId: 'sin-evento',
  date: '',
  concept: '',
  amount: '',
  category: ''
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0
  }).format(Number(value || 0));

const FinanceSection = ({ transactions, events, menus, onTransactionsChange }) => {
  const [transactionForm, setTransactionForm] = useState(emptyTransactionForm);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState('');

  const selectedEventCost = useMemo(() => {
    if (transactionForm.type !== 'income' || transactionForm.eventId === 'sin-evento') {
      return null;
    }

    const event = events.find((item) => item.id === transactionForm.eventId);
    const totalCost = calculateEventTotalCost(event, menus);

    if (totalCost === null) {
      return { totalCost: null, available: null };
    }

    const existingIncome = transactions
      .filter(
        (item) =>
          item.type === 'income' &&
          item.eventId === transactionForm.eventId &&
          item.id !== transactionForm.id
      )
      .reduce((sum, item) => sum + Number(item.amount), 0);

    return {
      totalCost,
      available: totalCost - existingIncome
    };
  }, [events, menus, transactionForm, transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      return matchesType && matchesCategory;
    });
  }, [transactions, selectedType, selectedCategory]);

  const totals = useMemo(() => {
    const ingresos = transactions
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const egresos = transactions
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + Number(item.amount), 0);

    return {
      ingresos,
      egresos,
      balance: ingresos - egresos,
      count: transactions.length
    };
  }, [transactions]);

  const handleSaveTransaction = () => {
    setError('');

    if (!transactionForm.date || !transactionForm.concept.trim()) {
      setError('Fecha y concepto son obligatorios.');
      return;
    }

    if (!transactionForm.category.trim()) {
      setError('Debes seleccionar una categoría.');
      return;
    }

    if (Number(transactionForm.amount) <= 0 || Number.isNaN(Number(transactionForm.amount))) {
      setError('El monto debe ser un número mayor que cero.');
      return;
    }

    if (transactionForm.type === 'income' && transactionForm.eventId !== 'sin-evento') {
      const event = events.find((item) => item.id === transactionForm.eventId);
      const totalCost = calculateEventTotalCost(event, menus);

      if (totalCost !== null) {
        const existingIncome = transactions
          .filter(
            (item) =>
              item.type === 'income' &&
              item.eventId === transactionForm.eventId &&
              item.id !== transactionForm.id
          )
          .reduce((sum, item) => sum + Number(item.amount), 0);
        const available = totalCost - existingIncome;

        if (Number(transactionForm.amount) > available) {
          setError(
            `El monto excede lo pendiente por cobrar de este evento. Disponible: ${formatCurrency(available)} de un total de ${formatCurrency(totalCost)}.`
          );
          return;
        }
      }
    }

    const normalizedTransaction = {
      ...transactionForm,
      id: transactionForm.id || `transaction-${Date.now()}`,
      amount: Number(transactionForm.amount),
      concept: transactionForm.concept.trim(),
      category: transactionForm.category.trim()
    };

    const updatedTransactions = transactionForm.id
      ? transactions.map((item) =>
          item.id === transactionForm.id ? normalizedTransaction : item
        )
      : [normalizedTransaction, ...transactions];

    onTransactionsChange(updatedTransactions);
    setTransactionForm(emptyTransactionForm);
  };

  const handleEditTransaction = (transaction) => {
    setTransactionForm(transaction);
  };

  const handleDeleteTransaction = (transactionId) => {
    const confirmDelete = window.confirm('¿Deseas eliminar este movimiento?');
    if (!confirmDelete) return;

    onTransactionsChange(
      transactions.filter((item) => item.id !== transactionId)
    );
  };

  const exportToExcel = () => {
    const data = filteredTransactions.map((item) => ({
      Fecha: item.date,
      Tipo: item.type === 'income' ? 'Ingreso' : 'Egreso',
      Concepto: item.concept,
      Evento: item.eventId === 'sin-evento'
        ? 'Sin evento específico'
        : events.find((event) => event.id === item.eventId)?.eventType || 'Evento no encontrado',
      Cliente: item.eventId === 'sin-evento'
        ? '-'
        : events.find((event) => event.id === item.eventId)?.clientName || '-',
      Categoría: item.category,
      Monto: item.amount
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ingresos');
    XLSX.writeFile(workbook, 'finanzas-catering.xlsx');
  };

  return (
    <section className="provider-section">
      <div className="provider-section-header">
        <div>
          <p className="provider-section-label">Etapa 2</p>
          <h2>Finanzas del proveedor</h2>
        </div>
      </div>

      <div className="financial-summary">
        <div className="summary-card income">
          <span>Ingresos</span>
          <strong>{formatCurrency(totals.ingresos)}</strong>
        </div>
        <div className="summary-card expense">
          <span>Egresos</span>
          <strong>{formatCurrency(totals.egresos)}</strong>
        </div>
        <div className="summary-card balance">
          <span>Balance</span>
          <strong>{formatCurrency(totals.balance)}</strong>
        </div>
        <div className="summary-card total">
          <span>Movimientos</span>
          <strong>{totals.count}</strong>
        </div>
      </div>

      <div className="provider-grid two-columns">
        <div className="provider-panel">
          <h3>Registrar movimiento</h3>

          {error && <div className="provider-alert error">{error}</div>}

          <div className="provider-form-grid">
            <label>
              Tipo
              <select
                value={transactionForm.type}
                onChange={(e) =>
                  setTransactionForm((prev) => ({ ...prev, type: e.target.value }))
                }
              >
                <option value="income">Ingreso</option>
                <option value="expense">Egreso</option>
              </select>
            </label>

            <label>
              Evento asociado
              <select
                value={transactionForm.eventId}
                onChange={(e) =>
                  setTransactionForm((prev) => ({ ...prev, eventId: e.target.value }))
                }
              >
                <option value="sin-evento">Sin evento específico</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.eventType} - {event.clientName}
                  </option>
                ))}
              </select>
              {transactionForm.type === 'income' &&
                transactionForm.eventId !== 'sin-evento' &&
                (selectedEventCost?.totalCost === null ? (
                  <small className="field-note">
                    No fue posible calcular el costo del servicio para este evento; el ingreso no
                    tendrá límite.
                  </small>
                ) : (
                  <small className="field-note">
                    Costo total del servicio: {formatCurrency(selectedEventCost.totalCost)}.
                    Pendiente por cobrar: {formatCurrency(selectedEventCost.available)}.
                  </small>
                ))}
            </label>

            <label>
              Fecha
              <input
                type="date"
                value={transactionForm.date}
                onChange={(e) =>
                  setTransactionForm((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </label>

            <label>
              Categoría
              <select
                value={transactionForm.category}
                onChange={(e) =>
                  setTransactionForm((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="">Selecciona una categoría</option>
                {transactionCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="full-width">
              Concepto
              <input
                value={transactionForm.concept}
                onChange={(e) =>
                  setTransactionForm((prev) => ({ ...prev, concept: e.target.value }))
                }
              />
            </label>

            <label>
              Monto (CRC)
              <input
                type="number"
                min="1"
                value={transactionForm.amount}
                onChange={(e) =>
                  setTransactionForm((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
            </label>
          </div>

          <button
            type="button"
            className="provider-primary-btn"
            onClick={handleSaveTransaction}
          >
            {transactionForm.id ? 'Actualizar movimiento' : 'Guardar movimiento'}
          </button>
        </div>

        <div className="provider-panel">
          <h3>Consulta y filtros</h3>

          <div className="provider-inline-form">
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="all">Todos los tipos</option>
              <option value="income">Ingresos</option>
              <option value="expense">Egresos</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Todas las categorías</option>
              {transactionCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="transaction-table-wrapper">
            <table className="provider-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Concepto</th>
                  <th>Evento asociado</th>
                  <th>Categoría</th>
                  <th>Monto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      No hay movimientos con los filtros actuales.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((item) => {
                    const eventName =
                      item.eventId === 'sin-evento'
                        ? 'Sin evento específico'
                        : events.find((event) => event.id === item.eventId)?.clientName
                          ? `${events.find((event) => event.id === item.eventId).eventType} - ${events.find((event) => event.id === item.eventId).clientName}`
                          : 'Evento no encontrado';

                    return (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.type === 'income' ? 'Ingreso' : 'Egreso'}</td>
                        <td>{item.concept}</td>
                        <td>{eventName}</td>
                        <td>{item.category}</td>
                        <td className={item.type === 'income' ? 'text-income' : 'text-expense'}>
                          {formatCurrency(item.amount)}
                        </td>
                        <td className="action-cell">
                          <button type="button" onClick={() => handleEditTransaction(item)}>
                            Editar
                          </button>
                          <button
                            type="button"
                            className="danger"
                            onClick={() => handleDeleteTransaction(item.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="provider-secondary-btn"
            onClick={exportToExcel}
          >
            Exportar a Excel
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinanceSection;