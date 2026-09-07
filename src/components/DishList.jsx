function DishList({ title, dishes }) {
  if (!dishes || dishes.length === 0) return null;

  return (
    <div className="dish-list">
      <h4 className="dish-list__title">{title}</h4>
      <ul className="dish-list__items">
        {dishes.map((dish, index) => (
          <li key={`${title}-${index}`} className="dish-list__item">
            {dish}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DishList;
