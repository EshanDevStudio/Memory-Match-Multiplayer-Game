import { createContext, useCallback, useContext, useMemo } from 'react';
import { authApi } from '../api/authApi.js';

const AuthContext = createContext(null);


export function AuthProvider({children}) {

  const register = useCallback((username, password) => authApi.register(username, password), []);

  const value = useMemo(
    () => ({
      register
    }),
    [register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
