import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../types/auth';
import { getStoredAuth, saveStoredAuth, clearStoredAuth } from '../lib/storage';
import { DEMO_USER } from '../lib/demoData';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  fillDemoCredentials: () => { email: string; password: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => getStoredAuth());

  useEffect(() => {
    saveStoredAuth(authState);
  }, [authState]);

  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === DEMO_USER.email.toLowerCase() && cleanPassword === DEMO_USER.password) {
      const user: User = {
        id: 'usr-admin-1',
        name: DEMO_USER.name,
        email: DEMO_USER.email,
        role: DEMO_USER.role,
        avatarUrl: DEMO_USER.avatarUrl,
      };
      setAuthState({
        isAuthenticated: true,
        user,
      });
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please use demo credentials: admin@treevaelite.demo / Admin@123',
    };
  };

  const logout = () => {
    clearStoredAuth();
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  const fillDemoCredentials = () => {
    return {
      email: DEMO_USER.email,
      password: DEMO_USER.password,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        login,
        logout,
        fillDemoCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
