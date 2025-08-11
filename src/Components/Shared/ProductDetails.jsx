import React, { useState, useEffect } from 'react';
import { 
  FiArrowLeft, 
  FiHeart, 
  FiShare2, 
  FiTruck, 
  FiShield, 
  FiRefreshCcw,
  FiStar,
  FiCheck,
  FiMinus,
  FiPlus,
  FiMonitor,
  FiCpu,
  FiHardDrive,
  FiZap,
  FiGift
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Panier/CartContext ';


const ProductDetails = ({ productId, onClose }) => {
  const { addToCart } = useCart();
   const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProduct({
        id: productId,
        name: "PC Gaming ASUS ROG Strix GT15",
        price: 15999,
        original_price: 18999,
        category: "PC Gaming",
        brand: "ASUS",
        availability: "En stock",
        rating: 4.8,
        reviewCount: 127,
        images: [
          "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=600&h=600&fit=crop"
        ],
        description: "PC Gaming haute performance conçu pour les joueurs exigeants. Équipé des derniers composants pour une expérience de jeu exceptionnelle en 4K avec ray tracing activé.",
        fullDescription: `Ce PC Gaming ASUS ROG Strix GT15 est la solution parfaite pour les gamers qui recherchent des performances exceptionnelles. Doté d'un processeur Intel Core i7 de dernière génération et d'une carte graphique RTX 4070, il peut faire tourner tous les jeux actuels en haute résolution.

L'architecture optimisée garantit une gestion thermique efficace même lors des sessions de jeu les plus intenses. Le système de refroidissement avancé maintient des températures optimales pour des performances constantes.

Avec 32 GB de RAM DDR5 et un SSD NVMe de 1TB, les temps de chargement sont réduits au minimum et le multitâche est fluide. Le design RGB personnalisable s'adapte à votre setup gaming.`,
        specifications: {
          "Processeur": "Intel Core i7-13700F",
          "Carte Graphique": "NVIDIA RTX 4070 12GB",
          "Mémoire": "32GB DDR5-4800",
          "Stockage": "1TB SSD NVMe + 2TB HDD",
          "Carte Mère": "ASUS TUF Gaming B760M",
          "Alimentation": "750W 80+ Gold",
          "Refroidissement": "Refroidissement liquide AIO 240mm",
          "Connectique": "Wi-Fi 6E, Bluetooth 5.3, USB-C",
          "Système": "Windows 11 Home",
          "Garantie": "3 ans constructeur"
        },
        features: [
          "Gaming 4K Ultra",
          "Ray Tracing RTX",
          "DLSS 3.0",
          "RGB Personnalisable",
          "Refroidissement Liquide",
          "Wi-Fi 6E",
          "USB-C",
          "Prêt VR"
        ],
        compatibleGames: [
          "Cyberpunk 2077",
          "Call of Duty MW3",
          "Fortnite",
          "Valorant",
          "GTA V",
          "Assassin's Creed"
        ],
        includedAccessories: [
          "Clavier Gaming RGB",
          "Souris Gaming 12000 DPI",
          "Tapis de souris XL",
          "Câble d'alimentation"
        ],
        warranty: "3 ans garantie constructeur + 1 an extension gratuite",
        shipping: "Livraison gratuite sous 24-48h",
        returnPolicy: "Retour gratuit sous 30 jours"
      });
    
    });
  }, [productId]);

  const getProductIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'pc gaming': return FiMonitor;
      case 'processeur': return FiCpu;
      case 'stockage': return FiHardDrive;
      default: return FiZap;
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    const button = document.getElementById('add-to-cart-btn');
    const originalText = button.innerHTML;
    button.innerHTML = '✓ Ajouté au panier !';
    button.className = button.className.replace('from-blue-600 to-purple-600', 'from-green-600 to-green-700');
    setTimeout(() => {
      button.innerHTML = originalText;
      button.className = button.className.replace('from-green-600 to-green-700', 'from-blue-600 to-purple-600');
    }, 2000);
  };

  const discountPercent = product?.original_price ? 
    Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;


  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#141414] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Produit introuvable</h2>
          <button
            onClick={() => onClose && onClose()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const ProductIcon = getProductIcon(product.category);
  return (
    <div className="min-h-screen bg-white dark:bg-[#141414]">
      <div className="bg-white dark:bg-[#141414] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onClose ? onClose() : navigate(-1)} 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <FiArrowLeft className="mr-2" size={20} />
              Retour
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative bg-white dark:bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg">
              {discountPercent > 0 && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discountPercent}%
                </div>
              )}
              
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-white dark:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <ProductIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>

              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="flex space-x-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {product.brand}
                </span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviewCount} avis)
                </span>
              </div>

              {/* Disponibilité */}
              <div className="flex items-center space-x-2 mb-6">
                <FiCheck className="w-5 h-5 text-green-500" />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {product.availability}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-[#1e1e1e] rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {product.price.toLocaleString()} MAD
                </span>
                {product.original_price && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.original_price.toLocaleString()} MAD
                  </span>
                )}
              </div>
              {product.original_price && (
                <p className="text-green-600 dark:text-green-400 font-medium">
                  Économisez {(product.original_price - product.price).toLocaleString()} MAD
                </p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Caractéristiques principales
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantité:
                </span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[60px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>

              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Ajouter au panier • {(product.price * quantity).toLocaleString()} MAD
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <FiTruck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Livraison gratuite
                </p>
              </div>
              <div className="text-center">
                <FiShield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  3 ans garantie
                </p>
              </div>
              <div className="text-center">
                <FiRefreshCcw className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Retour 30 jours
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {[
                { id: 'specs', label: 'Spécifications', icon: FiCpu },
                { id: 'description', label: 'Description', icon: FiMonitor },
                { id: 'compatibility', label: 'Jeux compatibles', icon: FiZap },
                { id: 'accessories', label: 'Accessoires inclus', icon: FiGift }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
          <div className="py-8">
            {activeTab === 'specs' && (
              <div className="bg-white dark:bg-[#1e1e1e] rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Spécifications techniques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {key}
                      </span>
                      <span className="text-gray-900 dark:text-white text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'description' && (
              <div className="bg-white dark:bg-[#1e1e1e] rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Description détaillée
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {showFullDescription ? product.fullDescription : product.description}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 dark:text-blue-400 hover:underline mt-4 font-medium"
                  >
                    {showFullDescription ? 'Voir moins' : 'Voir plus'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'compatibility' && (
              <div className="bg-white dark:bg-[#1e1e1e] rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Jeux compatibles
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {product.compatibleGames.map((game, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <FiCheck className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {game}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'accessories' && (
              <div className="bg-white dark:bg-[#1e1e1e] rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Accessoires inclus
                </h3>
                <div className="space-y-4">
                  {product.includedAccessories.map((accessory, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <FiGift className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {accessory}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Services inclus
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• {product.warranty}</li>
                    <li>• {product.shipping}</li>
                    <li>• {product.returnPolicy}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;