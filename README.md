# Catering Service — Prototipo

Prototipo web no funcional en React que muestra servicios de catering: pantalla de menú, detalle de cada catering y (próximamente) inscripción.

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior (incluye npm)

## Instalación

1. Clona o descarga este proyecto.
2. Entra a la carpeta del proyecto:

   ```bash
   cd catering-service
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Instala `react-router-dom` (usado para la navegación entre pantallas):

   ```bash
   npm install react-router-dom
   ```

## Ejecutar en desarrollo

```bash
npm run dev
```

Esto abre el proyecto en `http://localhost:5173`.

## Estructura del proyecto

```
src/
├── components/       # componentes reutilizables (ej. CateringCard)
├── data/             # datos de ejemplo (cateringData.js)
├── pages/            # pantallas (MainMenu, CateringDetail)
├── App.jsx           # rutas de la aplicación
└── main.jsx          # punto de entrada
```

## Notas

Este es un prototipo **no funcional**: no hay backend ni base de datos, los datos de los caterings están fijos en `src/data/cateringData.js`.
