import { createContext, useContext, useMemo, useState } from 'react';

const SESSION_STORAGE_KEY = 'catering-service-session-v1';
const AuthContext = createContext(null);

const loadSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Error leyendo la sesión:', error);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession);

  const value = useMemo(
    () => ({
      session,
      login: (account) => {
        const nextSession = {
          id: account.id,
          name: account.name,
          email: account.email,
          phone: account.phone ?? '',
          role: account.role,
          businessId: account.businessId ?? null
        };

        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession));
        setSession(nextSession);
      },
      logout: () => {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        setSession(null);
      }
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
