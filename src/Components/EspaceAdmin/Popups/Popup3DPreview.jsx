import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Popup3DPreview = ({ isOpen, onClose, Popup }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Légère delay pour l'animation d'entrée
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getImageUrl = (logoPath) => {
    if (!logoPath) return null;
    if (logoPath.startsWith('http')) return logoPath;
    const API_BASE_URL = 'http://localhost:8000';
    return `${API_BASE_URL}/storage/${logoPath}`;
  };

  if (!isOpen || !Popup) return null;

  const imageUrl = getImageUrl(Popup.image);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all duration-300 ${
        isVisible ? 'bg-black bg-opacity-35' : 'bg-black bg-opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Conteneur de la popup */}
      <div
        className={`relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 sm:-top-14 sm:-right-2 z-10 text-gray-500 hover:text-gray-400 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Contenu de la popup */}
        <div className=" sm:rounded-xl overflow-hidden">
          {/* Image */}
          <div className="relative w-full">
            {imageUrl ? (
              Popup.lien ? (
                <a
                  href={Popup.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <img
                    src={imageUrl}
                    alt="Popup preview"
                    className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] object-contain transition-transform duration-300 hover:scale-[1.02]"
                  />
                </a>
              ) : (
                <img
                  src={imageUrl}
                  alt="Popup preview"
                  className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] object-contain"
                />
              )
            ) : (
              <div className="w-full h-48 sm:h-64 md:h-80 flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-2xl sm:text-3xl md:text-4xl font-semibold">
                  IMAGE
                </span>
              </div>
            )}
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Popup3DPreview;