import React from 'react';
import { FiMonitor, FiCpu, FiHardDrive, FiZap } from 'react-icons/fi';
import { useCart } from '../../Panier/CartContext ';


const PcPortableCard = ({ product,onViewDetails  }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    // Animation de confirmation
    const button = document.getElementById(`add-btn-${product.id}`);
    if (button) {
      button.innerHTML = '✓ Ajouté !';
      button.style.background = 'linear-gradient(to right, #10b981, #059669)';
      setTimeout(() => {
        button.innerHTML = 'Ajouter au panier';
        button.style.background = 'linear-gradient(to right, #2563eb, #9333ea)';
      }, 1500);
    }
  };
   const handleViewDetails = () => {
  if (onViewDetails) {
    onViewDetails(product);
  }
};


  // Calcul du pourcentage de réduction si les prix sont disponibles
  const discountPercent = product.original_price ? 
    Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;

  
  // Icône selon le type de PC ou composant
  const getProductIcon = () => {
    const name = product.name.toLowerCase();
    if (name.includes('gaming') || name.includes('gamer')) return FiMonitor;
    if (name.includes('processeur') || name.includes('cpu')) return FiCpu;
    if (name.includes('ssd') || name.includes('disque')) return FiHardDrive;
    return FiZap; // Icône par défaut pour PC gaming
  };

  const ProductIcon = getProductIcon();

  // Extraction des caractéristiques depuis la description ou création d'exemples
  const getFeatures = () => {
    if (product.features && Array.isArray(product.features)) {
      return product.features;
    }
    
    // Caractéristiques par défaut basées sur le nom du produit
    const name = product.name.toLowerCase();
    if (name.includes('rtx') || name.includes('gaming')) {
      return ['RTX Graphics', 'RGB', 'High Performance'];
    }
    if (name.includes('i7') || name.includes('i9')) {
      return ['Intel Core', 'Haute fréquence', 'Multitâche'];
    }
    if (name.includes('ssd')) {
      return ['NVMe', 'Lecture rapide', 'Gaming'];
    }
    return ['Gaming', 'Performance', 'Qualité'];
  };

  const features = getFeatures();

  return (
    <div className="group relative bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      {/* Badge Gaming */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2 sm:px-3 py-1 text-xs font-bold rounded-full text-white shadow-lg bg-red-500">
          Gaming
        </span>
      </div>

      {/* Pourcentage de réduction (si applicable) */}
      {discountPercent > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse">
            -{discountPercent}%
          </div>
        </div>
      )}

      {/* Icône du produit */}
      <div className="absolute top-12 sm:top-16 left-3 z-10">
        <div className="bg-white dark:bg-gray-700 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg">
          <ProductIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
        </div>
      </div>

      {/* Image du produit */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700 h-32 sm:h-40 md:h-48">
        <img 
          src={product.image_url || 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop';
          }}
        />
        
        {/* Overlay au hover */}
       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
  <button
    onClick={handleViewDetails}
    className="bg-white text-gray-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100 text-xs"
  >
    Voir détails
  </button>
</div>

      </div>

      {/* Contenu de la carte */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        {/* Nom du produit */}
        <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        {/* Caractéristiques */}
        <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
          {features.slice(0, 2).map((feature, index) => (
            <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {feature}
            </span>
          ))}
          {features.length > 2 && (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              +{features.length - 2}
            </span>
          )}
        </div>

        {/* Rating/Description */}
        <div className="flex items-center mb-2 sm:mb-3">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            PC Gaming haute performance
          </span>
        </div>

        {/* Prix */}
        <div className="flex flex-col mb-3 sm:mb-4 mt-auto">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
              {product.price} MAD
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {product.original_price} MAD
              </span>
               
            )}
          
          </div>
          {product.original_price && product.original_price > product.price && (
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              Économisez {product.original_price - product.price} MAD
            </span>
          )}
        </div>

        {/* Bouton d'achat */}
        <button 
          id={`add-btn-${product.id}`}
          onClick={() => handleAddToCart(product)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm"
          
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default PcPortableCard;