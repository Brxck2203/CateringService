import { Link } from "react-router-dom";

function CateringCard({ catering }) {
  return (
    <Link className="catering-card" to={`/catering/${catering.id}`}>
      <img src={catering.imagen} alt={catering.nombre} className="catering-card__image" />
      <div className="catering-card__content">
        <h2>{catering.nombre}</h2>
        <p className="catering-card__category">{catering.categoria}</p>
        <p>{catering.descripcionCorta}</p>
        <div className="catering-card__meta">
          <span>{catering.ubicacion}</span>
          <span aria-label={`Calificación ${catering.calificacion} de 5`}>
            ★ {catering.calificacion}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CateringCard;
