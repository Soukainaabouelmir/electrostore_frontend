import ActionButtons from "./ActionsButtons";
import React from "react";

const TablePopup = ({ Popup, onEdit, onDelete }) => {
  
  const getImageUrl = (logoPath) => {
    if (!logoPath) return null;
    
    if (logoPath.startsWith('http')) {
      return logoPath;
    }
    
    const API_BASE_URL = 'http://localhost:8000';
    return `${API_BASE_URL}/storage/${logoPath}`;
  };

  return (
    <div className="bg-white dark:bg-[#1a202c] shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Liste des Popups
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
               Lien              </th>
               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Délai
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Active
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#1a202c] divide-y divide-gray-200 dark:divide-gray-800">
            {Popup.map((Popup) => {
              const imageUrl = getImageUrl(Popup.image);
              return (
                <tr key={Popup.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {imageUrl ? (
                        <img
                          className="h-10 w-10 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                          src={imageUrl}
                          alt={`Logo ${Popup.titre}`}
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
                          {Popup.titre?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {Popup.titre}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                      {Popup.description ? (
                        <div className="truncate" title={Popup.description}>
                          {Popup.description.length > 50 
                            ? `${Popup.description.substring(0, 50)}...` 
                            : Popup.description}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Aucune description</span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {Popup.lien ? (
                      <a
                        href={Popup.lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm underline"
                      >
                        {Popup.lien.length > 30 
                          ? `${Popup.lien.substring(0, 30)}...` 
                          : Popup.lien}
                      </a>
                    ) : (
                      <span className="text-gray-400 italic text-sm">Aucun lien</span>
                    )}
                  </td>
<td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {Popup.delai}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      Popup.is_active === 'active' || Popup.is_active === 'actif'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {Popup.is_active === 'active' || Popup.is_active === 'actif' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <ActionButtons
                      Popup={Popup}  
                      onEdit={onEdit}
                      onDelete={() => onDelete(Popup)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {Popup.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">Aucune Popup trouvée</p>
            <p className="text-sm">Commencez par ajouter votre première Popup</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePopup;