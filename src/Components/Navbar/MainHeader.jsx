import React, { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiSun, FiMoon, FiUser } from "react-icons/fi";


import CartSidebar from "../Panier/CartSidebar";
import { useCart } from "../Panier/CartContext ";

const MainHeader = () => {
  // État initial basé sur une valeur par défaut (pas localStorage)
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  // Effet pour appliquer les classes de thème
  useEffect(() => {
    // Applique le thème au document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <div className="bg-white dark:bg-[#141414] py-4 px-4 lg:px-6 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <span className="text-3xl font-bold text-blue-900 dark:text-blue-400 transition-all duration-300 group-hover:scale-110">PC</span>
              <span className="text-3xl font-bold text-orange-500 dark:text-orange-400 transition-all duration-300 group-hover:scale-110">Shop</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-900 to-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
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
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-sm"
              aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              {darkMode ? (
                <FiSun className="text-xl text-yellow-500" />
              ) : (
                <FiMoon className="text-xl text-gray-700" />
              )}
            </button>
            {/* auth*/  }
             <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-sm"
            
            >
             
                <FiUser className="text-xl text-gray-500" />
          
             
            </button>
            {/* Panier */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-full bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800 transition-all duration-300 transform hover:scale-110 shadow-sm group">
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