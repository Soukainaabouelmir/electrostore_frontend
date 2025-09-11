import React, { useState, useEffect } from "react";
import { 
  FiMonitor, 
  FiHeadphones, 
  FiCpu,  
  FiTrendingUp,
  FiZap,
  FiStar
} from "react-icons/fi";
import { FaMouse, FaKeyboard } from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "PC Gamer",
    subtitle: "Hautes Performances",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    route: "/category/pc-gamer",
    icon: <FiMonitor />,
    gradient: "from-purple-600 via-blue-600 to-indigo-700",
    bgColor: "bg-gradient-to-br from-purple-50 to-blue-50",
    count: "150+ produits",
    badge: "Populaire",
    glowColor: "shadow-purple-500/30"
  },
  {
    id: 2,
    name: "Claviers Gaming",
    subtitle: "Mécaniques & RGB",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    route: "/category/claviers",
    icon: <FaKeyboard />,
    gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    count: "80+ modèles",
    badge: "Nouveau",
    glowColor: "shadow-emerald-500/30"
  },
  {
    id: 3,
    name: "Écrans 4K",
    subtitle: "Gaming & Pro",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    route: "/category/ecrans",
    icon: <FiMonitor />,
    gradient: "from-orange-600 via-red-600 to-pink-700",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    count: "60+ écrans",
    badge: "Tendance",
    glowColor: "shadow-orange-500/30"
  },
  {
    id: 4,
    name: "Souris Pro",
    subtitle: "Gaming & Bureautique",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    route: "/category/souris",
    icon: <FaMouse />,
    gradient: "from-indigo-600 via-purple-600 to-pink-700",
    bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50",
    count: "45+ souris",
    badge: "Promo",
    glowColor: "shadow-indigo-500/30"
  },
  {
    id: 5,
    name: "Audio Gaming",
    subtitle: "Casques & Micros",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    route: "/category/audio",
    icon: <FiHeadphones />,
    gradient: "from-cyan-600 via-blue-600 to-indigo-700",
    bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
    count: "70+ produits",
    badge: "Top Vente",
    glowColor: "shadow-cyan-500/30"
  },
  {
    id: 6,
    name: "Composants",
    subtitle: "CPU, GPU & Plus",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    route: "/category/composants",
    icon: <FiCpu />,
    gradient: "from-yellow-600 via-orange-600 to-red-700",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
    count: "200+ composants",
    badge: "Expert",
    glowColor: "shadow-yellow-500/30"
  }
];

const CategoryCard = ({ category, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getBadgeIcon = (badge) => {
    switch(badge) {
      case "Populaire": return <FiTrendingUp className="w-3 h-3" />;
      case "Nouveau": return <FiZap className="w-3 h-3" />;
      case "Tendance": return <FiStar className="w-3 h-3" />;
      default: return <FiZap className="w-3 h-3" />;
    }
  };

  const getBadgeColor = (badge) => {
    switch(badge) {
      case "Populaire": return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "Nouveau": return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "Tendance": return "bg-gradient-to-r from-orange-500 to-red-500";
      case "Promo": return "bg-gradient-to-r from-blue-500 to-indigo-500";
      case "Top Vente": return "bg-gradient-to-r from-cyan-500 to-blue-500";
      case "Expert": return "bg-gradient-to-r from-yellow-500 to-orange-500";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  return (
    <div 
      className={`group relative bg-white dark:bg-[#141414] block overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${category.glowColor} hover:shadow-2xl cursor-pointer`}
      style={{
        animationDelay: `${index * 0.1}s`,
        transform: isHovered ? 'perspective(1000px) rotateX(5deg) rotateY(5deg)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 ${category.bgColor} dark:opacity-10 opacity-20`} />
      
      <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 animate-pulse" />
        )}
        
        <img
          src={category.image}
          alt={category.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ${isHovered ? 'animate-shine' : ''}`} />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <div className={`flex items-center space-x-1 px-3 py-1.5 ${getBadgeColor(category.badge)} text-white text-xs font-bold rounded-full shadow-lg transform ${isHovered ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
          {getBadgeIcon(category.badge)}
          <span>{category.badge}</span>
        </div>
      </div>

      <div className="absolute top-4 left-4 z-20">
        <div className={`p-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full border border-white/30 dark:border-gray-600/30 text-white transition-all duration-300 ${isHovered ? 'scale-110 rotate-12' : 'scale-100'}`}>
          {React.cloneElement(category.icon, { className: "w-6 h-6" })}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <div className={`transform transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}`}>
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30 dark:border-gray-600/30">
              {category.count}
            </span>
          </div>
          
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-white/90 text-sm lg:text-base mb-4 font-medium">
            {category.subtitle}
          </p>
          
          <div className={`transform transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button className="group/btn relative overflow-hidden px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <span className="relative z-10 flex items-center">
                Découvrir
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </div>
        </div>
      </div>

      {isHovered && (
        <>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/50 rounded-full animate-ping" style={{animationDelay: '0s'}} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300/70 rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" style={{animationDelay: '1s'}} />
        </>
      )}
    </div>
  );
};

function CategorySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('category-section');
    if (section) observer.observe(section);
    return () => observer.disconnect();
    
  }, []);

  return (
    <section 
      id="category-section"
      className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden bg-white dark:!bg-[#141414]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 opacity-30 dark:opacity-20" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl" />
      
      <div className={`text-center mb-16 relative z-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full mb-4">
          Catégories Populaires
        </div>
        <h2 className="text-4xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Explorez Nos
          </span>
          <br />
          <span className="text-gray-900 dark:text-white">Univers Gaming</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Découvrez notre sélection premium de produits gaming et informatiques, 
          choisis par nos experts pour des performances exceptionnelles.
        </p>
      </div>
      
      <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CategoryCard category={category} index={index} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(300%) skewX(-12deg); }
        }

        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
        
        .animate-shine {
        animation: shine 1.5s ease-in-out;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default CategorySection;