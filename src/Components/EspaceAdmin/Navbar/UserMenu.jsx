import React, { useState } from 'react';
import { 
  FiChevronDown, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiMessageSquare
} from 'react-icons/fi';

const UserMenu = ({ isDarkMode }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Configuration des couleurs selon le mode
  const theme = {
    light: {
      text: 'text-gray-700',
      border: 'border-gray-200',
      bg: 'bg-white',
      icon: 'text-gray-600',
      textSecondary: 'text-gray-500'
    },
    dark: {
      text: 'text-gray-200',
      border: 'border-gray-700',
      bg: 'bg-[#1a202c]',
      icon: 'text-gray-300',
      textSecondary: 'text-gray-400'
    }
  };

  const colors = isDarkMode ? theme.dark : theme.light;

  // Configuration des items du menu
  const menuItems = [
    { icon: <FiUser />, label: 'Profile' },
    { icon: <FiLogOut />, label: 'Logout', isRed: true }
  ];

  return (
    <div className="relative">
      {/* Bouton déclencheur */}
   {/* Bouton déclencheur */}
<button
  onClick={() => setShowUserMenu(!showUserMenu)}
  className={`flex items-center gap-2 ${colors.text} focus:outline-none p-2 rounded-md ${colors.hover}`}
  aria-expanded={showUserMenu}
  aria-label="Menu utilisateur"
>
  <div className="relative">
    {/* Point vert en haut à droite */}
    <div className="absolute -top-0 -right-0 w-2 h-2 bg-green-500 rounded-full border-1 border-white dark:border-gray-800 shadow-sm"></div>
    
    {/* Image utilisateur */}
    <img
      src="/kamal.jpeg"
      alt="User Avatar"
      className="w-8 h-8 rounded-full border-2 border-gray-200"
    />
  </div>

  <span className={`text-sm font-medium hidden md:block`}>Kamal ELGOUJI</span>

  <FiChevronDown 
    size={16} 
    className={`transition-transform ${showUserMenu ? 'rotate-180' : ''} ${colors.icon}`} 
  />
</button>



      {showUserMenu && (
        <div 
          className={`absolute right-0 mt-2 w-56 ${colors.bg} border ${colors.border} rounded-lg shadow-lg z-20 overflow-hidden`}
          onBlur={() => setShowUserMenu(false)}
          tabIndex={0}
        >
          {/* En-tête du menu */}
          <div className={`p-3 border-b ${colors.border} flex items-center gap-3 ${colors.bgSecondary}`}>
           
            <img
              src="/kamal.jpeg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
           
            <div>
              <div className={`font-medium ${colors.text}`}>Kamal ELGOUJI</div>
              <div className={`text-xs ${colors.textSecondary}`}>Kamal@gmail.com</div>
            </div>
          </div>

          {/* Liste des options */}
          <ul className="py-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`w-full text-left px-3 py-2 flex items-center gap-3 ${colors.hover} transition-colors ${item.isRed ? 'text-red-500' : colors.text}`}
                >
                  <span className={colors.icon}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
