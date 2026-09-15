import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PROVIDER_CATERING_ID, useCateringCatalog } from "../context/CateringCatalogContext";
import { addQuotationRequest } from "../services/providerDashboardStorage";
import { getMenuItems } from "../utils/menuItems";
import SiteHeader from "../components/SiteHeader";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  fecha: "",
  tipoEvento: "",
  invitados: "",
  ubicacion: "",
  menu: "",
  modificaciones: "",
  extras: "",
  requerimientos: "",
};

function saveToLocalStorage(key, value) {
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([...current, value]));
}

function QuotationPage() {
  const { id } = useParams();
  const { session } = useAuth();
  const { caterings } = useCateringCatalog();
  const catering = caterings.find((item) => String(item.id) === id);
  const [form, setForm] = useState(initialForm);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quotation, setQuotation] = useState(null);

  const selectedMenu = useMemo(
    () => catering?.menus.find((menu) => menu.nombre === form.menu),
    [catering, form.menu],
  );

  const packageItems = useMemo(() => getMenuItems(selectedMenu), [selectedMenu]);

  if (!catering) {
    return (
      <main className="quote-page">
        <SiteHeader />
        <h1>Proveedor no encontrado</h1>
        <Link to="/">← Volver al menú</Link>
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleMenuChange = (event) => {
    const menuName = event.target.value;
    const menu = catering.menus.find((item) => item.nombre === menuName);
    const items = getMenuItems(menu);

    setForm((current) => ({ ...current, menu: menuName }));
    setSelectedItems(items);
  };

  const handleItemToggle = (item) => {
    setSelectedItems((current) =>
      current.includes(item)
        ? current.filter((currentItem) => currentItem !== item)
        : [...current, item],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const removedItems = packageItems.filter((item) => !selectedItems.includes(item));
    const customization = {
      incluidos: selectedItems,
      removidos: removedItems,
      modificaciones: form.modificaciones.trim(),
      extras: form.extras.trim(),
    };

    const newQuotation = {
      id: crypto.randomUUID(),
      cateringId: catering.id,
      cateringNombre: catering.nombre,
      nombre: session?.name || "",
      email: session?.email || "",
      telefono: session?.phone || "",
      ...form,
      personalizacion: customization,
      estado: "Enviada",
      creadaEn: new Date().toISOString(),
    };

    saveToLocalStorage("catering_quotes", newQuotation);

    if (String(catering.id) === String(PROVIDER_CATERING_ID)) {
      const requirements = [];

      if (selectedItems.length) {
        requirements.push(`Elementos que se mantienen: ${selectedItems.join(", ")}.`);
      }
      if (removedItems.length) {
        requirements.push(`Elementos que el cliente desea quitar: ${removedItems.join(", ")}.`);
      }
      if (form.modificaciones.trim()) {
        requirements.push(`Modificaciones solicitadas: ${form.modificaciones.trim()}`);
      }
      if (form.extras.trim()) {
        requirements.push(`Extras solicitados: ${form.extras.trim()}`);
      }
      if (form.requerimientos.trim()) {
        requirements.push(`Requerimientos alimentarios o comentarios: ${form.requerimientos.trim()}`);
      }

      const quotationForProvider = {
        id: `quote-${crypto.randomUUID()}`,
        clientName: session?.name || "",
        email: session?.email || "",
        phone: session?.phone || "",
        eventType: form.tipoEvento || catering.tiposEvento?.[0] || "",
        eventDate: form.fecha || "",
        guests: Number(form.invitados) || 0,
        location: form.ubicacion || catering.ubicacion || "",
        menuName: form.menu || "",
        budget: Number(selectedMenu?.precio) || 0,
        status: "Pendiente",
        summary: `El cliente seleccionó ${form.menu} y personalizó el paquete antes de solicitar el precio final.`,
        requirements,
        notes: form.requerimientos.trim(),
      };

      addQuotationRequest(quotationForProvider);
    }

    setQuotation(newQuotation);
  };

  if (quotation) {
    const removedItems = quotation.personalizacion?.removidos ?? [];
    const keptItems = quotation.personalizacion?.incluidos ?? [];

    return (
      <main className="quote-page">
        <SiteHeader />
        <Link className="back-link" to={`/catering/${catering.id}`}>
          ← Volver al proveedor
        </Link>

        <section className="quote-success">
          <div className="quote-success__icon">✓</div>
          <h1>Solicitud de cotización enviada</h1>
          <p>
            Tu configuración fue enviada a <strong>{catering.nombre}</strong>. El proveedor revisará los cambios y extras solicitados para preparar una cotización ajustada a tu evento.
          </p>

          <div className="quote-summary">
            <p><strong>Cliente:</strong> {quotation.nombre}</p>
            <p><strong>Correo:</strong> {quotation.email}</p>
            <p><strong>Teléfono:</strong> {quotation.telefono || "No registrado"}</p>
            <p><strong>Evento:</strong> {quotation.tipoEvento}</p>
            <p><strong>Fecha:</strong> {quotation.fecha}</p>
            <p><strong>Invitados:</strong> {quotation.invitados}</p>
            <p><strong>Paquete base:</strong> {quotation.menu}</p>
            {keptItems.length > 0 && (
              <p><strong>Elementos incluidos:</strong> {keptItems.join(", ")}</p>
            )}
            {removedItems.length > 0 && (
              <p><strong>Elementos por quitar:</strong> {removedItems.join(", ")}</p>
            )}
            {quotation.modificaciones && (
              <p><strong>Modificaciones:</strong> {quotation.modificaciones}</p>
            )}
            {quotation.extras && (
              <p><strong>Extras solicitados:</strong> {quotation.extras}</p>
            )}
          </div>

          <div className="quote-price-notice">
            <strong>El precio todavía no se muestra.</strong>
            <p>Se definirá después de que el proveedor revise la personalización del paquete.</p>
          </div>

          <div className="detail-actions detail-actions--center">
            <Link className="btn-primary" to={`/catering/${catering.id}`}>
              Volver al perfil
            </Link>
          </div>
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
        <p>Completa los datos de tu evento, selecciona un paquete y personalízalo antes de solicitar el precio final.</p>
      </header>

      <form className="quote-form" onSubmit={handleSubmit}>
        <section className="quote-contact-summary quote-form__full" aria-label="Datos de contacto del cliente">
          <div>
            <p className="section-eyebrow">Datos de contacto</p>
          </div>
          <div className="quote-contact-summary__grid">
            <p><strong>Nombre:</strong> {session?.name}</p>
            <p><strong>Correo:</strong> {session?.email}</p>
            <p><strong>Teléfono:</strong> {session?.phone || "No registrado"}</p>
          </div>
          {!session?.phone && (
            <p className="quote-contact-summary__warning">
               <span style={{ color: 'red' }}>Tu cuenta no tiene un teléfono registrado.</span>
               </p>
          )}
        </section>

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
          <select name="menu" value={form.menu} onChange={handleMenuChange} required>
            <option value="">Selecciona un paquete</option>
            {catering.menus.map((menu) => (
              <option key={menu.nombre} value={menu.nombre}>
                {menu.nombre}
              </option>
            ))}
          </select>
        </label>

        {selectedMenu && (
          <section className="package-customizer quote-form__full" aria-label="Personalización del paquete">
            <div className="package-customizer__header">
              <div>
                <p className="section-eyebrow">Personaliza tu selección</p>
                <h2>{selectedMenu.nombre}</h2>
              </div>
              <span>Sin precio previo</span>
            </div>

            <p className="package-customizer__help">
              Desmarca lo que deseas quitar. Luego puedes indicar cambios o solicitar extras. El proveedor calculará el precio con base en esta configuración.
            </p>

            {packageItems.length > 0 && (
              <div className="package-items">
                {packageItems.map((item) => (
                  <label className="package-item" key={item}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={() => handleItemToggle(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            )}
          </section>
        )}

        <label className="quote-form__full">
          ¿Qué deseas modificar del paquete?
          <textarea
            name="modificaciones"
            value={form.modificaciones}
            onChange={handleChange}
            rows="4"
            placeholder="Ejemplo: cambiar el postre por una opción sin azúcar o sustituir una guarnición."
          />
        </label>

        <label className="quote-form__full">
          ¿Qué extras deseas agregar?
          <textarea
            name="extras"
            value={form.extras}
            onChange={handleChange}
            rows="4"
            placeholder="Ejemplo: estación adicional de bebidas, meseros extra o decoración especial."
          />
        </label>

        <label className="quote-form__full">
          Requerimientos alimentarios o comentarios
          <textarea
            name="requerimientos"
            value={form.requerimientos}
            onChange={handleChange}
            rows="4"
            placeholder="Ejemplo: dos personas vegetarianas y una persona sin gluten."
          />
        </label>

        <div className="quote-form__notice quote-form__full">
          <strong>El precio no se mostrará antes de enviar la solicitud.</strong>
          <span>El proveedor lo definirá después de revisar el paquete, los cambios y los extras seleccionados.</span>
        </div>

        <div className="quote-form__actions quote-form__full">
          <button className="btn-primary" type="submit">Solicitar cotización</button>
          <Link className="btn-secondary" to={`/catering/${catering.id}`}>Cancelar</Link>
        </div>
      </form>
    </main>
  );
}

export default QuotationPage;
