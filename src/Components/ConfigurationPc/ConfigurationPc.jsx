import React, { useState } from 'react';
import { FiCpu, FiMonitor, FiHardDrive, FiZap, FiBox, FiShoppingCart, FiCheck, FiAlertCircle, FiStar, FiSettings } from 'react-icons/fi';

const ConfigurationPC = () => {
  const [selectedComponents, setSelectedComponents] = useState({
    processor: null,
    gpu: null,
    ram: null,
    motherboard: null,
    storage: null,
    psu: null,
    case: null,
    cooling: null,
  });

  const [activeCategory, setActiveCategory] = useState('processor');

  const components = {
    processor: [
      { 
        id: 1, 
        name: 'Intel Core i9-14900K', 
        price: 6500, 
        discountPrice: 5800,
        specs: '24 cœurs, 32 threads, 6.0 GHz', 
        power: 253, 
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop',
        badge: 'Nouveau',
        discountPercent: 11,
        features: ['24 cœurs', '32 threads', '6.0 GHz Turbo'],
        rating: 4.8,
        reviews: 124,
        icon: FiCpu
      },
      { 
        id: 2, 
        name: 'AMD Ryzen 9 7950X', 
        price: 6800, 
        discountPrice: 6200,
        specs: '16 cœurs, 32 threads, 5.7 GHz', 
        power: 170, 
        image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=300&h=200&fit=crop',
        badge: 'Performance',
        discountPercent: 9,
        features: ['16 cœurs', '32 threads', '5.7 GHz'],
        rating: 4.9,
        reviews: 98,
        icon: FiCpu
      },
    ],
    gpu: [
      { 
        id: 1, 
        name: 'NVIDIA RTX 4090 24GB', 
        price: 18500, 
        discountPrice: 16900,
        specs: '24GB GDDR6X, 16384 CUDA', 
        power: 450, 
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=200&fit=crop',
        badge: 'Gaming',
        discountPercent: 9,
        features: ['24GB GDDR6X', 'DLSS 3', 'Ray Tracing'],
        rating: 4.7,
        reviews: 203,
        icon: FiMonitor
      },
      { 
        id: 2, 
        name: 'AMD RX 7900 XTX', 
        price: 11500, 
        discountPrice: 10500,
        specs: '24GB GDDR6, 96 CU', 
        power: 355, 
        image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=300&h=200&fit=crop',
        badge: '4K HDR',
        discountPercent: 9,
        features: ['24GB GDDR6', 'FSR 3', 'AV1 Encoding'],
        rating: 4.6,
        reviews: 156,
        icon: FiMonitor
      },
       { 
        id: 2, 
        name: 'AMD RX 7900 XTX', 
        price: 11500, 
        discountPrice: 10500,
        specs: '24GB GDDR6, 96 CU', 
        power: 355, 
        image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=300&h=200&fit=crop',
        badge: '4K HDR',
        discountPercent: 9,
        features: ['24GB GDDR6', 'FSR 3', 'AV1 Encoding'],
        rating: 4.6,
        reviews: 156,
        icon: FiMonitor
      },
    ],
    ram: [
      { 
        id: 1, 
        name: 'Corsair Vengeance DDR5 64GB', 
        price: 3200, 
        discountPrice: 2800,
        specs: '64GB (2x32GB), 6000MHz, CL30', 
        power: 10, 
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=200&fit=crop',
        badge: 'Puissant',
        discountPercent: 13,
        features: ['64GB DDR5', '6000MHz', 'CL30'],
        rating: 4.8,
        reviews: 89,
        icon: FiBox
      },
    ],
    motherboard: [
      { 
        id: 1, 
        name: 'ASUS ROG Maximus Z790', 
        price: 6500, 
        discountPrice: 5900,
        specs: 'Intel Z790, DDR5, PCIe 5.0, WiFi 6E', 
        power: 80, 
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
        badge: 'Pro',
        discountPercent: 9,
        features: ['DDR5', 'PCIe 5.0', 'WiFi 6E'],
        rating: 4.9,
        reviews: 67,
        icon: FiCpu
      },
    ],
    storage: [
      { 
        id: 1, 
        name: 'Samsung 990 PRO 2TB NVMe', 
        price: 2400, 
        discountPrice: 2100,
        specs: '2TB NVMe Gen4, 7450 MB/s', 
        power: 6, 
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop',
        badge: 'Performance',
        discountPercent: 13,
        features: ['2TB NVMe', '7450 MB/s', 'Gen4'],
        rating: 4.8,
        reviews: 145,
        icon: FiHardDrive
      },
    ],
    psu: [
      { 
        id: 1, 
        name: 'Corsair RM1000x 1000W Gold', 
        price: 2400, 
        discountPrice: 2100,
        specs: '1000W, 80+ Gold, Modulaire', 
        power: 0, 
        image: 'https://images.unsplash.com/photo-1606293459205-9c7e58b6ef75?w=300&h=200&fit=crop',
        badge: 'Professionnel',
        discountPercent: 13,
        features: ['1000W', '80+ Gold', 'Modulaire'],
        rating: 4.7,
        reviews: 112,
        icon: FiZap
      },
    ],
    case: [
      { 
        id: 1, 
        name: 'Lian Li O11 Dynamic EVO', 
        price: 1800, 
        discountPrice: 1600,
        specs: 'Mid Tower, Verre trempé, RGB', 
        power: 0, 
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&h=200&fit=crop',
        badge: 'Tendance',
        discountPercent: 11,
        features: ['Mid Tower', 'Verre trempé', 'RGB'],
        rating: 4.6,
        reviews: 234,
        icon: FiBox
      },
    ],
    cooling: [
      { 
        id: 1, 
        name: 'NZXT Kraken Z73 RGB', 
        price: 3200, 
        discountPrice: 2900,
        specs: 'AIO 360mm, LCD, RGB', 
        power: 15, 
        image: 'https://images.unsplash.com/photo-1576613109753-27804de2cba8?w=300&h=200&fit=crop',
        badge: 'Populaire',
        discountPercent: 9,
        features: ['AIO 360mm', 'LCD', 'RGB'],
        rating: 4.7,
        reviews: 178,
        icon: FiCpu
      },
    ],
  };

  const categories = [
    { key: 'processor', name: 'Processeur', icon: FiCpu, color: 'blue' },
    { key: 'gpu', name: 'Carte Graphique', icon: FiMonitor, color: 'green' },
    { key: 'ram', name: 'Mémoire RAM', icon: FiBox, color: 'purple' },
    { key: 'motherboard', name: 'Carte Mère', icon: FiCpu, color: 'orange' },
    { key: 'storage', name: 'Stockage', icon: FiHardDrive, color: 'cyan' },
    { key: 'psu', name: 'Alimentation', icon: FiZap, color: 'yellow' },
    { key: 'case', name: 'Boîtier', icon: FiBox, color: 'red' },
    { key: 'cooling', name: 'Refroidissement', icon: FiCpu, color: 'indigo' },
   
  ];

  const selectComponent = (category, component) => {
    setSelectedComponents({
      ...selectedComponents,
      [category]: component,
    });
  };

  const getTotalPrice = () => {
    return Object.values(selectedComponents).reduce((total, component) => {
      return total + (component ? component.price : 0);
    }, 0);
  };

  const getTotalPower = () => {
    return Object.values(selectedComponents).reduce((total, component) => {
      return total + (component ? component.power : 0);
    }, 0);
  };

  const isConfigurationComplete = () => {
    return Object.values(selectedComponents).every(component => component !== null);
  };

  const getRecommendedPSU = () => {
    const totalPower = getTotalPower();
    const recommended = Math.ceil((totalPower * 1.3) / 100) * 100;
    return recommended;
  };

  const isPSUSufficient = () => {
    if (!selectedComponents.psu) return null;
    const psuWattage = parseInt(selectedComponents.psu.specs.match(/\d+/)[0]);
    return psuWattage >= getRecommendedPSU();
  };

  const handleViewDetails = (product) => {
    console.log('View details:', product);
    // Implémentez la logique pour voir les détails
  };

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product);
    // Implémentez la logique d'ajout au panier
  };

  const ProductCard = ({ product, category }) => {
    const isSelected = selectedComponents[category]?.id === product.id;
    
    return (
      <div 
        onClick={() => selectComponent(category, product)}
        className={`group relative bg-white dark:bg-[#141414] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border h-full flex flex-col cursor-pointer ${
          isSelected 
            ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' 
            : 'border-gray-100 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500'
        }`}
      >
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-2 sm:px-3 py-1 text-xs font-bold rounded-full text-white shadow-lg ${
            product.badge === 'Nouveau' ? 'bg-blue-600' :
            product.badge === 'Populaire' ? 'bg-pink-500' :
            product.badge === 'Meilleure Vente' ? 'bg-green-500' :
            product.badge === 'Tendance' ? 'bg-purple-500' :
            product.badge === 'Pro' ? 'bg-indigo-500' :
            product.badge === 'Gaming' ? 'bg-red-500' :
            product.badge === 'Professionnel' ? 'bg-gray-800' :
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
          <div className="bg-white dark:bg-gray-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg">
            <product.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 dark:text-gray-300" />
          </div>
        </div>

        {/* Rating */}
        <div className="absolute top-12 sm:top-16 right-3 z-10">
          <div className="flex items-center gap-1 bg-black bg-opacity-50 rounded-full px-2 py-1 text-white text-xs">
            <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 h-32 sm:h-40 md:h-48">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(product);
              }}
              className="bg-white text-[#1e1e1e] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100 text-xs"
            >
              Voir détails
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <h3 className="text-sm sm:text-base font-bold text-[#1e1e1e] dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                +{product.features.length - 2}
              </span>
            )}
          </div>

          <div className="flex items-center mb-2 sm:mb-3">
            <div className="flex items-center gap-1">
              <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-800 dark:text-gray-300">
                {product.rating}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({product.reviews} avis)
              </span>
            </div>
          </div>

          {/* Power consumption */}
          {product.power > 0 && (
            <div className="flex items-center mb-2 sm:mb-3">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                 Consommation: {product.power}W
              </span>
            </div>
          )}

          <div className="flex flex-col mb-3 sm:mb-4 mt-auto">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
                {product.discountPrice?.toLocaleString()} DH
              </span>
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {product.price.toLocaleString()} DH
              </span>
            </div>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              Économisez {(product.price - product.discountPrice).toLocaleString()} DH
            </span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                selectComponent(category, product);
              }}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm ${
                isSelected
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }`}
            >
              {isSelected ? (
                <div className="flex items-center justify-center gap-1">
                  <FiCheck className="w-4 h-4" />
                  Sélectionné
                </div>
              ) : (
                'Sélectionner'
              )}
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 py-2 px-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm"
            >
              <FiShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#141414]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#1e1e1e] dark:text-white mb-2">
            Configurateur PC Sur Mesure !
          </h1>
         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Component Selection */}
          <div className="lg:col-span-2 space-y-4">
            {/* Category Tabs */}
            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                      activeCategory === cat.key
                        ? `bg-${cat.color}-500 text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <cat.icon className="text-lg" />
                    <span className="text-sm font-medium hidden md:inline">{cat.name}</span>
                    {selectedComponents[cat.key] && (
                      <FiCheck className="text-xs" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Component Cards Grid */}
            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#1e1e1e] dark:text-white mb-6 flex items-center gap-2">
                {categories.find(c => c.key === activeCategory)?.icon && 
                  React.createElement(categories.find(c => c.key === activeCategory).icon, { className: "text-blue-500" })
                }
                {categories.find(c => c.key === activeCategory)?.name}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  ({components[activeCategory]?.length || 0} produits)
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {components[activeCategory]?.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    category={activeCategory}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-[#1e1e1e] dark:text-white mb-4">
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-6">
                {categories.map((cat) => (
                  <div key={cat.key} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <cat.icon className={`text-${cat.color}-500`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {cat.name}
                      </span>
                    </div>
                    {selectedComponents[cat.key] ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 max-w-[120px] truncate">
                          {selectedComponents[cat.key].name}
                        </span>
                        <FiCheck className="text-green-500" />
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">Non sélectionné</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Power Consumption */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                    Consommation totale
                  </span>
                  <span className="text-lg font-bold text-orange-500">
                    {getTotalPower()}W
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                    Alimentation recommandée
                  </span>
                  <span className="text-lg font-bold text-blue-500">
                    {getRecommendedPSU()}W
                  </span>
                </div>
                {selectedComponents.psu && (
                  <div className="mt-2 flex items-center gap-2">
                    {isPSUSufficient() ? (
                      <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <FiCheck /> Alimentation suffisante
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <FiAlertCircle /> Alimentation insuffisante
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Total Price */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Prix Total</span>
                  <span className="text-3xl font-bold">{getTotalPrice().toLocaleString()} DH</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={!isConfigurationComplete() || (selectedComponents.psu && !isPSUSufficient())}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isConfigurationComplete() && (!selectedComponents.psu || isPSUSufficient())
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                <FiShoppingCart />
                {isConfigurationComplete() ? 'Ajouter au Panier' : 'Configuration Incomplète'}
              </button>

              {!isConfigurationComplete() && (
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                  Veuillez sélectionner tous les composants
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPC;