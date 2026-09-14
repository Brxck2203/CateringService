import { providerDashboardData } from '../data/providerDashboardData';

const STORAGE_KEY = 'catering-service-provider-dashboard-v1';

const cloneData = (data) => JSON.parse(JSON.stringify(data));

export const loadProviderDashboardData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return cloneData(providerDashboardData);
    }

    const parsed = JSON.parse(raw);

    return {
      business: parsed.business || cloneData(providerDashboardData).business,
      menus: parsed.menus || cloneData(providerDashboardData).menus,
      transactions: parsed.transactions || cloneData(providerDashboardData).transactions,
      events: parsed.events || cloneData(providerDashboardData).events,
      recipes: parsed.recipes || cloneData(providerDashboardData).recipes,
      quotations: parsed.quotations || cloneData(providerDashboardData).quotations
    };
  } catch (error) {
    console.error('Error leyendo datos del panel del proveedor:', error);
    return cloneData(providerDashboardData);
  }
};

export const saveProviderDashboardData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('provider-dashboard-updated'));
    return true;
  } catch (error) {
    console.error('Error guardando datos del panel del proveedor:', error);
    return false;
  }
};

export const addQuotationRequest = (quotation) => {
  try {
    const currentData = loadProviderDashboardData();
    const updatedData = {
      ...currentData,
      quotations: [quotation, ...currentData.quotations]
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    window.dispatchEvent(new Event('provider-dashboard-updated'));
    return true;
  } catch (error) {
    console.error('Error agregando solicitud de cotización:', error);
    return false;
  }
};

export const resetProviderDashboardData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return cloneData(providerDashboardData);
  } catch (error) {
    console.error('Error restableciendo datos del panel del proveedor:', error);
    return cloneData(providerDashboardData);
  }
};