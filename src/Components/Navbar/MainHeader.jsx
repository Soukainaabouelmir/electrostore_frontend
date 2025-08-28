import React, { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiSun, FiMoon, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import CartSidebar from "../Panier/CartSidebar";
import { useCart } from "../Panier/CartContext ";

const MainHeader = () => {
  const navigate = useNavigate();
  
  // Fonction pour récupérer la préférence de thème depuis les cookies
  const getInitialTheme = () => {
    try {
      // Essaie de récupérer depuis les cookies
      const cookies = document.cookie.split(';');
      const themeCookie = cookies.find(cookie => cookie.trim().startsWith('darkMode='));
      if (themeCookie) {
        return themeCookie.split('=')[1] === 'true';
      }
      
      // Si pas de cookie, utilise la préférence système
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      // Fallback en cas d'erreur
      return false;
    }
  };

  const goToCompte = () => {
    navigate('/compte');
  }

  // État initial basé sur la préférence sauvegardée ou système
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getTotalItems } = useCart();

  // Vérifier si l'utilisateur est connecté et récupérer son nom
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");
    
    if (token && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    } else {
      setIsLoggedIn(false);
      setUserName(null);
    }
  }, []);

  // Fonction pour sauvegarder la préférence dans les cookies
  const saveDarkModePreference = (isDark) => {
    try {
      // Sauvegarde dans les cookies avec une expiration de 365 jours
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      document.cookie = `darkMode=${isDark}; expires=${expirationDate.toUTCString()}; path=/`;
    } catch (error) {
      console.log('Impossible de sauvegarder la préférence de thème');
    }
  };

  // Effet pour appliquer les classes de thème et sauvegarder la préférence
  useEffect(() => {
    // Applique le thème au document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Sauvegarde la préférence
    saveDarkModePreference(darkMode);
  }, [darkMode]);

  // Effet pour écouter les changements de préférence système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Ne change que si aucune préférence utilisateur n'est déjà définie
      const cookies = document.cookie.split(';');
      const hasUserPreference = cookies.some(cookie => cookie.trim().startsWith('darkMode='));
      
      if (!hasUserPreference) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName(null);
    navigate('/');
  };

  return (
    <>
      <div className="bg-white dark:bg-[#141414] py-4 px-4 lg:px-6 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer" onClick={() => navigate('/')}>
            {/* <div className="relative">
              <span className="text-3xl font-bold text-blue-900 dark:text-blue-400 transition-all duration-300 group-hover:scale-110">PC</span>
              <span className="text-3xl font-bold text-orange-500 dark:text-orange-400 transition-all duration-300 group-hover:scale-110">Shop</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-900 to-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </div> */}
            <img src='/ekgamerlogo.png' />
          </div>
          
          {/* Barre de recherche */}
          <div className="relative flex-1 max-w-2xl w-full lg:mx-8">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <input
                type="text"
                placeholder="Rechercher un PC, composant, périphérique..."
                className="w-full py-3 px-5 pr-12 rounded-full border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 dark:bg-gray-800 dark:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-300">
                <FiSearch className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" size={20} />
              </button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Bouton Dark/Light Mode */}
            <button 
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-sm"
              aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
              title={darkMode ? "Mode clair" : "Mode sombre"}
            >
              {darkMode ? (
                <FiSun className="text-xl text-yellow-500" />
              ) : (
                <FiMoon className="text-xl text-gray-700" />
              )}
            </button>
            
            {/* Section Authentification/Utilisateur */}
            <div className="flex items-center">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2 relative group">
                  {/* Nom de l'utilisateur */}
                  <span className="text-gray-700 dark:text-gray-300 font-medium hidden sm:block">
                    Bonjour, {userName}
                  </span>
                  
                  {/* Bouton utilisateur avec menu déroulant */}
                  <div className="relative">
                    <button 
                      className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-sm"
                      aria-label="Menu utilisateur"
                      title="Mon compte"
                      onClick={goToCompte}
                    >
                      <FiUser className="text-xl text-gray-700 dark:text-orange-300" />
                    </button>
                    
                    {/* Menu déroulant (optionnel) */}
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <button
                        onClick={goToCompte}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                      >
                        Mon compte
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-sm"
                  aria-label="Se connecter"
                  title="Se connecter"
                  onClick={goToCompte}
                >
                  <FiUser className="text-xl text-gray-700 dark:text-orange-300" />
                </button>
              )}
            </div>
            
            {/* Panier */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-full bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800 transition-all duration-300 transform hover:scale-110 shadow-sm group"
              aria-label={`Panier (${getTotalItems()} articles)`}
              title="Mon panier"
            >
              <FiShoppingCart className="text-xl text-orange-600 dark:text-orange-400 group-hover:animate-bounce" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {getTotalItems() > 9 ? '9+' : getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default MainHeader;