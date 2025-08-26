import React, { useState } from 'react';
import { FiBell, FiCheck, FiChevronRight, FiX } from 'react-icons/fi';
import { RiNotificationLine } from 'react-icons/ri';

const NotificationDropdown = ({ isDarkMode, notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications);
  const [notificationItems, setNotificationItems] = useState([
    {
      id: 1,
      title: "Nouveau message",
      content: "Vous avez reçu un message de l'équipe support concernant votre demande #4582",
      time: "10 min",
      read: false,
      icon: <RiNotificationLine className="text-blue-500" />,
      type: "message"
    },
    {
      id: 2,
      title: "Mise à jour disponible",
      content: "Version 2.3.1 - Corrections de bugs et améliorations des performances",
      time: "1 heure",
      read: false,
      icon: <RiNotificationLine className="text-green-500" />,
      type: "system"
    },
    {
      id: 3,
      title: "Tâche complétée",
      content: "Le rapport financier Q3 a été validé par le comité de direction",
      time: "2 jours",
      read: true,
      icon: <RiNotificationLine className="text-purple-500" />,
      type: "task"
    },
    {
      id: 4,
      title: "Rappel de réunion",
      content: "Revue de projet à 10h00 en salle B. Pensez à préparer votre présentation",
      time: "5 jours",
      read: true,
      icon: <RiNotificationLine className="text-yellow-500" />,
      type: "event"
    }
  ]);

  // Styles dynamiques
  const styles = {
    container: isDarkMode 
      ? 'bg-gray-800 text-gray-100 border-gray-700' 
      : 'bg-white text-gray-800 border-gray-200',
    notificationItem: isDarkMode 
      ? 'hover:bg-gray-700' 
      : 'hover:bg-gray-50',
    unreadNotification: isDarkMode 
      ? 'bg-blue-900 bg-opacity-20' 
      : 'bg-blue-50',
    textSecondary: isDarkMode 
      ? 'text-gray-300' 
      : 'text-gray-600',
    textTertiary: isDarkMode 
      ? 'text-gray-400' 
      : 'text-gray-500',
    button: isDarkMode 
      ? 'text-blue-400 hover:text-blue-300' 
      : 'text-blue-600 hover:text-blue-800',
    divider: isDarkMode 
      ? 'border-gray-700' 
      : 'border-gray-200',
    closeButton: isDarkMode 
      ? 'hover:bg-gray-700 text-gray-300' 
      : 'hover:bg-gray-100 text-gray-500'
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id) => {
    const updatedItems = notificationItems.map(item => 
      item.id === id ? { ...item, read: true } : item
    );
    setNotificationItems(updatedItems);
    setUnreadCount(updatedItems.filter(item => !item.read).length);
  };

  const markAllAsRead = () => {
    const updatedItems = notificationItems.map(item => ({ ...item, read: true }));
    setNotificationItems(updatedItems);
    setUnreadCount(0);
  };

  return (
    <div className="relative " >
      {/* Bouton de notification */}
      <button 
        onClick={toggleNotifications}
        className={`p-2 rounded-full relative focus:outline-none transition-colors ${
          isDarkMode 
            ? 'hover: text-gray-300' 
            : 'hover: text-gray-600'
        }`}
        aria-label="Notifications"
      >
        <FiBell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-4 w-4 flex items-center justify-center rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown des notifications */}
      {showNotifications && (
        <div className={`absolute right-0 mt-1 w-72 rounded-md shadow-lg  ${styles.container} z-50 transform transition-all duration-150 ease-out`}>
          {/* En-tête */}
          <div className={`px-3 py-2 border-b ${styles.divider} flex justify-between items-center`}>
            <div className="flex items-center">
              <h3 className="text-sm font-semibold mt-1">NOTIFICATIONS</h3>
             
            </div>
            <div className="flex items-center space-x-2">
              
              <button 
                onClick={toggleNotifications}
                className={`p-1 mt-0 rounded-full ${styles.closeButton}`}
              >
                <FiX size={15} />
              </button>
            </div>
          </div>
          
          {/* Liste des notifications */}
          <div className="max-h-80 overflow-y-auto overflow-y-auto scrollbar-hidden">
            {notificationItems.length > 0 ? (
              notificationItems.map((item) => (
                <div 
                  key={item.id}
                  className={`px-3 py-2 transition-colors duration-100 ${
                    styles.notificationItem
                  } ${
                    !item.read ? styles.unreadNotification : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className="mr-2 mt-0.5">
                      <div className={`p-1.5 rounded-full ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-sm font-medium truncate">{item.title}</h4>
                        <span className={`text-xs ml-2 whitespace-nowrap ${styles.textTertiary}`}>{item.time}</span>
                      </div>
                      <p className={`mt-1 text-xs ${styles.textSecondary} line-clamp-2`}>
                        {item.content}
                      </p>
                      {!item.read && (
                        <div className="mt-1 flex justify-end">
                          <button 
                            onClick={() => markAsRead(item.id)}
                            className={`text-xs px-2 py-0.5 rounded flex items-center ${
                              isDarkMode 
                                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            } transition-colors`}
                          >
                            <FiCheck size={12} className="mr-1" /> Marquer lu
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-5 text-center">
                <RiNotificationLine className={`mx-auto text-2xl ${styles.textTertiary} mb-2`} />
                <p className={styles.textTertiary}>Aucune notification</p>
              </div>
            )}
          </div>
          
          {/* Pied de page */}
          <div className={`px-3 py-2 border-t ${styles.divider} text-center`}>
            <button 
              className={`text-xs font-medium flex items-center justify-center w-full ${styles.button}`}
            >
              Voir l'historique complet <FiChevronRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;