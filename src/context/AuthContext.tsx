
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check if user is authenticated on mount and whenever localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('shoplinx_connection_status');
      setIsAuthenticated(authStatus === 'connected');
    };

    // Initial check
    checkAuthStatus();

    // Listen for storage changes (in case another tab changes auth status)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const login = () => {
    localStorage.setItem('shoplinx_connection_status', 'connected');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('shoplinx_connection_status');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
