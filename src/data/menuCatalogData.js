// src/data/menuCatalogData.js
// Lookup independiente de cateringData.js: mapea el id de cada catering a su
// menu personalizado por tipo de evento. Se mantiene separado a proposito
// para no modificar el archivo cateringData.js existente y evitar romper
// los datos ya cargados por el equipo.
//
// Uso en CateringDetail.jsx:
//   import menuCatalogData from "../data/menuCatalogData";
//   const menuPersonalizado = menuCatalogData[catering.id] ?? [];
//   <MenuCatalog menuPersonalizado={menuPersonalizado} />

const menuCatalogData = {
  1: [
    {
      tipoEvento: "Boda",
      capacidadMinima: 50,
      capacidadMaxima: 200,
      entradas: ["Bruschettas de tomate y albahaca", "Copa de camaron al coctel"],
      platosFuertes: ["Lomito en salsa de vino", "Pollo relleno de espinaca y queso"],
      postres: ["Mini cheesecakes", "Mesa de postres variados"],
    },
    {
      tipoEvento: "Corporativo",
      capacidadMinima: 10,
      capacidadMaxima: 150,
      entradas: ["Canapes variados", "Ensalada Cesar individual"],
      platosFuertes: ["Buffet ejecutivo de pollo y res", "Pasta al pesto con vegetales"],
      postres: ["Brownies individuales", "Fruta de temporada"],
    },
  ],
  // Agregar aqui el resto de caterings por id conforme se defina su menu.
};

export default menuCatalogData;
