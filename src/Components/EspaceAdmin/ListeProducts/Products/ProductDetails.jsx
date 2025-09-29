import React from 'react';

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full my-8 relative animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Détails du Produit
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-8 flex items-center justify-center min-h-[400px]">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.nom}
                    className="max-h-96 w-auto object-contain rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="w-64 h-64 rounded-xl bg-gradient-to-br from-purple-200 to-pink-200 dark:from-gray-600 dark:to-gray-800 flex items-center justify-center"
                  style={{ display: imageUrl ? 'none' : 'flex' }}
                >
                  <span className="text-6xl font-bold text-gray-600 dark:text-gray-300">
                    {product.nom?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
              </div>

              {/* Stock Status */}
              <div className={`p-4 rounded-xl ${isInStock ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-3 ${isInStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`font-semibold ${isInStock ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                      {isInStock ? 'En Stock' : 'Rupture de Stock'}
                    </span>
                  </div>
                  {product.disponibilite && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.disponibilite}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.nom}
                </h3>
                {product.marque && (
                  <div className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {product.marque}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 p-6 rounded-xl">
                {product.prix_original && product.prix_original !== product.prix && (
                  <div className="text-lg text-gray-500 line-through mb-2">
                    {product.prix_original} DH
                  </div>
                )}
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {product.prix} <span className="text-2xl">DH</span>
                </div>
                {product.prix_original && product.prix_original !== product.prix && (
                  <div className="mt-2 inline-block bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                    Économisez {product.prix_original - product.prix} DH
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    Description
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Category */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Catégorie</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium">
                    {product.categorie || 'Non spécifié'}
                  </span>
                  {product.sous_categorie && (
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-lg text-sm font-medium">
                      {product.sous_categorie}
                    </span>
                  )}
                </div>
              </div>

              {/* Warranty */}
              {product.garantie && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center text-indigo-700 dark:text-indigo-300">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-semibold">Garantie: {product.garantie}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Technical Specifications */}
          {(product.processeur || product.ram || product.stockage || product.carte_graphique) && (
            <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Spécifications Techniques
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.processeur && (
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-start">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-lg text-sm font-bold mr-3">CPU</span>
                      <span className="text-gray-900 dark:text-gray-300 text-sm flex-1">{product.processeur}</span>
                    </div>
                  </div>
                )}
                {product.ram && (
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-start">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-lg text-sm font-bold mr-3">RAM</span>
                      <span className="text-gray-900 dark:text-gray-300 text-sm flex-1">{product.ram}</span>
                    </div>
                  </div>
                )}
                {product.stockage && (
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-start">
                      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-lg text-sm font-bold mr-3">STOCKAGE</span>
                      <span className="text-gray-900 dark:text-gray-300 text-sm flex-1">{product.stockage}</span>
                    </div>
                  </div>
                )}
                {product.carte_graphique && (
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-start">
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-3 py-1 rounded-lg text-sm font-bold mr-3">GPU</span>
                      <span className="text-gray-900 dark:text-gray-300 text-sm flex-1">{product.carte_graphique}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Characteristics */}
          {caracteristiques.length > 0 && (
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Caractéristiques Principales
              </h4>
              <div className="flex flex-wrap gap-2">
                {caracteristiques.map((item, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium border border-purple-200 dark:border-purple-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-b-2xl border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Fermer
          </button>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #1a202c, #ec4899);
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, #1a202c, #db2777);
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProductDetails;