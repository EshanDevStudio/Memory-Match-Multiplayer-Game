import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { authApi } from '../api/authApi.js';
import { tokenStorage } from './tokenStorage.js';

const AuthContext = createContext(null);


// reads the username from the JWT payload
function readUsername(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload)).sub || null;
  } catch {
    return null;
  }
}


export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => tokenStorage.getAccessToken());

  const login = useCallback(async (username, password) => {
    const { data } = await authApi.login(username, password);
    tokenStorage.setTokens(data); // stores accessToken + refreshToken
    setAccessToken(data.accessToken);
  }, []);

  const register = useCallback((username, password) => authApi.register(username, password), []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(accessToken),
      username: accessToken ? readUsername(accessToken) : null,
      login,
      register
    }),
    [accessToken, register, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
