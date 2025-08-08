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
    prix: '',
    marque: [],
    processeur: [],
    carteGraphique: [],
    ram: [],
    stockage: [],
    performance: '',
    disponibilite: '',
    promotion: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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

  const clearAllFilters = () => {
    const clearedFilters = {
      prix: '',
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

  const filterSections = [
    {
      id: 'prix',
      title: 'Prix',
      type: 'radio',
      options: [
        { value: '0-500', label: 'Moins de 500€' },
        { value: '500-800', label: '500€ - 800€' },
        { value: '800-1200', label: '800€ - 1200€' },
        { value: '1200-1800', label: '1200€ - 1800€' },
        { value: '1800-2500', label: '1800€ - 2500€' },
        { value: '2500+', label: 'Plus de 2500€' }
      ]
    },
    {
      id: 'marque',
      title: 'Marque',
      type: 'checkbox',
      options: [
        { value: 'asus', label: 'ASUS' },
        { value: 'msi', label: 'MSI' },
        { value: 'alienware', label: 'Alienware' },
        { value: 'hp', label: 'HP Omen' },
        { value: 'corsair', label: 'Corsair' },
        { value: 'nzxt', label: 'NZXT' },
        { value: 'origin', label: 'Origin PC' }
      ]
    },
    {
      id: 'processeur',
      title: 'Processeur',
      type: 'checkbox',
      options: [
        { value: 'intel-i5', label: 'Intel Core i5' },
        { value: 'intel-i7', label: 'Intel Core i7' },
        { value: 'intel-i9', label: 'Intel Core i9' },
        { value: 'amd-ryzen5', label: 'AMD Ryzen 5' },
        { value: 'amd-ryzen7', label: 'AMD Ryzen 7' },
        { value: 'amd-ryzen9', label: 'AMD Ryzen 9' }
      ]
    },
    {
      id: 'carteGraphique',
      title: 'Carte Graphique',
      type: 'checkbox',
      options: [
        { value: 'rtx4060', label: 'RTX 4060' },
        { value: 'rtx4060ti', label: 'RTX 4060 Ti' },
        { value: 'rtx4070', label: 'RTX 4070' },
        { value: 'rtx4070super', label: 'RTX 4070 Super' },
        { value: 'rtx4080', label: 'RTX 4080' },
        { value: 'rtx4090', label: 'RTX 4090' },
        { value: 'rx7600', label: 'AMD RX 7600' },
        { value: 'rx7700xt', label: 'AMD RX 7700 XT' },
        { value: 'rx7800xt', label: 'AMD RX 7800 XT' },
        { value: 'rx7900xt', label: 'AMD RX 7900 XT' }
      ]
    },
    {
      id: 'ram',
      title: 'Mémoire RAM',
      type: 'checkbox',
      options: [
        { value: '8gb', label: '8 GB' },
        { value: '16gb', label: '16 GB' },
        { value: '32gb', label: '32 GB' },
        { value: '64gb', label: '64 GB' },
        { value: 'ddr4', label: 'DDR4' },
        { value: 'ddr5', label: 'DDR5' }
      ]
    },
    {
      id: 'stockage',
      title: 'Stockage',
      type: 'checkbox',
      options: [
        { value: 'ssd-256', label: 'SSD 256 GB' },
        { value: 'ssd-512', label: 'SSD 512 GB' },
        { value: 'ssd-1tb', label: 'SSD 1 TB' },
        { value: 'ssd-2tb', label: 'SSD 2 TB' },
        { value: 'hdd-1tb', label: 'HDD 1 TB' },
        { value: 'hdd-2tb', label: 'HDD 2 TB' },
        { value: 'nvme', label: 'NVMe M.2' }
      ]
    },
    {
      id: 'performance',
      title: 'Niveau de Performance',
      type: 'radio',
      options: [
        { value: 'entry', label: 'Entrée de gamme (1080p)' },
        { value: 'mid', label: 'Milieu de gamme (1440p)' },
        { value: 'high', label: 'Haut de gamme (4K)' },
        { value: 'enthusiast', label: 'Enthusiast (4K Ultra)' }
      ]
    },
    {
      id: 'disponibilite',
      title: 'Disponibilité',
      type: 'radio',
      options: [
        { value: 'stock', label: 'En stock' },
        { value: 'preorder', label: 'Précommande' },
        { value: 'coming', label: 'Bientôt disponible' }
      ]
    }
  ];

  const FilterSection = ({ section }) => {
    const isExpanded = expandedSections[section.id];
    
    return (
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection(section.id)}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-3"
        >
          <span className="flex items-center">
            <FiFilter className="mr-2" size={16} />
            {section.title}
          </span>
          {isExpanded ? (
            <FiChevronUp size={18} />
          ) : (
            <FiChevronDown size={18} />
          )}
        </button>
        
        {isExpanded && (
          <div className="space-y-2 pl-4">
            {section.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const hasActiveFilters = Object.values(filters).some(filter => 
    Array.isArray(filter) ? filter.length > 0 : filter !== '' && filter !== false
  );

  return (
    <aside className="w-full md:w-1/4 p-4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
          <FiFilter className="mr-2" />
          Filtres
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            <FiX className="mr-1" size={14} />
            Tout effacer
          </button>
        )}
      </div>

      {/* Promotion spéciale */}
      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.promotion}
            onChange={() => handleFilterChange('promotion')}
            className="w-4 h-4 text-yellow-600 bg-yellow-100 border-yellow-300 rounded focus:ring-yellow-500"
          />
          <div>
            <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
              🔥 Promotions
            </span>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              Articles en promotion uniquement
            </p>
          </div>
        </label>
      </div>

      {/* Filter Sections */}
      <div className="space-y-2">
        {filterSections.map((section) => (
          <FilterSection key={section.id} section={section} />
        ))}
      </div>

      {/* Nombre de filtres actifs */}
      {hasActiveFilters && (
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>
              {Object.values(filters).reduce((count, filter) => 
                Array.isArray(filter) ? count + filter.length : 
                (filter !== '' && filter !== false) ? count + 1 : count, 0
              )}
            </strong> filtre(s) actif(s)
          </p>
        </div>
      )}
    </aside>
  );
};

export default PcGamerFilter;