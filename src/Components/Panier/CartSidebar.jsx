import React from "react";
import { FiShoppingCart, FiPlus, FiMinus, FiTrash2, FiX, FiArrowRight, FiStar } from "react-icons/fi";
import { useCart } from "./CartContext ";


const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart, getTotalItems } = useCart();

  if (!isOpen) return null;

  const shipping = 5.99;
  const freeShippingThreshold = 50;
  const totalPrice = getTotalPrice();
  const isEligibleForFreeShipping = totalPrice >= freeShippingThreshold;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-96 md:max-w-md bg-white dark:bg-[#141414] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
       
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-[#1e1e1e] dark:to-gray-900">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <FiShoppingCart className="text-lg sm:text-xl text-blue-600 dark:text-blue-400" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getTotalItems() > 9 ? '9+' : getTotalItems()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg sm:text-lg font-bold text-gray-900 dark:text-white">Mon Panier</h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {getTotalItems()} article{getTotalItems() > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <FiX className="text-lg sm:text-lg text-gray-500 dark:text-gray-400" />
          </button>
        </div>


        {!isEligibleForFreeShipping && totalPrice > 0 && (
          <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200">
                Livraison gratuite à {freeShippingThreshold}€
              </span>
              <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                +{(freeShippingThreshold - totalPrice).toFixed(2)}€
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((totalPrice / freeShippingThreshold) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

     
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4" style={{ maxHeight: cartItems.length > 0 ? 'calc(100vh - 340px)' : 'calc(100vh - 260px)' }}>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-center px-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 sm:p-8 mb-4">
                <FiShoppingCart className="text-3xl sm:text-4xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Votre panier est vide
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Ajoutez des produits pour commencer vos achats
              </p>
              <button 
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-start space-x-3 sm:space-x-3 p-2 sm:p-4 bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="relative flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 sm:w-20 sm:h-20 object-cover rounded-lg"
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                      {item.discountPercent}%
                    </span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm line-clamp-2 mb-1">
                    {item.name}
                  </h3>
                  
                  {item.features && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 sm:px-2 py-0.5 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                    <span className="text-base sm:text-lg font-bold text-green-600 dark:text-green-400">
                      {item.discountPrice}€
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        {item.originalPrice}€
                      </span>
                    )}
                  </div>
                  
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-l-lg transition-colors"
                      >
                        <FiMinus className="text-xs sm:text-sm text-gray-600 dark:text-gray-400" />
                      </button>
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white px-2 sm:px-3">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-r-lg transition-colors"
                      >
                        <FiPlus className="text-xs sm:text-sm text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 sm:p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="text-xs sm:text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        
        {cartItems.length > 0 && (
  <div className="border-t border-gray-200 dark:border-gray-700 p-1 sm:p-2 bg-white dark:bg-[#141414] mt-auto flex-shrink-0 text-sm min-h-[72px] ">
    
    <div className="space-y-1 mb-2 sm:mb-3">
      <div className="">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900 dark:text-white">
            Total
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {(totalPrice + (isEligibleForFreeShipping ? 0 : shipping)).toFixed(2)}€
          </span>
        </div>
      </div>
    </div>

    {/* Clear Cart */}
    <div className="flex justify-center mb-2">
      <button
        onClick={clearCart}
        className="text-red-500 hover:text-red-700 text-xs transition-colors"
      >
        Vider le panier
      </button>
    </div>

    {/* Action Buttons */}
    <div className="space-y-2">
      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.01] shadow flex items-center justify-center space-x-2">
        <span>Commander</span>
        <FiArrowRight className="text-sm" />
      </button>

      <button
        onClick={onClose}
        className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
      >
        Continuer mes achats
      </button>
    </div>
  </div>
)}
      </div>
    </>
  );
};

export default CartSidebar;