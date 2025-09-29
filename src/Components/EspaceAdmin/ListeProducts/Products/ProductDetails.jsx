import React, { useState } from 'react';

// Composant ProductDetails - Page complète
const ProductDetails = ({ product, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getImageUrl = (logoPath) => {
    if (!logoPath) return null;
    if (logoPath.startsWith('http')) return logoPath;
    const API_BASE_URL = 'http://localhost:8000';
    return `${API_BASE_URL}/storage/${logoPath}`;
  };

  const imageUrl = getImageUrl(product.image_url);
  const isInStock = product.in_stock === 'actif' || product.in_stock === 'active' || product.in_stock === 1 || product.in_stock === true;

  const formatCaracteristiques = (caracteristiques) => {
    if (!caracteristiques) return [];
    return caracteristiques.split(',').map(item => item.trim()).filter(item => item);
  };

  const caracteristiques = formatCaracteristiques(product.caracteristique_principale);

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z' },
    { id: 'specs', label: 'Spécifications', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
    { id: 'features', label: 'Caractéristiques', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header avec breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
              >
                <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-semibold">Retour au catalogue</span>
              </button>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>{product.categorie}</span>
                {product.sous_categorie && (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>{product.sous_categorie}</span>
                  </>
                )}
              </div>
            </div>
           
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.nom}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center">
                    <span className="text-8xl font-bold text-gray-300 dark:text-gray-600">
                      {product.nom?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl ${isInStock ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${isInStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className={`font-semibold text-sm ${isInStock ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                    {isInStock ? 'En Stock' : 'Rupture de Stock'}
                  </span>
                </div>
                {product.disponibilite && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{product.disponibilite}</p>
                )}
              </div>
              {product.garantie && (
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-semibold text-sm text-blue-800 dark:text-blue-300">
                      {product.garantie}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* En-tête produit */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                {product.marque && (
                  <div className="inline-flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {product.marque}
                  </div>
                )}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {product.nom}
                </h1>
                {product.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Prix */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-baseline space-x-4">
                  {product.prix_original && product.prix_original !== product.prix && (
                    <span className="text-2xl text-gray-400 line-through">
                      {product.prix_original} DH
                    </span>
                  )}
                  <span className="text-5xl font-bold text-red-600 dark:text-red-500">
                    {product.prix} <span className="text-2xl">DH</span>
                  </span>
                </div>
                {product.prix_original && product.prix_original !== product.prix && (
                  <div className="mt-3 inline-block bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                    Économisez {product.prix_original - product.prix} DH ({Math.round(((product.prix_original - product.prix) / product.prix_original) * 100)}%)
                  </div>
                )}
              </div>
            </div>

            {/* Onglets */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* En-têtes des onglets */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                      </svg>
                      <span>{tab.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Contenu des onglets */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Catégorie</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{product.categorie || 'N/A'}</div>
                      </div>
                      {product.sous_categorie && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Sous-catégorie</div>
                          <div className="font-semibold text-gray-900 dark:text-white">{product.sous_categorie}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-3">
                    {product.processeur && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Processeur</span>
                        <span className="text-gray-900 dark:text-white font-semibold text-right">{product.processeur}</span>
                      </div>
                    )}
                    {product.ram && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Mémoire RAM</span>
                        <span className="text-gray-900 dark:text-white font-semibold">{product.ram}</span>
                      </div>
                    )}
                    {product.stockage && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Stockage</span>
                        <span className="text-gray-900 dark:text-white font-semibold">{product.stockage}</span>
                      </div>
                    )}
                    {product.carte_graphique && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Carte Graphique</span>
                        <span className="text-gray-900 dark:text-white font-semibold text-right">{product.carte_graphique}</span>
                      </div>
                    )}
                    {!product.processeur && !product.ram && !product.stockage && !product.carte_graphique && (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-8">Aucune spécification technique disponible</p>
                    )}
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-3">
                    {caracteristiques.length > 0 ? (
                      caracteristiques.map((item, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-900 dark:text-white">{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-8">Aucune caractéristique disponible</p>
                    )}
                  </div>
                )}
              </div>
            </div>
               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                
                <h6 className=" font-bold text-gray-900 dark:text-white">
                Description détaillé
                </h6>
                {product.description_detail && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {product.description_detail}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;