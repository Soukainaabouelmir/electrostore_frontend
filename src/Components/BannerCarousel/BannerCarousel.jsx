import React, { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiExternalLink } from "react-icons/fi";

const BannerCarousel = () => {
  // Données des bannières améliorées avec contenu
  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "PC Gamer RGB Gaming Setup",
      title: "PC GAMER ULTIMATE",
      subtitle: "Jusqu'à -30% sur nos configs gaming",
      description: "Découvrez nos PC Gaming hautes performances avec RGB et refroidissement liquide",
      cta: "Découvrir",
      gradient: "from-purple-900/80 via-blue-900/70 to-transparent"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "Nouvelle technologie",
      title: "NOUVEAUTÉS 2025",
      subtitle: "Les derniers processeurs et cartes graphiques",
      description: "Soyez les premiers à découvrir les nouvelles technologies",
      cta: "Voir plus",
      gradient: "from-green-900/80 via-emerald-800/70 to-transparent"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "Composants PC",
      title: "COMPOSANTS PRO",
      subtitle: "Assemblage personnalisé offert",
      description: "Créez votre configuration sur mesure avec nos experts",
      cta: "Configurer",
      gradient: "from-orange-900/80 via-red-800/70 to-transparent"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "Périphériques gaming",
      title: "PÉRIPHÉRIQUES GAMING",
      subtitle: "Pack clavier + souris à partir de 89€",
      description: "Équipez-vous avec les meilleurs accessoires gaming",
      cta: "Shop Now",
      gradient: "from-indigo-900/80 via-purple-800/70 to-transparent"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-scroll avec pause au survol
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [banners.length, isPlaying, isHovered]);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  }, [banners.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  }, [banners.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Touch handlers pour mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Gestion du chargement des images
  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPrevious, goToNext, isPlaying]);

  return (
    <div 
      className="relative w-full dark:!bg-gray-900 h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden bg-gray-900 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Conteneur des slides avec parallax */}
      <div 
        className="flex transition-transform duration-700 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div 
            key={banner.id}
            className="w-full flex-shrink-0 relative overflow-hidden"
          >
            {/* Image avec effet parallax */}
            <div 
              className={`absolute inset-0 transition-transform duration-700 ${
                index === currentIndex ? 'scale-100' : 'scale-105'
              }`}
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded[banner.id] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(banner.id)}
                loading={index <= 1 ? "eager" : "lazy"}
              />
              
              {/* Overlay gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
            </div>

            {/* Contenu texte */}
            <div className="absolute inset-0 flex items-center justify-start z-10">
              <div className="px-6 sm:px-12 lg:px-20 xl:px-32 max-w-4xl">
                <div className={`transform transition-all duration-700 delay-300 ${
                  index === currentIndex 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}>
                  {/* Badge/Tag */}
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium mb-3 border border-white/30">
                    Offre limitée
                  </div>
                  
                  {/* Titre principal */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                    {banner.title}
                  </h2>
                  
                  {/* Sous-titre */}
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-3 sm:mb-6 font-light">
                    {banner.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 sm:mb-8 max-w-2xl leading-relaxed hidden sm:block">
                    {banner.description}
                  </p>
                  
                  {/* CTA Button */}
                  <button className="group/btn inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <span className="mr-2">{banner.cta}</span>
                    <FiExternalLink className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flèches de navigation améliorées */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 lg:p-4 rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110 border border-white/30"
        aria-label="Slide précédent"
      >
        <FiChevronLeft size={24} className="lg:w-6 lg:h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 lg:p-4 rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110 border border-white/30"
        aria-label="Slide suivant"
      >
        <FiChevronRight size={24} className="lg:w-6 lg:h-6" />
      </button>

      {/* Contrôle play/pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 lg:top-8 lg:right-8 bg-white/20 backdrop-blur-sm text-white p-2 lg:p-3 rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 border border-white/30"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
      </button>

      {/* Indicateurs de slide redesignés */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative overflow-hidden rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'w-8 sm:w-12 h-2 sm:h-3 bg-white' 
                : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Aller à la slide ${index + 1}`}
          >
            {currentIndex === index && (
              <div 
                className="absolute top-0 left-0 h-full bg-white/80 animate-progress"
                style={{
                  animation: isPlaying && !isHovered ? 'progress 6s linear infinite' : 'none'
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {isPlaying && !isHovered && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-100 animate-progress-bar"
            style={{
              animation: 'progressBar 6s linear infinite'
            }}
          />
        </div>
      )}

      {/* Loading spinner pour les images */}
      {!imageLoaded[banners[currentIndex]?.id] && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .animate-progress {
          animation: progress 6s linear infinite;
        }
        
        .animate-progress-bar {
          animation: progressBar 6s linear infinite;
        }
        
        /* Pause animation au survol */
        .group:hover .animate-progress,
        .group:hover .animate-progress-bar {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default BannerCarousel;