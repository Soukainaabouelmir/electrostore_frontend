import React, { useRef } from 'react';
import { FiSmartphone, FiHeadphones, FiMonitor, FiWatch, FiTablet, FiAnchor } from 'react-icons/fi';
import { useCart } from '../Panier/CartContext ';

const Promosection = () => {
  const scrollRef = useRef(null);
 const { addToCart } = useCart();
  // Données d'exemple pour les produits en promo avec icônes
  const promoProducts = [
    {
      id: 1,
      name: "Smartphone Samsung Galaxy",
      originalPrice: 899,
      discountPrice: 649,
      discountPercent: 28,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      badge: "Meilleure Vente",
      icon: FiSmartphone,
      features: ["5G", "128GB", "Triple Caméra"]
    },
    {
      id: 2,
      name: "Casque Audio Bluetooth",
      originalPrice: 199,
      discountPrice: 99,
      discountPercent: 50,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      badge: "Offre Flash",
      icon: FiHeadphones,
      features: ["Sans fil", "20h autonomie", "Réduction bruit"]
    },
    {
      id: 3,
      name: "MacBook Pro 13 pouces",
      originalPrice: 1299,
      discountPrice: 1099,
      discountPercent: 15,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
      badge: "Nouveau",
      icon: FiMonitor,
      features: ["M2 Chip", "512GB SSD", "Retina Display"]
    },
    {
      id: 4,
      name: "Montre Connectée",
      originalPrice: 349,
      discountPrice: 249,
      discountPercent: 29,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      badge: "Tendance",
      icon: FiWatch,
      features: ["GPS", "Étanche", "Cardio"]
    },
    {
      id: 5,
      name: "Tablette iPad Air",
      originalPrice: 699,
      discountPrice: 599,
      discountPercent: 14,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      badge: "Populaire",
      icon: FiTablet,
      features: ["10.9 pouces", "256GB", "Apple Pencil"]
    },
    {
      id: 6,
      name: "Console Gaming",
      originalPrice: 499,
      discountPrice: 399,
      discountPercent: 20,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      badge: "Gaming",
      icon: FiAnchor,
      features: ["4K Gaming", "1TB", "Manette incluse"]
    }
  ];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

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

  const PromoCard = ({ product }) => {
    return (
      <div className="group relative bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700 min-w-[280px] sm:min-w-[320px] mx-2">
        {/* Badge de promotion */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-3 py-1 text-xs font-bold rounded-full text-white shadow-lg ${
            product.badge === 'Offre Flash' ? 'bg-red-500' :
            product.badge === 'Meilleure Vente' ? 'bg-green-500' :
            product.badge === 'Nouveau' ? 'bg-blue-500' :
            product.badge === 'Gaming' ? 'bg-indigo-500' :
            product.badge === 'Populaire' ? 'bg-pink-500' : 'bg-purple-500'
          }`}>
            {product.badge}
          </span>
        </div>

        {/* Pourcentage de réduction avec animation pulse */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
            -{product.discountPercent}%
          </div>
        </div>

        {/* Icône du produit */}
        <div className="absolute top-16 left-3 z-10">
          <div className="bg-white dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
            <product.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>
        </div>

        {/* Image du produit */}
        <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700 h-48">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay au hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button className="bg-white text-gray-800 px-3 py-1.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100 text-xs">
              Voir détails
            </button>
          </div>
        </div>

        {/* Contenu de la carte */}
        <div className="p-4">
          {/* Nom du produit */}
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>

          {/* Caractéristiques */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.map((feature, index) => (
              <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Produit de qualité premium
            </span>
          </div>

          {/* Prix */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                {product.discountPrice}€
              </span>
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice}€
              </span>
            </div>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              Économisez {product.originalPrice - product.discountPrice}€
            </span>
          </div>

          {/* Bouton d'achat */}
          <button
           id={`add-btn-${product.id}`}
            onClick={() => handleAddToCart(product)}
           className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-xs">
            Ajouter au panier
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 px-4 bg-white dark:bg-[#141414]
">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Offres Spéciales
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez nos produits en promotion avec des réductions exceptionnelles
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Conteneur principal avec scroll horizontal pour toutes les tailles */}
        <div className="relative">
          {/* Boutons de navigation */}
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={scrollLeft}
              className="bg-white dark:bg-[#1e1e1e] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Glissez pour voir plus
            </span>
            
            <button 
              onClick={scrollRight}
              className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Conteneur de scroll horizontal */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {promoProducts.map(product => (
              <PromoCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Bouton voir plus
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Voir toutes les promotions
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Promosection;