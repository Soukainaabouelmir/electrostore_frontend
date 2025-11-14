import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Popup3DPreview = ({ isOpen, onClose, Popup }) => {
  const [isVisible, setIsVisible] = useState(false);
  // Ajout de l'état pour la rotation 3D
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 }); 
  const containerRef = useRef(null);

  // --- Logique d'Ouverture/Fermeture de la Modal ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Légère delay pour l'animation d'entrée
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Le overflow est rétabli après l'animation de fermeture dans handleClose
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    // Réinitialise la rotation lors de la fermeture pour la prochaine ouverture
    setRotation({ x: 0, y: 0, z: 0 }); 
    setTimeout(onClose, 300); // Assure que la modal se ferme après la transition
  };

  // --- Logique du Mouvement 3D ---
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Définition de l'amplitude maximale de rotation (subtile)
    const MAX_ROTATION = 6;
    const rotateY = ((x - centerX) / centerX) * MAX_ROTATION;
    const rotateX = ((centerY - y) / centerY) * MAX_ROTATION * -1; // Inversé pour un effet plus naturel
    
    // Léger effet de lévitation (translationZ)
    const translateZ = 10; 

    setRotation({ x: rotateX, y: rotateY, z: translateZ });
  };

  const handleMouseLeave = () => {
    // Rotation et lévitation se remettent à zéro en quittant
    setRotation({ x: 0, y: 0, z: 0 }); 
  };
  
  // --- Logique de l'URL ---
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
        isVisible ? 'bg-black bg-opacity-20 ' : 'bg-black bg-opacity-0' // Fond plus foncé
      }`}
      onClick={handleClose}
    >
      {/* Conteneur de la popup */}
      <div
        ref={containerRef} // Référence pour calculer la position de la souris
        className={`relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl transition-all duration-300 transform perspective-1000`}
        style={{ perspective: '1000px' }} // Nécessaire pour l'effet 3D
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove} // Gestionnaire de mouvement
        onMouseLeave={handleMouseLeave} // Gestionnaire de sortie
      >
        {/* Bouton de fermeture - positionné par rapport au conteneur de la popup */}
        <button
          onClick={handleClose}
          // Positionnement ajusté pour être visible et non superposé à l'image
          className="absolute -top-12 right-0 sm:-top-14 sm:right-0 z-10 text-white hover:text-gray-300 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white bg-black/50 hover:bg-black/70"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Contenu de la popup avec la transformation 3D */}
        <div
          className={`sm:rounded-xl overflow-hidden transition-transform duration-150 ease-out`}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${rotation.z}px)`,
            transformStyle: 'preserve-3d',
            // Transition d'entrée/sortie de la modal
            opacity: isVisible ? 1 : 0, 
            scale: isVisible ? 1 : 0.95
          }}
        >
          {/* Image */}
          <div className="relative w-full shadow-2xl">
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
                    // w-full est essentiel pour le responsive
                    className="w-full h-auto max-h-[85vh] object-contain" 
                  />
                </a>
              ) : (
                <img
                  src={imageUrl}
                  alt="Popup preview"
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              )
            ) : (
              <div className="w-full h-48 sm:h-64 md:h-80 flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-2xl sm:text-3xl md:text-4xl font-semibold">
                  IMAGE MANQUANTE
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