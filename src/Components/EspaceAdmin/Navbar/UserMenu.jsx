import React, { useState, useEffect } from 'react';
import { 
  FiChevronDown, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiMessageSquare
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ isDarkMode }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("userName") || "Utilisateur";
    const userEmail = localStorage.getItem("userEmail") || "email@example.com";
    const userRole = localStorage.getItem("role") || "user";
    
    setUserInfo({
      name: userName,
      email: userEmail,
      role: userRole
    });
  }, []);

  const theme = {
    light: {
      text: 'text-gray-700',
      border: 'border-gray-200',
      bg: 'bg-white',
      bgSecondary: 'bg-gray-50',
      hover: 'hover:bg-gray-100',
      icon: 'text-gray-600',
      textSecondary: 'text-gray-500'
    },
    dark: {
      text: 'text-gray-200',
      border: 'border-gray-700',
      bg: 'bg-[#1a202c]',
      bgSecondary: 'bg-gray-800',
      hover: 'hover:bg-gray-700',
      icon: 'text-gray-300',
      textSecondary: 'text-gray-400'
    }
  };

  const colors = isDarkMode ? theme.dark : theme.light;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    
    navigate("/compte");
    setShowUserMenu(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setShowUserMenu(false);
  };

  const menuItems = [
    { 
      icon: <FiUser />, 
      label: 'Mon Profil', 
      onClick: handleProfile 
    },
    { 
      icon: <FiSettings />, 
      label: 'Paramètres', 
      onClick: () => {
        console.log('Paramètres');
        setShowUserMenu(false);
      }
    },
    { 
      icon: <FiLogOut />, 
      label: 'Se déconnecter', 
      isRed: true, 
      onClick: handleLogout 
    }
  ];

  const getInitials = (name) => {
    return name.split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className={`flex items-center gap-2 ${colors.text} focus:outline-none p-2 rounded-md ${colors.hover} transition-colors`}
        aria-expanded={showUserMenu}
        aria-label="Menu utilisateur"
      >
        <div className="relative">
        
          <div className="absolute -top-0 -right-0 w-2 h-2 bg-green-500 rounded-full border-1 border-white dark:border-gray-800 shadow-sm"></div>
          
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center bg-red-600 text-white font-semibold text-sm">
            {userInfo.name ? getInitials(userInfo.name) : 'U'}
          </div>
        </div> 

        <span className={`text-sm font-medium hidden md:block`}>
          {userInfo.name || 'Utilisateur'}
        </span>

        <FiChevronDown 
          size={16} 
          className={`transition-transform ${showUserMenu ? 'rotate-180' : ''} ${colors.icon}`} 
        />
      </button>

      {showUserMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowUserMenu(false)}>

            </div>
          
          <div 
            className={`absolute right-0 mt-2 w-64 ${colors.bg} border ${colors.border} rounded-lg shadow-lg z-20 overflow-hidden`} >
            <div className={`p-4 border-b ${colors.border} ${colors.bgSecondary}`}>
              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-red-600 text-white font-semibold text-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-600">
                  {userInfo.name ? getInitials(userInfo.name) : 'U'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`font-semibold ${colors.text} truncate`}>
                    {userInfo.name || 'Utilisateur'}
                  </div>
                  <div className={`text-sm ${colors.textSecondary} truncate`}>
                    {userInfo.email || 'email@example.com'}
                  </div>
                  {userInfo.role && (
                    <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                      userInfo.role === 'admin' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {userInfo.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="py-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 ${colors.hover} transition-colors ${
                    item.isRed 
                      ? 'text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300' 
                      : colors.text
                  }`}
                >
                  <span className={item.isRed ? 'text-red-500 dark:text-red-400' : colors.icon}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
