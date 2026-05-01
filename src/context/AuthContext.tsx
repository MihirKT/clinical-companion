import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'full' | 'ai-only' | 'simple';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userName: string | null;
  login: (name: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const login = (name: string, role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
