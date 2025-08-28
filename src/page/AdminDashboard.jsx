import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

 // Ajustez le chemin selon votre structure

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: ''
  });
  
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Vérification d'authentification
    if (!token || role !== "admin") {
      navigate("/compte"); 
      return;
    }

    // Récupération des informations utilisateur
    const userName = localStorage.getItem("userName") || "Admin";
    const userEmail = localStorage.getItem("userEmail") || "admin@example.com";
    
    setUserInfo({
      name: userName,
      email: userEmail,
      role: role
    });

    // Récupération du thème
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
    
    // Application du thème
    if (savedTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [navigate, role, token]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header/Navbar */}
     

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Carte de bienvenue */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white font-semibold text-lg flex items-center justify-center">
                    {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Bienvenue, {userInfo.name} !
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Vous êtes connecté en tant qu'administrateur
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Utilisateurs', value: '1,234', icon: '👥' },
              { title: 'Commandes', value: '567', icon: '📦' },
              { title: 'Produits', value: '89', icon: '🛍️' },
              { title: 'Revenus', value: '€12,345', icon: '💰' }
            ].map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{stat.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section principale */}
          <div className="mt-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Tableau de bord
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ici vous pouvez gérer votre application, voir les statistiques et administrer les utilisateurs.
              </p>
              
              {/* Boutons d'actions */}
              <div className="mt-6 flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                  Gérer les utilisateurs
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
                  Voir les commandes
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
                  Gérer les produits
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;