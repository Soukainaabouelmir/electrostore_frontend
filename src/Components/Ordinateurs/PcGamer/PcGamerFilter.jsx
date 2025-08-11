import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiFilter, FiX } from "react-icons/fi";

const PcGamerFilter = ({ onFilterChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    prix: true,
    marque: true,
    processeur: true,
    carteGraphique: true,
    ram: true,
    stockage: false,
    performance: true,
    disponibilite: false
  });

  const [filters, setFilters] = useState({
    prixMin: 0,
    prixMax: 3000,
    marque: [],
    processeur: [],
    carteGraphique: [],
    ram: [],
    stockage: [],
    performance: '',
    disponibilite: '',
    promotion: false
  });

  const [showFilters, setShowFilters] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (category, value, isChecked = null) => {
    let newFilters = { ...filters };
    
    if (Array.isArray(filters[category])) {
      if (isChecked) {
        newFilters[category] = [...filters[category], value];
      } else {
        newFilters[category] = filters[category].filter(item => item !== value);
      }
    } else if (typeof filters[category] === 'boolean') {
      newFilters[category] = !filters[category];
    } else {
      newFilters[category] = value;
    }
    
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (type, value) => {
    const newFilters = { ...filters, [type]: parseInt(value) };
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      prixMin: 0,
      prixMax: 3000,
      marque: [],
      processeur: [],
      carteGraphique: [],
      ram: [],
      stockage: [],
      performance: '',
      disponibilite: '',
      promotion: false
    };
    setFilters(clearedFilters);
    onClearFilters && onClearFilters();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const filterSections = [
    {
      id: 'prix',
      title: '💰 Budget',
      type: 'priceRange',
      component: () => (
        <div className="space-y-4 px-2">
          {/* Affichage des valeurs actuelles */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {formatPrice(filters.prixMin)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">à</span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {formatPrice(filters.prixMax)}
            </span>
          </div>

          {/* Slider pour prix minimum */}
          <div className="space-y-2">
            <label className="text-xs text-gray-600 dark:text-gray-400 block">Prix minimum</label>
            <input
              type="range"
              min="0"
              max="2800"
              step="100"
              value={filters.prixMin}
              onChange={(e) => handlePriceRangeChange('prixMin', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider-thumb-blue"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(filters.prixMin / 2800) * 100}%, #e5e7eb ${(filters.prixMin / 2800) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
              <span>0€</span>
              <span>2800€</span>
            </div>
          </div>

          {/* Slider pour prix maximum */}
          <div className="space-y-2">
            <label className="text-xs text-gray-600 dark:text-gray-400 block">Prix maximum</label>
            <input
              type="range"
              min="200"
              max="3000"
              step="100"
              value={filters.prixMax}
              onChange={(e) => handlePriceRangeChange('prixMax', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider-thumb-blue"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((filters.prixMax - 200) / 2800) * 100}%, #e5e7eb ${((filters.prixMax - 200) / 2800) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
              <span>200€</span>
              <span>3000€+</span>
            </div>
          </div>

          {/* Presets rapides */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[
              { min: 0, max: 500, label: '< 500€', color: 'bg-green-100 text-green-800 border-green-200' },
              { min: 500, max: 800, label: '500-800€', color: 'bg-blue-100 text-blue-800 border-blue-200' },
              { min: 800, max: 1200, label: '800-1200€', color: 'bg-purple-100 text-purple-800 border-purple-200' },
              { min: 1200, max: 1800, label: '1200-1800€', color: 'bg-orange-100 text-orange-800 border-orange-200' },
              { min: 1800, max: 2500, label: '1800-2500€', color: 'bg-red-100 text-red-800 border-red-200' },
              { min: 2500, max: 3000, label: '> 2500€', color: 'bg-red-200 text-red-900 border-red-300' }
            ].map((preset, index) => (
              <button
                key={index}
                onClick={() => {
                  handlePriceRangeChange('prixMin', preset.min);
                  handlePriceRangeChange('prixMax', preset.max);
                }}
                className={`text-xs px-2 py-1 rounded border transition-all hover:shadow-sm ${preset.color} ${
                  filters.prixMin === preset.min && filters.prixMax === preset.max 
                    ? 'ring-2 ring-blue-500' 
                    : ''
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'marque',
      title: '🏭 Marque',
      type: 'checkbox',
      options: [
        { value: 'asus', label: 'ASUS', popular: true },
        { value: 'msi', label: 'MSI', popular: true },
        { value: 'alienware', label: 'Alienware' },
        { value: 'hp', label: 'HP Omen' },
        { value: 'corsair', label: 'Corsair', popular: true },
        { value: 'nzxt', label: 'NZXT' },
        { value: 'origin', label: 'Origin PC' }
      ]
    },
    {
      id: 'processeur',
      title: '⚡ Processeur',
      type: 'checkbox',
      options: [
        { value: 'intel-i5', label: 'Intel i5', popular: true },
        { value: 'intel-i7', label: 'Intel i7', popular: true },
        { value: 'intel-i9', label: 'Intel i9' },
        { value: 'amd-ryzen5', label: 'Ryzen 5', popular: true },
        { value: 'amd-ryzen7', label: 'Ryzen 7', popular: true },
        { value: 'amd-ryzen9', label: 'Ryzen 9' }
      ]
    },
    {
      id: 'carteGraphique',
      title: '🎮 GPU',
      type: 'checkbox',
      options: [
        { value: 'rtx4060', label: 'RTX 4060', popular: true },
        { value: 'rtx4060ti', label: 'RTX 4060 Ti' },
        { value: 'rtx4070', label: 'RTX 4070', popular: true },
        { value: 'rtx4070super', label: 'RTX 4070 Super' },
        { value: 'rtx4080', label: 'RTX 4080' },
        { value: 'rtx4090', label: 'RTX 4090' },
        { value: 'rx7600', label: 'RX 7600' },
        { value: 'rx7700xt', label: 'RX 7700 XT' },
        { value: 'rx7800xt', label: 'RX 7800 XT' },
        { value: 'rx7900xt', label: 'RX 7900 XT' }
      ]
    },
    {
      id: 'ram',
      title: '🧠 RAM',
      type: 'checkbox',
      options: [
        { value: '8gb', label: '8 GB' },
        { value: '16gb', label: '16 GB', popular: true },
        { value: '32gb', label: '32 GB', popular: true },
        { value: '64gb', label: '64 GB' },
        { value: 'ddr4', label: 'DDR4' },
        { value: 'ddr5', label: 'DDR5', popular: true }
      ]
    },
    {
      id: 'stockage',
      title: '💾 Stockage',
      type: 'checkbox',
      options: [
        { value: 'ssd-512', label: 'SSD 512GB', popular: true },
        { value: 'ssd-1tb', label: 'SSD 1TB', popular: true },
        { value: 'ssd-2tb', label: 'SSD 2TB' },
        { value: 'nvme', label: 'NVMe M.2', popular: true },
        { value: 'hdd-1tb', label: 'HDD 1TB' },
        { value: 'hdd-2tb', label: 'HDD 2TB' }
      ]
    },
    {
      id: 'performance',
      title: '🎯 Gaming',
      type: 'radio',
      options: [
        { value: 'entry', label: '1080p Gaming', color: 'text-green-600' },
        { value: 'mid', label: '1440p Gaming', color: 'text-blue-600' },
        { value: 'high', label: '4K Gaming', color: 'text-purple-600' },
        { value: 'enthusiast', label: '4K Ultra', color: 'text-red-600' }
      ]
    },
    {
      id: 'disponibilite',
      title: '📦 Stock',
      type: 'radio',
      options: [
        { value: 'stock', label: '✅ En stock', color: 'text-green-600' },
        { value: 'preorder', label: '⏳ Précommande', color: 'text-orange-600' },
        { value: 'coming', label: '🔜 Bientôt', color: 'text-blue-600' }
      ]
    }
  ];

  const FilterSection = ({ section }) => {
    const isExpanded = expandedSections[section.id];
    
    return (
      <div className="mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">
        <button
          onClick={() => toggleSection(section.id)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2 py-1"
        >
          <span className="text-sm flex items-center">
            {section.title}
          </span>
          {isExpanded ? (
            <FiChevronUp size={14} className="text-gray-400" />
          ) : (
            <FiChevronDown size={14} className="text-gray-400" />
          )}
        </button>
        
        {isExpanded && (
          <div className="space-y-1 pl-2">
            {section.type === 'priceRange' ? (
              section.component()
            ) : (
              section.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors group"
                >
                  <input
                    type={section.type}
                    name={section.id}
                    value={option.value}
                    checked={
                      section.type === 'radio' 
                        ? filters[section.id] === option.value
                        : filters[section.id].includes(option.value)
                    }
                    onChange={(e) => {
                      if (section.type === 'radio') {
                        handleFilterChange(section.id, option.value);
                      } else {
                        handleFilterChange(section.id, option.value, e.target.checked);
                      }
                    }}
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className={`text-xs flex-1 ${
                    option.color || 'text-gray-700 dark:text-gray-300'
                  } ${option.popular ? 'font-medium' : ''}`}>
                    {option.label}
                    {option.popular && (
                      <span className="ml-1 text-xs bg-blue-100 text-blue-600 px-1 rounded">★</span>
                    )}
                  </span>
                </label>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  const hasActiveFilters = Object.values(filters).some(filter => 
    Array.isArray(filter) ? filter.length > 0 : filter !== '' && filter !== false
  ) || filters.prixMin !== 0 || filters.prixMax !== 3000;

  const activeFiltersCount = Object.values(filters).reduce((count, filter) => 
    Array.isArray(filter) ? count + filter.length : 
    (filter !== '' && filter !== false) ? count + 1 : count, 0
  ) + (filters.prixMin !== 0 || filters.prixMax !== 3000 ? 1 : 0);

  const FilterContent = () => (
    <div className="h-full overflow-y-auto">
      <style jsx>{`
        .slider-thumb-blue::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider-thumb-blue::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* Header compact */}
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white dark:bg-[#1e1e1e] pb-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 flex items-center">
          <FiFilter className="mr-2" size={16} />
          Filtres
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded"
          >
            <FiX className="mr-1" size={12} />
            Reset
          </button>
        )}
      </div>

      {/* Promotion spéciale - version compacte */}
      <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.promotion}
            onChange={() => handleFilterChange('promotion')}
            className="w-3 h-3 text-yellow-600 bg-yellow-100 border-yellow-300 rounded focus:ring-yellow-500"
          />
          <div>
            <span className="text-xs font-semibold text-yellow-800 dark:text-yellow-200 flex items-center">
              🔥 Promos exclusives
            </span>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 opacity-80">
              Uniquement les offres spéciales
            </p>
          </div>
        </label>
      </div>

      {/* Filter Sections - version compacte */}
      <div className="space-y-1">
        {filterSections.map((section) => (
          <FilterSection key={section.id} section={section} />
        ))}
      </div>

      {/* Résumé des filtres actifs */}
      {hasActiveFilters && (
        <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-300 text-center">
            🎯 <strong>{activeFiltersCount}</strong> critère(s) sélectionné(s)
          </p>
          {(filters.prixMin !== 0 || filters.prixMax !== 3000) && (
            <p className="text-xs text-blue-700 dark:text-blue-300 text-center mt-1">
              Budget: {formatPrice(filters.prixMin)} - {formatPrice(filters.prixMax)}
            </p>
          )}
        </div>
      )}

      {/* Call-to-action pour mobile */}
      <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleFilters}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Voir les résultats
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Bouton mobile optimisé */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="w-full flex items-center justify-between p-3 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="flex items-center text-gray-800 dark:text-gray-200 font-medium text-sm">
            <FiFilter className="mr-2" size={16} />
            Filtrer les PC Gaming
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </span>
          {showFilters ? (
            <FiChevronUp size={18} className="text-gray-600 dark:text-gray-400" />
          ) : (
            <FiChevronDown size={18} className="text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Panel des filtres optimisé */}
      <aside className={`
        w-full md:w-1/4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e]
        ${showFilters ? 'block' : 'hidden md:block'}
        transition-all duration-300 ease-in-out
        ${showFilters ? 'fixed md:relative inset-0 md:inset-auto z-50 md:z-auto' : 'relative'}
      `}>
        <div className="p-3 h-full">
          <FilterContent />
        </div>
      </aside>

      {/* Overlay pour mobile */}
      {showFilters && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleFilters}
        />
      )}
    </>
  );
};

export default PcGamerFilter;