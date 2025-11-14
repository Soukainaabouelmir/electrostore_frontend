import React, { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

// Définissez une animation simple de "flottement" dans votre tailwind.config.js
// keyframes: { float: { '0%, 100%': { transform: 'translateY(-5px)' }, '50%': { transform: 'translateY(5px)' } } },
// animation: { float: 'float 6s ease-in-out infinite' }

const Popup3DPreview = ({ isOpen, onClose, Popup }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Réduction de l'amplitude de rotation pour un meilleur effet visuel sur une seule image
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    // Rotation se remet à zéro en quittant
    setRotation({ x: 0, y: 0 });
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
    // 1. Conteneur principal : Rendu transparent (bg-transparent) et fixé
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent" // Rendu transparent
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture (X) - Positionné par rapport à l'image */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 z-[1001] text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-1 shadow-lg"
          aria-label="Fermer la prévisualisation"
        >
          <FiX className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* 2. Conteneur de l'image (pour la 3D) */}
        <div
          ref={containerRef}
          className="relative perspective-1000 w-full flex items-center justify-center" // Centrage pour l'image
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '1000px' }}
        >
          {/* Particles/Animation Element 1 (Gauche) */}
          <div className="absolute left-[-50px] top-1/4 w-10 h-10 bg-blue-500 rounded-full opacity-60 blur-md animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute left-[-20px] bottom-1/3 w-6 h-6 bg-purple-500 rounded-full opacity-40 blur-sm animate-float" style={{ animationDelay: '3s' }} />

        <div
            className="relative transition-transform duration-100 ease-out w-full max-w-lg md:max-w-3xl max-h-[85vh]" // Limiter la taille du conteneur 3D en hauteur aussi
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >

            {/* Main Popup card - ONLY Image */}
            <div className="bg-transparent rounded-2xl overflow-hidden transform-gpu w-full h-full">
              {/* Image section */}
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  transform: 'translateZ(50px)', // Projection 3D pour l'image
                }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Popup preview"
                    // object-contain: L'image s'affiche entièrement (avec espace si les proportions ne correspondent pas)
                    className="max-w-full max-h-[100vh] object-contain"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center bg-gray-600 rounded-xl">
                    <span className="text-white text-4xl sm:text-6xl font-bold">
                      IMAGE
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Particles/Animation Element 2 (Droite) */}
          <div className="absolute right-[-50px] top-1/2 w-8 h-8 bg-pink-500 rounded-full opacity-50 blur-md animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute right-[-10px] bottom-1/4 w-5 h-5 bg-yellow-400 rounded-full opacity-70 blur-sm animate-float" style={{ animationDelay: '2s' }} />

        </div>
      </div>
    </div>
  );
};

export default Popup3DPreview;