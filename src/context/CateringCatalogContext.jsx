import { createContext, useContext, useEffect, useMemo, useState } from "react";
import cateringData from "../data/cateringData";
import menuCatalogData from "../data/menuCatalogData";
import { loadProviderDashboardData } from "../services/providerDashboardStorage";

const PROVIDER_CATERING_ID = 1;
const CateringCatalogContext = createContext(null);

const asArray = (value) => (Array.isArray(value) ? value : []);

const createProviderMenuCatalog = (menus) => {
  const groupedMenus = new Map();

  menus.forEach((menu) => {
    const eventType = menu.eventType || "Otros";
    const current = groupedMenus.get(eventType) || {
      tipoEvento: eventType,
      capacidadMinima: Number(menu.minGuests) || 0,
      capacidadMaxima: Number(menu.maxGuests) || 0,
      entradas: [],
      platosFuertes: [],
      postres: [],
      bebidas: []
    };

    current.capacidadMinima = Math.min(current.capacidadMinima || Number(menu.minGuests) || 0, Number(menu.minGuests) || 0);
    current.capacidadMaxima = Math.max(current.capacidadMaxima, Number(menu.maxGuests) || 0);
    current.entradas.push(...asArray(menu.starters));
    current.platosFuertes.push(...asArray(menu.mains));
    current.postres.push(...asArray(menu.desserts));
    current.bebidas.push(...asArray(menu.drinks));
    groupedMenus.set(eventType, current);
  });

  return [...groupedMenus.values()].map((menu) => ({
    ...menu,
    entradas: [...new Set(menu.entradas)],
    platosFuertes: [...new Set(menu.platosFuertes)],
    postres: [...new Set(menu.postres)],
    bebidas: [...new Set(menu.bebidas)]
  }));
};

const createManagedCatering = (providerData) => {
  const baseCatering = cateringData.find((catering) => catering.id === PROVIDER_CATERING_ID);
  const business = providerData.business || {};
  const providerMenus = asArray(providerData.menus);
  const prices = providerMenus.map((menu) => Number(menu.price)).filter(Number.isFinite);
  const menuCatalog = createProviderMenuCatalog(providerMenus);
  const menuRestrictions = providerMenus.flatMap((menu) => asArray(menu.restrictions));
  const menuServices = providerMenus.flatMap((menu) => asArray(menu.services));
  const portfolio = asArray(business.portfolio);
  const eventTypes = asArray(business.eventTypes);
  const specialties = asArray(business.specialties);
  const presentationImage =
    typeof business.presentationImage === "string" && business.presentationImage.trim()
      ? business.presentationImage.trim()
      : null;

  return {
    ...baseCatering,
    id: PROVIDER_CATERING_ID,
    nombre: business.name || baseCatering.nombre,
    info: business.description || baseCatering.info,
    descripcionCorta: business.description || baseCatering.descripcionCorta,
    ubicacion: business.location || baseCatering.ubicacion,
    categoria: specialties[0] || baseCatering.categoria,
    contacto: {
      ...baseCatering.contacto,
      telefono: business.phone || baseCatering.contacto.telefono,
      email: business.email || "",
      whatsapp: business.whatsapp || baseCatering.contacto.whatsapp
    },
    capacidadMinima: Number(business.minCapacity) || 0,
    capacidadMaxima: Number(business.maxCapacity) || 0,
    tiposEvento: eventTypes.length ? eventTypes : baseCatering.tiposEvento,
    tiposMenu: providerMenus.map((menu) => menu.pricingModel).filter(Boolean),
    imagenes: portfolio.length ? portfolio : baseCatering.imagenes,
    imagen: presentationImage || portfolio[0] || baseCatering.imagen,
    precioMinimo: prices.length ? Math.min(...prices) : 0,
    precioMaximo: prices.length ? Math.max(...prices) : 0,
    servicios: [...new Set(menuServices.length ? menuServices : baseCatering.servicios)],
    restricciones: [...new Set(menuRestrictions.length ? menuRestrictions : baseCatering.restricciones)],
    menus: providerMenus.map((menu) => ({
      id: menu.id,
      nombre: menu.name || "",
      precio: Number(menu.price) || 0,
      descripcion: menu.description || ""
    })),
    menuCatalog
  };
};

const loadCatalog = () => {
  const providerData = loadProviderDashboardData();
  const managedCatering = createManagedCatering(providerData);

  return {
    caterings: cateringData.map((catering) =>
      catering.id === PROVIDER_CATERING_ID ? managedCatering : catering
    ),
    menuCatalog: {
      ...menuCatalogData,
      [PROVIDER_CATERING_ID]: managedCatering.menuCatalog
    }
  };
};

export function CateringCatalogProvider({ children }) {
  const [catalog, setCatalog] = useState(loadCatalog);

  useEffect(() => {
    const handleProviderUpdate = () => setCatalog(loadCatalog());
    window.addEventListener("provider-dashboard-updated", handleProviderUpdate);

    return () => window.removeEventListener("provider-dashboard-updated", handleProviderUpdate);
  }, []);

  const value = useMemo(() => catalog, [catalog]);

  return (
    <CateringCatalogContext.Provider value={value}>
      {children}
    </CateringCatalogContext.Provider>
  );
}

export function useCateringCatalog() {
  const context = useContext(CateringCatalogContext);

  if (!context) {
    throw new Error("useCateringCatalog debe usarse dentro de CateringCatalogProvider");
  }

  return context;
}
