import ActionButtons from "./ActionsButtons";
import React from "react";

const TableMarque = ({ Marque, onEdit, onDelete }) => {
  
  // Fonction pour construire l'URL de l'image
  const getImageUrl = (logoPath) => {
    if (!logoPath) return null;
    
    // Si l'URL est déjà complète (commence par http)
    if (logoPath.startsWith('http')) {
      return logoPath;
    }
    
    // Si c'est juste le chemin, construire l'URL complète
    const API_BASE_URL = 'http://localhost:8000';
    return `${API_BASE_URL}/storage/${logoPath}`;
  };

  return (
    <div className="bg-white dark:bg-[#1a202c] shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Liste des Marques
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Logo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Site Web
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#1a202c] divide-y divide-gray-200 dark:divide-gray-800">
            {Marque.map((marque) => {
              const imageUrl = getImageUrl(marque.logo);
              
              return (
                <tr key={marque.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  {/* Logo */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {imageUrl ? (
                        <img
                          className="h-10 w-10 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                          src={imageUrl}
                          alt={`Logo ${marque.nom}`}
                          onError={(e) => {
                            console.error('Erreur chargement image:', imageUrl);
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center"
                        style={{ display: imageUrl ? 'none' : 'flex' }}
                      >
                        <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                          {marque.nom?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Nom */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {marque.nom}
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                      {marque.description ? (
                        <div className="truncate" title={marque.description}>
                          {marque.description.length > 50 
                            ? `${marque.description.substring(0, 50)}...` 
                            : marque.description}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Aucune description</span>
                      )}
                    </div>
                  </td>

                  {/* Site Web */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    {marque.site ? (
                      <a
                        href={marque.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm underline"
                      >
                        {marque.site.length > 30 
                          ? `${marque.site.substring(0, 30)}...` 
                          : marque.site}
                      </a>
                    ) : (
                      <span className="text-gray-400 italic text-sm">Aucun site</span>
                    )}
                  </td>

                  {/* Statut */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      marque.status === 'active' || marque.status === 'actif'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {marque.status === 'active' || marque.status === 'actif' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <ActionButtons
                      onEdit={() => onEdit(marque)}
                      onDelete={() => onDelete(marque)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {Marque.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">Aucune marque trouvée</p>
            <p className="text-sm">Commencez par ajouter votre première marque</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableMarque;