import ActionButtons from "./ActionsButtons";
import React, { useState } from "react";
import ProductDetails from "./ProductDetails";

const TableProducts = ({ Products, onEdit, onDelete, onToggleStock, loading = false, error = null }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  
  const getImageUrl = (logoPath) => {
    if (!logoPath) return null;
    
    if (logoPath.startsWith('http')) {
      return logoPath;
    }
    
    const API_BASE_URL = 'http://localhost:8000';
    return `${API_BASE_URL}/storage/${logoPath}`;
  };

  // Handler pour ouvrir les détails du produit
 const handleRowClick = (product, e) => {
    if (e.target.closest('button') || e.target.closest('.stock-toggle-container')) {
      return;
    }
    setSelectedProduct(product);
    setViewMode('detail'); // Passer en mode détail
  };

   const handleBackToTable = () => {
    setViewMode('table');
    setSelectedProduct(null);
  };
  if (viewMode === 'detail' && selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct} 
        onBack={handleBackToTable}
      />
    );
  }
  // Handler pour fermer les détails
  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  // Configuration des colonnes
  const columns = [
    { key: 'image', label: 'Image', width: 'w-20' },
    { key: 'product', label: 'Produit', width: 'w-48' },
    { key: 'price', label: 'Prix', width: 'w-28' },
    { key: 'category', label: 'Catégorie', width: 'w-32' },
    { key: 'specs', label: 'Spécifications', width: 'w-48' },
    { key: 'stock', label: 'Disponibilité', width: 'w-32' },
    { key: 'characteristics', label: 'Caractéristiques', width: 'w-40' },
    { key: 'actions', label: 'Actions', width: 'w-28' }
  ];

  // Fonction pour formater les caractéristiques
  const formatCaracteristiques = (caracteristiques) => {
    if (!caracteristiques) return <span className="text-gray-400 italic text-xs">Aucune</span>;
    
    const items = caracteristiques.split(',').map(item => item.trim()).filter(item => item);
    
    if (items.length === 0) return <span className="text-gray-400 italic text-xs">Aucune</span>;
    
    return (
      <div className="flex flex-wrap gap-1 max-w-[150px]">
        {items.slice(0, 5).map((item, index) => (
          <span 
            key={index}
            className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-[10px] px-2 py-1 rounded-full font-medium"
            title={item}
          >
            {item.length > 20 ? `${item.substring(0, 20)}...` : item}
          </span>
        ))}
        {items.length > 5 && (
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-full">
            +{items.length - 5}
          </span>
        )}
      </div>
    );
  };

  // Fonction pour formater le prix
  const formatPrice = (price, originalPrice) => {
    if (!price) return <span className="text-gray-400 text-xs">-</span>;
    
    return (
      <div className="space-y-1">
        {originalPrice && originalPrice !== price && (
          <div className="text-xs text-gray-400 line-through">
            {originalPrice} DH
          </div>
        )}
        <div className="text-sm font-bold text-gray-900 dark:text-white">
          {price} <span className="text-xs font-medium text-gray-500">DH</span>
        </div>
      </div>
    );
  };

  // Composant Toggle Switch pour la disponibilité
  const StockToggle = ({ product, onToggle }) => {
    const isInStock = product.in_stock === 'actif' || product.in_stock === 'active' || product.in_stock === 1 || product.in_stock === true;
    
    const handleToggle = (e) => {
      e.stopPropagation(); // Empêcher la propagation du clic
      if (onToggle) {
        onToggle(product.id, !isInStock);
      }
    };

    return (
      <div className="space-y-2 stock-toggle-container">
        {/* Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isInStock
                ? 'bg-green-500 focus:ring-green-500'
                : 'bg-gray-300 dark:bg-gray-600 focus:ring-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isInStock ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`ml-2 text-xs font-medium ${
            isInStock 
              ? 'text-green-800 dark:text-green-300' 
              : 'text-red-800 dark:text-red-300'
          }`}>
            {isInStock ? 'En stock' : 'Rupture'}
          </span>
        </div>

        {/* Statut visuel */}
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
          isInStock 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        }`}>
          <span className={`w-2 h-2 rounded-full mr-1.5 ${
            isInStock ? 'bg-green-400' : 'bg-red-400'
          }`}></span>
          {isInStock ? 'Disponible' : 'Indisponible'}
        </span>

        {/* Informations supplémentaires */}
        {product.disponibilite && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {product.disponibilite}
          </div>
        )}
        {product.garantie && (
          <div className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">
            🛡️ {product.garantie}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-900">
        <div className="flex justify-center items-center h-80">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full"></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-900 dark:text-gray-300 text-lg font-semibold">
                Chargement des produits...
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Veuillez patienter
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-red-200 dark:border-red-700">
        <div className="flex justify-center items-center h-80">
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
              <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 text-lg font-semibold">
                Erreur de chargement
              </p>
              <p className="text-red-500 dark:text-red-400 text-sm mt-1 max-w-md">
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-900">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-600 px-6 py-2 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Catalogue Produits
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Cliquez sur une ligne pour voir les détails</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Total: {Products?.length || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              height: 10px;
              width: 10px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f3f4f6;
              border-radius: 5px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(45deg, #1a202c, #ec4899);
              border-radius: 5px;
              border: 2px solid #f3f4f6;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(45deg, #1a202c, #db2777);
            }
            
            .dark .custom-scrollbar::-webkit-scrollbar-track {
              background: #374151;
            }
            
            .dark .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(45deg, #1a202c, #db2777);
              border-color: #374151;
            }
            
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #1a202c #f3f4f6;
            }
            
            .dark .custom-scrollbar {
              scrollbar-color: #1a202c #374151;
            }

            .table-row:nth-child(even) {
              background-color: #fafafa;
            }
            
            .dark .table-row:nth-child(even) {
              background-color: #1f2937;
            }
            
            .table-row {
              cursor: pointer;
              transition: all 0.2s ease;
            }
            
            .table-row:hover {
              background-color: #f3f4f6 !important;
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            
            .dark .table-row:hover {
              background-color: #111927ff !important;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }

            .product-image {
              transition: transform 0.2s ease;
            }
            
            .product-image:hover {
              transform: scale(1.1);
            }
          `}</style>

          <table className="min-w-full divide-y divide-gray-700 dark:divide-gray-900">
            {/* En-tête du tableau */}
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {columns.map((column) => (
                  <th 
                    key={column.key}
                    scope="col" 
                    className={`
                      px-6 py-2 text-left text-xs font-bold text-gray-900 dark:text-gray-200 
                      uppercase tracking-wider border-b-2 border-gray-300 dark:border-gray-600
                      bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800
                      ${column.width}
                    `}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.key === 'image' && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {column.key === 'actions' && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-[#1a202c] divide-y divide-gray-200 dark:divide-gray-900">
              {Products && Products.length > 0 ? (
                Products.map((product) => {
                  const imageUrl = getImageUrl(product.image_url);
                  return (
                    <tr 
                      key={product.id} 
                      className="table-row"
                      onClick={(e) => handleRowClick(product, e)}
                      title="Cliquer pour voir les détails"
                    >
                      {/* Image */}
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {imageUrl ? (
                            <img
                              className="h-12 w-12 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-600 product-image shadow-sm"
                              src={imageUrl}
                              alt={`${product.nom}`}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-600 dark:to-gray-900 flex items-center justify-center border-2 border-gray-200 dark:border-gray-600"
                            style={{ display: imageUrl ? 'none' : 'flex' }}
                          >
                            <span className="text-gray-600 dark:text-gray-300 text-sm font-bold">
                              {product.nom?.charAt(0)?.toUpperCase() || '?'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Informations produit */}
                      <td className="px-6 py-2">
                        <div className="space-y-2">
                          <div className="text-sm font-bold text-gray-900 dark:text-white" title={product.nom}>
                            {product.nom}
                          </div>
                          {product.marque && (
                            <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                              Marque: {product.marque}
                            </div>
                          )}
                          {product.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400" title={product.description}>
                              {product.description.length > 50 ? 
                                `${product.description.substring(0, 50)}...` : 
                                product.description
                              }
                            </div>
                          )}
                        </div>
                      </td>
                      
                      {/* Prix */}
                      <td className="px-6 py-2 whitespace-nowrap">
                        {formatPrice(product.prix, product.prix_original)}
                      </td>

                      {/* Catégorie */}
                      <td className="px-6 py-2">
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {product.categorie || 'N/A'}
                          </div>
                          {product.sous_categorie && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                              {product.sous_categorie}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Spécifications techniques */}
                      <td className="px-6 py-2">
                        <div className="space-y-2 text-xs">
                          {product.processeur && (
                            <div className="flex items-center text-gray-900 dark:text-gray-300">
                              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-[10px] mr-2 font-medium">CPU</span>
                              <span className="truncate max-w-[100px]" title={product.processeur}>
                                {product.processeur.length > 30 ? `${product.processeur.substring(0, 30)}...` : product.processeur}
                              </span>
                            </div>
                          )}
                          {product.ram && (
                            <div className="flex items-center text-gray-900 dark:text-gray-300">
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded text-[10px] mr-2 font-medium">RAM</span>
                              <span>{product.ram}</span>
                            </div>
                          )}
                          {product.stockage && (
                            <div className="flex items-center text-gray-900 dark:text-gray-300">
                              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-1 rounded text-[10px] mr-2 font-medium">STO</span>
                              <span>{product.stockage}</span>
                            </div>
                          )}
                          {product.carte_graphique && (
                            <div className="flex items-center text-gray-900 dark:text-gray-300">
                              <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-2 py-1 rounded text-[10px] mr-2 font-medium">GPU</span>
                              <span className="truncate max-w-[100px]" title={product.carte_graphique}>
                                {product.carte_graphique.length > 30 ? `${product.carte_graphique.substring(0, 30)}...` : product.carte_graphique}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-2">
                        <StockToggle 
                          product={product} 
                          onToggle={onToggleStock}
                        />
                      </td>
                      
                      <td className="px-6 py-2">
                        {formatCaracteristiques(product.caracteristique_principale)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-2 whitespace-nowrap text-right">
                        <ActionButtons
                          Products={product}  
                          onEdit={onEdit}
                          onDelete={() => onDelete(product)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="table-row">
                  <td 
                    colSpan={columns.length} 
                    className="px-6 py-20 text-center bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-gray-200 dark:bg-gray-900 p-6 rounded-full">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                          Aucun produit trouvé
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                          Commencez par ajouter votre premier produit au catalogue
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de détails du produit */}
     
    </>
  );
};

export default TableProducts;