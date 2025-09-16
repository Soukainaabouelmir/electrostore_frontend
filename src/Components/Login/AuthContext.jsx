import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Fonction pour vérifier l'état d'authentification
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("role");
    
    if (token && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
      setUserRole(storedUserRole);
    } else {
      setIsLoggedIn(false);
      setUserName(null);
      setUserRole(null);
    }
  };

  // Fonction de connexion
  const login = (userData) => {
    const storage = {
      token: userData.access_token,
      role: userData.user.role,
      userName: userData.user.name,
      userEmail: userData.user.email
    };
    
    Object.entries(storage).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    setIsLoggedIn(true);
    setUserName(userData.user.name);
    setUserRole(userData.user.role);
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    
    setIsLoggedIn(false);
    setUserName(null);
    setUserRole(null);
  };

  // Vérifier l'état d'authentification au montage
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    isLoggedIn,
    userName,
    userRole,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};