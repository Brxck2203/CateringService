import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import cateringData from "../data/cateringData";

const initialForm = {
  nombre: "",
  email: "",
  fecha: "",
  tipoEvento: "",
  invitados: "",
  ubicacion: "",
  menu: "",
  requerimientos: "",
};

function saveToLocalStorage(key, value) {
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([...current, value]));
}

function QuotationPage() {
  const { id } = useParams();
  const catering = cateringData.find((item) => item.id === Number(id));
  const [form, setForm] = useState(initialForm);
  const [quotation, setQuotation] = useState(null);
  const [contracted, setContracted] = useState(false);

  if (!catering) {
    return (
      <main className="quote-page">
        <h1>Proveedor no encontrado</h1>
        <Link to="/">← Volver al menú</Link>
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedMenu = catering.menus.find((menu) => menu.nombre === form.menu);
    const newQuotation = {
      id: crypto.randomUUID(),
      cateringId: catering.id,
      cateringNombre: catering.nombre,
      ...form,
      precioOrientativo: selectedMenu?.precio ?? catering.precioMinimo,
      estado: "Enviada",
      creadaEn: new Date().toISOString(),
    };

    saveToLocalStorage("catering_quotes", newQuotation);
    setQuotation(newQuotation);
  };

  const handleContract = () => {
    const contract = {
      id: crypto.randomUUID(),
      cotizacionId: quotation.id,
      cateringId: catering.id,
      cateringNombre: catering.nombre,
      cliente: quotation.nombre,
      fechaEvento: quotation.fecha,
      estado: "Solicitada",
      creadaEn: new Date().toISOString(),
    };

    saveToLocalStorage("catering_contracts", contract);
    setContracted(true);
  };

  if (quotation) {
    return (
      <main className="quote-page">
        <Link className="back-link" to={`/catering/${catering.id}`}>
          ← Volver al proveedor
        </Link>

        <section className="quote-success">
          <div className="quote-success__icon">✓</div>
          <h1>Cotización enviada</h1>
          <p>
            Tu solicitud fue registrada para <strong>{catering.nombre}</strong>. En este prototipo se guarda localmente en el navegador.
          </p>

          <div className="quote-summary">
            <p><strong>Evento:</strong> {quotation.tipoEvento}</p>
            <p><strong>Fecha:</strong> {quotation.fecha}</p>
            <p><strong>Invitados:</strong> {quotation.invitados}</p>
            <p><strong>Paquete:</strong> {quotation.menu}</p>
            <p><strong>Precio orientativo:</strong> ₡{quotation.precioOrientativo.toLocaleString()}</p>
          </div>

          {!contracted ? (
            <div className="detail-actions detail-actions--center">
              <button className="btn-primary" type="button" onClick={handleContract}>
                Confirmar solicitud de contratación
              </button>
              <Link className="btn-secondary" to={`/catering/${catering.id}`}>
                Volver al perfil
              </Link>
            </div>
          ) : (
            <div className="contract-success">
              <strong>Solicitud de contratación registrada.</strong>
              <p>El proveedor podrá continuar la coordinación del evento.</p>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="quote-page">
      <Link className="back-link" to={`/catering/${catering.id}`}>
        ← Volver al proveedor
      </Link>

      <header className="quote-page__header">
        <p className="section-eyebrow">Solicitud</p>
        <h1>Cotización con {catering.nombre}</h1>
        <p>Completa los datos básicos de tu evento para preparar la solicitud.</p>
      </header>

      <form className="quote-form" onSubmit={handleSubmit}>
        <label>
          Nombre completo
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>

        <label>
          Correo electrónico
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Fecha del evento
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        </label>

        <label>
          Tipo de evento
          <select name="tipoEvento" value={form.tipoEvento} onChange={handleChange} required>
            <option value="">Selecciona una opción</option>
            {catering.tiposEvento.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </label>

        <label>
          Cantidad de invitados
          <input
            type="number"
            name="invitados"
            min={catering.capacidadMinima}
            max={catering.capacidadMaxima}
            value={form.invitados}
            onChange={handleChange}
            required
          />
          <small>
            Capacidad del proveedor: {catering.capacidadMinima} a {catering.capacidadMaxima} personas.
          </small>
        </label>

        <label>
          Ubicación del evento
          <input name="ubicacion" value={form.ubicacion} onChange={handleChange} required />
        </label>

        <label className="quote-form__full">
          Menú o paquete
          <select name="menu" value={form.menu} onChange={handleChange} required>
            <option value="">Selecciona un paquete</option>
            {catering.menus.map((menu) => (
              <option key={menu.nombre} value={menu.nombre}>
                {menu.nombre} - ₡{menu.precio.toLocaleString()}
              </option>
            ))}
          </select>
        </label>

        <label className="quote-form__full">
          Requerimientos alimentarios o comentarios
          <textarea
            name="requerimientos"
            value={form.requerimientos}
            onChange={handleChange}
            rows="5"
            placeholder="Ejemplo: dos personas vegetarianas y una persona sin gluten."
          />
        </label>

        <div className="quote-form__actions quote-form__full">
          <button className="btn-primary" type="submit">Enviar cotización</button>
          <Link className="btn-secondary" to={`/catering/${catering.id}`}>Cancelar</Link>
        </div>
      </form>
    </main>
  );
}

export default QuotationPage;
