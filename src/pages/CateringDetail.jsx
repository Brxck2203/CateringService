import { useParams, Link } from "react-router-dom";
import cateringData from "../data/cateringData";

function CateringDetail() {
  const { id } = useParams();
  const catering = cateringData.find((c) => c.id === Number(id));

  if (!catering) return <p>Catering no encontrado.</p>;

  return (
    <main className="catering-detail">
      <Link to="/">← Volver al menú</Link>
      <h1>{catering.nombre}</h1>
      <p className="catering-card__category">{catering.categoria}</p>

      <div className="catering-detail__gallery">
        {catering.imagenes.map((img, i) => (
          <img key={i} src={img} alt={`${catering.nombre} ${i + 1}`} />
        ))}
      </div>

      <section className="catering-detail__info">
        <p>{catering.info}</p>
        <p>
          <strong>Ubicación:</strong> {catering.ubicacion}
        </p>
        <p>
          <strong>Precio:</strong> ₡{catering.precioMinimo.toLocaleString()} - ₡{catering.precioMaximo.toLocaleString()}
        </p>
        <p>
          <strong>Capacidad:</strong> {catering.capacidadMinima} - {catering.capacidadMaxima} personas
        </p>
      </section>

      <a href={catering.contacto.whatsapp} className="btn-contactar">
        Contactar
      </a>
    </main>
  );
}

export default CateringDetail;
