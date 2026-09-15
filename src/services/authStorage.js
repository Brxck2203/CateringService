import { authAccountsData } from '../data/authAccountsData';

const STORAGE_KEY = 'catering-service-auth-accounts-v1';

const cloneData = (data) => JSON.parse(JSON.stringify(data));

export const loadAccounts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      const seededAccounts = cloneData(authAccountsData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seededAccounts));
      return seededAccounts;
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : cloneData(authAccountsData);
  } catch (error) {
    console.error('Error leyendo cuentas de autenticación:', error);
    return cloneData(authAccountsData);
  }
};

export const saveAccounts = (accounts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    return true;
  } catch (error) {
    console.error('Error guardando cuentas de autenticación:', error);
    return false;
  }
};

export const findAccountByEmail = (email) => {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  return loadAccounts().find(
    (account) => account.email.toLowerCase() === normalizedEmail
  ) || null;
};

export const registerAccount = ({ name, email, phone, password, role, businessId }) => {
  const accounts = loadAccounts();

  if (accounts.some((account) => account.email.toLowerCase() === email.trim().toLowerCase())) {
    return { success: false, error: 'El correo electrónico ya se encuentra registrado' };
  }

  const account = {
    id: `account-${crypto.randomUUID()}`,
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    password,
    role,
    ...(role === 'proveedor' ? { businessId } : {})
  };

  if (!saveAccounts([account, ...accounts])) {
    return { success: false, error: 'No se pudo guardar la cuenta en este navegador.' };
  }

  return { success: true, account };
};

export const validateCredentials = (email, password) => {
  const account = findAccountByEmail(email);

  // En producción, la contraseña debe almacenarse y compararse con un hash seguro.
  return account && account.password === password ? account : null;
};
