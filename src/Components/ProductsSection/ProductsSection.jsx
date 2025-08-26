import React, { useState } from 'react';
import { FiSmartphone, FiHeadphones, FiMonitor, FiWatch} from 'react-icons/fi';
import { useCart } from '../Panier/CartContext ';

const ProductsSection = ({ onViewDetails }) => {
  const [showMore, setShowMore] = useState(false);
  const { addToCart } = useCart();

  const allProducts = [

    {
      id: 1,
      name: "iPhone 15 Pro Max",
      originalPrice: 1299,
      discountPrice: 1199,
      discountPercent: 8,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
      badge: "Nouveau",
      icon: FiSmartphone,
      features: ["A17 Pro", "256GB", "Titane"]
    },

    {
      id: 2,
      name: "AirPods Pro 2ème génération",
      originalPrice: 279,
      discountPrice: 229,
      discountPercent: 18,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
      badge: "Populaire",
      icon: FiHeadphones,
      features: ["USB-C", "Réduction bruit", "Spatial Audio"]
    },
    {
      id: 3,
      name: "MacBook Air M2",
      originalPrice: 1199,
      discountPrice: 999,
      discountPercent: 17,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      badge: "Meilleure Vente",
      icon: FiMonitor,
      features: ["M2 Chip", "256GB SSD", "13.6 pouces"]
    },
    {
      id: 4,
      name: "Apple Watch Series 9",
      originalPrice: 429,
      discountPrice: 379,
      discountPercent: 12,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      badge: "Tendance",
      icon: FiWatch,
      features: ["GPS + Cellular", "45mm", "Double tap"]
    },

    {
      id: 5,
      name: "iPhone 15 Pro Max",
      originalPrice: 1299,
      discountPrice: 1199,
      discountPercent: 8,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
      badge: "Nouveau",
      icon: FiSmartphone,
      features: ["A17 Pro", "256GB", "Titane"]
    },
    {
      id: 6,
      name: "AirPods Pro 2ème génération",
      originalPrice: 279,
      discountPrice: 229,
      discountPercent: 18,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
      badge: "Populaire",
      icon: FiHeadphones,
      features: ["USB-C", "Réduction bruit", "Spatial Audio"]
    },
    {
      id: 7,
      name: "MacBook Air M2",
      originalPrice: 1199,
      discountPrice: 999,
      discountPercent: 17,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      badge: "Meilleure Vente",
      icon: FiMonitor,
      features: ["M2 Chip", "256GB SSD", "13.6 pouces"]
    },
    {
      id: 8,
      name: "Apple Watch Series 9",
      originalPrice: 429,
      discountPrice: 379,
      discountPercent: 12,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      badge: "Tendance",
      icon: FiWatch,
      features: ["GPS + Cellular", "45mm", "Double tap"]
    },
  ];

  const displayedProducts = showMore ? allProducts : allProducts.slice(0, 8);

  const handleAddToCart = (product) => {
    addToCart(product);
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

  const handleViewDetails = (product) => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const ProductCard = ({ product }) => {
    return (
      <div className="group relative bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col">
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-2 sm:px-3 py-1 text-xs font-bold rounded-full text-white shadow-lg ${
            product.badge === 'Nouveau' ? 'bg-blue-500' :
            product.badge === 'Populaire' ? 'bg-pink-500' :
            product.badge === 'Meilleure Vente' ? 'bg-green-500' :
            product.badge === 'Tendance' ? 'bg-purple-500' :
            product.badge === 'Pro' ? 'bg-indigo-500' :
            product.badge === 'Gaming' ? 'bg-red-500' :
            product.badge === 'Professionnel' ? 'bg-gray-700' :
            product.badge === 'Smart Home' ? 'bg-teal-500' :
            product.badge === 'Puissant' ? 'bg-orange-600' :
            product.badge === 'Réseau' ? 'bg-cyan-500' :
            product.badge === 'Performance' ? 'bg-emerald-500' :
            product.badge === '4K HDR' ? 'bg-violet-500' : 'bg-gray-500'
          }`}>
            {product.badge}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse">
            -{product.discountPercent}%
          </div>
        </div>

        <div className="absolute top-12 sm:top-16 left-3 z-10">
          <div className="bg-white dark:bg-gray-700 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg">
            <product.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
          </div>
        </div>

        <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700 h-32 sm:h-40 md:h-48">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={() => handleViewDetails(product)}
              className="bg-white text-gray-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100 text-xs"
            >
              Voir détails
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                +{product.features.length - 2}
              </span>
            )}
          </div>
      
          <div className="flex items-center mb-2 sm:mb-3">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Produit de qualité premium
            </span>
          </div>

          <div className="flex flex-col mb-3 sm:mb-4 mt-auto">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
                {product.discountPrice}€
              </span>
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {product.originalPrice}€
              </span>
            </div>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              Économisez {product.originalPrice - product.discountPrice}€
            </span>
          </div>

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


  return (
    <section className="py-8 sm:py-12 px-4 bg-white dark:!bg-[#141414]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Nos Produits
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Découvrez notre large gamme de produits technologiques de qualité
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => setShowMore(!showMore)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            {showMore ? 'Voir moins de produits' : `Voir tous les produits (${allProducts.length})`}
          </button>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-[#1e1e1e] rounded-xl">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {allProducts.length}+
            </div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Produits
            </div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-[#1e1e1e] rounded-xl">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              15%
            </div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Réduction moyenne
            </div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-[#1e1e1e] rounded-xl">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              24h
            </div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Livraison
            </div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-[#1e1e1e] rounded-xl">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              2 ans
            </div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Garantie
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
