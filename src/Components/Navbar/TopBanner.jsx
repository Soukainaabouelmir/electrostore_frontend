
import React, { useState } from "react";
import { 
  FiPhone, 
  FiX,

} from "react-icons/fi";

const TopBanner = () => {
  const phoneNumber = "01 23 45 67 89";
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-2 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-8 flex items-center gap-2 text-sm">
              <FiPhone className="text-yellow-400 animate-pulse" />
              <span className="font-medium">Appelez-nous: {phoneNumber}</span>
              <span className="text-yellow-300">|</span>
              <span className="text-yellow-300">Livraison gratuite dès 99€</span>
            </span>
          ))}
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-300 transition-colors"
        >
          <FiX size={16} />
        </button>
      </div>
    )
  );
};

export default TopBanner;
