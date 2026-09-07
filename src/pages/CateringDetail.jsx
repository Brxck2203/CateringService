import { useParams, Link } from "react-router-dom";
import cateringData from "../data/cateringData";

function Stars({ value }) {
  const rounded = Math.round(value);
  return (
    <span className="stars" aria-label={`${value} de 5 estrellas`}>
      {"★".repeat(rounded)}{"☆".repeat(5 - rounded)}
    </span>
  );
}

function CateringDetail() {
  const { id } = useParams();
  const catering = cateringData.find((item) => item.id === Number(id));

  if (!catering) {
    return (
      <main className="catering-detail catering-detail--missing">
        <h1>Catering no encontrado</h1>
        <Link to="/">← Volver al menú</Link>
      </main>
    );
  }

  const whatsappUrl = `${catering.contacto.whatsapp}?text=${encodeURIComponent(
    `Hola, vi su perfil en Catering Services y quisiera consultar por un evento.`,
  )}`;

  return (
    <main className="catering-detail">
      <Link className="back-link" to="/">
        ← Volver al menú
      </Link>

      <header className="catering-detail__header">
        <div>
          <h1>{catering.nombre}</h1>
          <p className="catering-card__category">{catering.categoria}</p>
        </div>
        <div className="rating-summary">
          <Stars value={catering.calificacion} />
          <strong>{catering.calificacion}</strong>
          <span>({catering.resenas.length} reseñas)</span>
        </div>
      </header>

      <div className="catering-detail__gallery">
        {catering.imagenes.map((img, index) => (
          <img key={img} src={img} alt={`${catering.nombre} - imagen ${index + 1}`} />
        ))}
      </div>

      <section className="catering-detail__info detail-card">
        <p>{catering.info}</p>
        <div className="detail-facts">
          <p><strong>Ubicación:</strong> {catering.ubicacion}</p>
          <p>
            <strong>Precio orientativo:</strong> ₡{catering.precioMinimo.toLocaleString()} - ₡{catering.precioMaximo.toLocaleString()}
          </p>
          <p>
            <strong>Capacidad:</strong> {catering.capacidadMinima} - {catering.capacidadMaxima} personas
          </p>
          <p><strong>Teléfono:</strong> {catering.contacto.telefono}</p>
        </div>
      </section>

      <section className="detail-card">
        <h2>Servicios ofrecidos</h2>
        <ul className="check-list">
          {catering.servicios.map((servicio) => (
            <li key={servicio}>{servicio}</li>
          ))}
        </ul>
      </section>

      <section className="detail-card">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Catálogo</p>
            <h2>Menús y paquetes</h2>
          </div>
          <span className="muted-text">Precios orientativos</span>
        </div>

        <div className="menu-grid">
          {catering.menus.map((menu) => (
            <article className="menu-card" key={menu.nombre}>
              <h3>{menu.nombre}</h3>
              <p className="menu-card__price">₡{menu.precio.toLocaleString()}</p>
              <p>{menu.descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-card">
        <h2>Opciones y restricciones alimentarias</h2>
        <div className="tag-list">
          {catering.restricciones.map((restriccion) => (
            <span className="tag" key={restriccion}>{restriccion}</span>
          ))}
        </div>
      </section>

      <section className="detail-card">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Opiniones</p>
            <h2>Calificaciones y reseñas</h2>
          </div>
          <div className="rating-summary rating-summary--compact">
            <Stars value={catering.calificacion} />
            <strong>{catering.calificacion}</strong>
          </div>
        </div>

        <div className="reviews-list">
          {catering.resenas.map((resena, index) => (
            <article className="review-card" key={`${resena.autor}-${index}`}>
              <div className="review-card__header">
                <strong>{resena.autor}</strong>
                <Stars value={resena.puntuacion} />
              </div>
              <p>{resena.comentario}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="detail-actions">
        <Link className="btn-primary" to={`/catering/${catering.id}/cotizacion`}>
          Solicitar cotización
        </Link>
        <a
          href={whatsappUrl}
          className="btn-secondary"
          target="_blank"
          rel="noreferrer"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </main>
  );
}

export default CateringDetail;
