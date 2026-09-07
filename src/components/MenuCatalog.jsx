import { useState } from "react";
import DishList from "./DishList";

function MenuCatalog({ menuPersonalizado }) {
  const [tipoActivo, setTipoActivo] = useState(
    menuPersonalizado?.[0]?.tipoEvento ?? null
  );

  if (!menuPersonalizado || menuPersonalizado.length === 0) {
    return (
      <div className="menu-catalog menu-catalog--empty">
        <p>Este proveedor aun no ha publicado su menu detallado por tipo de evento.</p>
      </div>
    );
  }

  const menuActivo = menuPersonalizado.find(
    (menu) => menu.tipoEvento === tipoActivo
  );

  return (
    <div className="menu-catalog">
      <div className="menu-catalog__tabs" role="tablist">
        {menuPersonalizado.map((menu) => (
          <button
            key={menu.tipoEvento}
            type="button"
            role="tab"
            aria-selected={menu.tipoEvento === tipoActivo}
            className={`menu-catalog__tab ${
              menu.tipoEvento === tipoActivo ? "menu-catalog__tab--active" : ""
            }`}
            onClick={() => setTipoActivo(menu.tipoEvento)}
          >
            {menu.tipoEvento}
          </button>
        ))}
      </div>

      {menuActivo && (
        <div className="menu-catalog__panel" role="tabpanel">
          <p className="menu-catalog__capacity">
            Capacidad recomendada: {menuActivo.capacidadMinima} -{" "}
            {menuActivo.capacidadMaxima} personas
          </p>

          <DishList title="Entradas" dishes={menuActivo.entradas} />
          <DishList title="Platos fuertes" dishes={menuActivo.platosFuertes} />
          <DishList title="Postres" dishes={menuActivo.postres} />
        </div>
      )}
    </div>
  );
}

export default MenuCatalog;
