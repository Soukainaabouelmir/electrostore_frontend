import React, { useState } from 'react';

const ProductDetails = ({ product, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [imageLoaded, setImageLoaded] = useState(false);

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
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'specs', label: 'Spécifications techniques' },
    { id: 'features', label: 'Caractéristiques' },
  ];

  const renderPriceSection = () => {
    const hasDiscount = product.prix_original && product.prix_original !== product.prix;
    const discountAmount = hasDiscount ? product.prix_original - product.prix : 0;
    const discountPercentage = hasDiscount ? Math.round((discountAmount / product.prix_original) * 100) : 0;

    return (
      <div className="space-y-3">
        <div className="flex items-baseline gap-3">
          {hasDiscount && (
            <span className="text-xl text-gray-400 line-through font-light">
              {product.prix_original} DH
            </span>
          )}
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {product.prix} <span className="text-xl">DH</span>
          </span>
        </div>
        {hasDiscount && (
          <div className="flex items-center gap-2">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
              Économie de {discountAmount} DH
            </span>
            <span className="text-green-600 dark:text-green-400 text-sm font-medium">
              -{discountPercentage}%
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderSpecItem = (label, value) => (
    value && (
      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>
        <span className="text-gray-900 dark:text-white font-semibold text-right">{value}</span>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Retour au catalogue</span>
            </button>
            
            <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">Catalogue</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 dark:text-white">{product.categorie}</span>
              {product.sous_categorie && (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-900 dark:text-white">{product.sous_categorie}</span>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 aspect-square flex items-center justify-center">
              {imageUrl ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-red-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={imageUrl}
                    alt={product.nom}
                    className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <span className="text-6xl font-bold text-gray-300 dark:text-gray-600">
                    {product.nom?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
              )}
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${
                isInStock 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className={`font-semibold text-sm ${isInStock ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                      {isInStock ? 'Disponible' : 'Rupture de stock'}
                    </p>
                    {product.disponibilite && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{product.disponibilite}</p>
                    )}
                  </div>
                </div>
              </div>

              {product.garantie && (
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-sm text-blue-800 dark:text-blue-300">Garantie</p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">{product.garantie}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
           
                {product.marque && (
                  <div className="inline-flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {product.marque}
                  </div>
                )}
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {product.nom}
              </h1>
              
              {product.description && (
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            <div className="py-6 border-y border-gray-200 dark:border-gray-800">
              {renderPriceSection()}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Catégorie</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{product.categorie || 'Non spécifié'}</div>
                      </div>
                      {product.sous_categorie && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sous-catégorie</div>
                          <div className="font-semibold text-gray-900 dark:text-white">{product.sous_categorie}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    {renderSpecItem('Processeur', product.processeur)}
                    {renderSpecItem('Mémoire RAM', product.ram)}
                    {renderSpecItem('Stockage', product.stockage)}
                    {renderSpecItem('Carte Graphique', product.carte_graphique)}
                    
                    {!product.processeur && !product.ram && !product.stockage && !product.carte_graphique && (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        Aucune spécification technique disponible
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-3">
                    {caracteristiques.length > 0 ? (
                      caracteristiques.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 py-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        Aucune caractéristique disponible
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Description */}
            {product.description_detail && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Description détaillée
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {product.description_detail}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;