import { useNavigate } from "react-router-dom";

function CateringCard({ catering }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/catering/${catering.id}`);
  };

  return (
    <div className="catering-card" onClick={handleClick}>
      <img src={catering.imagen} alt={catering.nombre} className="catering-card__image" />
      <div className="catering-card__content">
        <h2>{catering.nombre}</h2>
        <p className="catering-card__category">{catering.categoria}</p>
        <p>{catering.descripcionCorta}</p>
      </div>
    </div>
  );
}

export default CateringCard;
