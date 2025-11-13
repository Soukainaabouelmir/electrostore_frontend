import React, { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

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
    
    const rotateY = ((x - centerX) / centerX) * 25;
    const rotateX = ((centerY - y) / centerY) * 25;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const getImageUrl = (logoPath) => {
    if (!logoPath) return null;
    if (logoPath.startsWith('http')) return logoPath;
    const API_BASE_URL = 'http://localhost:8000';
    return `${API_BASE_URL}/storage/${logoPath}`;
  };

  if (!isOpen) return null;

  const imageUrl = getImageUrl(Popup.image);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center  p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-1"
        >
          <FiX className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* 3D Container */}
        <div 
          ref={containerRef}
          className="relative perspective-1000 w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '1000px' }}
        >
          <div
            className="relative transition-transform duration-100 ease-out w-full"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Shadow effect */}
            <div 
              className="absolute inset-0 bg-black opacity-20 blur-xl"
              style={{
                transform: 'translateZ(-50px)',
                filter: 'blur(30px)',
              }}
            />

            {/* Main Popup card - Only Image */}
            <div className="bg-transparent rounded-2xl shadow-2xl overflow-hidden transform-gpu w-full">
              {/* Image section only */}
              <div 
                className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl"
                style={{
                  transform: 'translateZ(50px)',
                }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Popup preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                    <span className="text-white text-4xl sm:text-6xl font-bold">
                      {Popup.titre?.charAt(0)?.toUpperCase() || 'P'}
                    </span>
                  </div>
                )}
                
                {/* Glare effect */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(${rotation.x * 2 + rotation.y * 2 + 45}deg, 
                      rgba(255,255,255,0) 0%, 
                      rgba(255,255,255,0.3) 50%, 
                      rgba(255,255,255,0) 100%)`,
                    opacity: Math.abs(rotation.x + rotation.y) / 50,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup3DPreview;