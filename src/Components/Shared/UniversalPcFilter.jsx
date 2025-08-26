import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiFilter } from "react-icons/fi";

const UniversalPcFilter = ({ pcType = 'all', onFilterChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    prix: true,
    marque: false,
    processeur: false,
    carteGraphique: pcType === 'gaming',
    ram: false,
    stockage: false,
    usage: false,
    caracteristiques: pcType === 'portable',
    disponibilite: false
  });

  const [filters, setFilters] = useState({
    prixMin: pcType === 'gaming' ? 0 : 0,
    prixMax: pcType === 'gaming' ? 3000 : pcType === 'portable' ? 2000 : 1500,
    marque: [],
    processeur: [],
    carteGraphique: [],
    ram: [],
    stockage: [],
    usage: '',
    caracteristiques: [],
    disponibilite: '',
    promotion: false
  });

  const [showFilters, setShowFilters] = useState(false);

  // Configuration dynamique selon le type de PC
  const getFilterConfig = () => {
    const baseConfig = {
      prix: {
        gaming: { min: 0, max: 3000, presets: [
          { min: 800, max: 1200, label: '800-1200€', color: 'bg-green-100 text-green-800' },
          { min: 1200, max: 1800, label: '1200-1800€', color: 'bg-blue-100 text-blue-800' },
          { min: 1800, max: 2500, label: '1800-2500€', color: 'bg-purple-100 text-purple-800' },
          { min: 2500, max: 3000, label: '> 2500€', color: 'bg-red-100 text-red-800' }
        ]},
        portable: { min: 0, max: 2000, presets: [
          { min: 0, max: 400, label: '< 400€', color: 'bg-green-100 text-green-800' },
          { min: 400, max: 800, label: '400-800€', color: 'bg-blue-100 text-blue-800' },
          { min: 800, max: 1200, label: '800-1200€', color: 'bg-purple-100 text-purple-800' },
          { min: 1200, max: 2000, label: '> 1200€', color: 'bg-red-100 text-red-800' }
        ]},
        bureau: { min: 0, max: 1500, presets: [
          { min: 0, max: 300, label: '< 300€', color: 'bg-green-100 text-green-800' },
          { min: 300, max: 600, label: '300-600€', color: 'bg-blue-100 text-blue-800' },
          { min: 600, max: 1000, label: '600-1000€', color: 'bg-purple-100 text-purple-800' },
          { min: 1000, max: 1500, label: '> 1000€', color: 'bg-red-100 text-red-800' }
        ]},
        all: { min: 0, max: 3000, presets: [
          { min: 0, max: 500, label: '< 500€', color: 'bg-green-100 text-green-800' },
          { min: 500, max: 1000, label: '500-1000€', color: 'bg-blue-100 text-blue-800' },
          { min: 1000, max: 2000, label: '1000-2000€', color: 'bg-purple-100 text-purple-800' },
          { min: 2000, max: 3000, label: '> 2000€', color: 'bg-red-100 text-red-800' }
        ]}
      }
    };

    return baseConfig.prix[pcType] || baseConfig.prix.all;
  };

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
    const priceConfig = getFilterConfig();
    const clearedFilters = {
      prixMin: 0,
      prixMax: priceConfig.max,
      marque: [],
      processeur: [],
      carteGraphique: [],
      ram: [],
      stockage: [],
      usage: '',
      caracteristiques: [],
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

  // Configuration des marques selon le type
  const getMarques = () => {
    const marques = {
      gaming: [
        { value: 'asus', label: 'ASUS ROG', popular: true },
        { value: 'msi', label: 'MSI Gaming', popular: true },
        { value: 'alienware', label: 'Alienware' },
        { value: 'hp', label: 'HP Omen' },
        { value: 'corsair', label: 'Corsair', popular: true },
        { value: 'nzxt', label: 'NZXT' },
        { value: 'origin', label: 'Origin PC' }
      ],
      portable: [
        { value: 'asus', label: 'ASUS', popular: true },
        { value: 'hp', label: 'HP', popular: true },
        { value: 'dell', label: 'Dell', popular: true },
        { value: 'lenovo', label: 'Lenovo', popular: true },
        { value: 'acer', label: 'Acer' },
        { value: 'msi', label: 'MSI' },
        { value: 'apple', label: 'Apple MacBook' },
        { value: 'surface', label: 'Microsoft Surface' }
      ],
      bureau: [
        { value: 'hp', label: 'HP', popular: true },
        { value: 'dell', label: 'Dell', popular: true },
        { value: 'lenovo', label: 'Lenovo', popular: true },
        { value: 'asus', label: 'ASUS' },
        { value: 'acer', label: 'Acer' },
        { value: 'custom', label: 'PC Assemblé', popular: true }
      ],
      all: [
        { value: 'asus', label: 'ASUS', popular: true },
        { value: 'hp', label: 'HP', popular: true },
        { value: 'dell', label: 'Dell', popular: true },
        { value: 'lenovo', label: 'Lenovo', popular: true },
        { value: 'msi', label: 'MSI' },
        { value: 'acer', label: 'Acer' },
        { value: 'alienware', label: 'Alienware' },
        { value: 'apple', label: 'Apple' }
      ]
    };
    return marques[pcType] || marques.all;
  };

  // Configuration des processeurs selon le type
  const getProcesseurs = () => {
    const processeurs = {
      gaming: [
        { value: 'intel-i5', label: 'Intel i5' },
        { value: 'intel-i7', label: 'Intel i7', popular: true },
        { value: 'intel-i9', label: 'Intel i9', popular: true },
        { value: 'amd-ryzen5', label: 'Ryzen 5' },
        { value: 'amd-ryzen7', label: 'Ryzen 7', popular: true },
        { value: 'amd-ryzen9', label: 'Ryzen 9' }
      ],
      portable: [
        { value: 'intel-i3', label: 'Intel i3' },
        { value: 'intel-i5', label: 'Intel i5', popular: true },
        { value: 'intel-i7', label: 'Intel i7', popular: true },
        { value: 'amd-ryzen3', label: 'Ryzen 3' },
        { value: 'amd-ryzen5', label: 'Ryzen 5', popular: true },
        { value: 'amd-ryzen7', label: 'Ryzen 7' },
        { value: 'apple-m1', label: 'Apple M1/M2' },
        { value: 'celeron', label: 'Celeron/Pentium' }
      ],
      bureau: [
        { value: 'intel-i3', label: 'Intel i3', popular: true },
        { value: 'intel-i5', label: 'Intel i5', popular: true },
        { value: 'intel-i7', label: 'Intel i7' },
        { value: 'amd-ryzen3', label: 'Ryzen 3' },
        { value: 'amd-ryzen5', label: 'Ryzen 5', popular: true },
        { value: 'celeron', label: 'Celeron/Pentium' }
      ],
      all: [
        { value: 'intel-i3', label: 'Intel i3' },
        { value: 'intel-i5', label: 'Intel i5', popular: true },
        { value: 'intel-i7', label: 'Intel i7', popular: true },
        { value: 'intel-i9', label: 'Intel i9' },
        { value: 'amd-ryzen3', label: 'Ryzen 3' },
        { value: 'amd-ryzen5', label: 'Ryzen 5', popular: true },
        { value: 'amd-ryzen7', label: 'Ryzen 7', popular: true },
        { value: 'amd-ryzen9', label: 'Ryzen 9' }
      ]
    };
    return processeurs[pcType] || processeurs.all;
  };

  // Configuration des cartes graphiques selon le type
  const getCartesGraphiques = () => {
    if (pcType === 'bureau') return [
      { value: 'integree', label: 'Graphiques intégrés', popular: true },
      { value: 'gtx1650', label: 'GTX 1650' },
      { value: 'rtx4060', label: 'RTX 4060' }
    ];
    
    if (pcType === 'portable') return [
      { value: 'integree', label: 'Graphiques intégrés', popular: true },
      { value: 'mx550', label: 'MX 550/570' },
      { value: 'rtx4050', label: 'RTX 4050' },
      { value: 'rtx4060', label: 'RTX 4060', popular: true },
      { value: 'rtx4070', label: 'RTX 4070' }
    ];
    
    if (pcType === 'gaming') return [
      { value: 'rtx4060', label: 'RTX 4060', popular: true },
      { value: 'rtx4060ti', label: 'RTX 4060 Ti' },
      { value: 'rtx4070', label: 'RTX 4070', popular: true },
      { value: 'rtx4070super', label: 'RTX 4070 Super' },
      { value: 'rtx4080', label: 'RTX 4080' },
      { value: 'rtx4090', label: 'RTX 4090' }
    ];

    return [
      { value: 'integree', label: 'Graphiques intégrés', popular: true },
      { value: 'rtx4060', label: 'RTX 4060', popular: true },
      { value: 'rtx4070', label: 'RTX 4070' },
      { value: 'rtx4080', label: 'RTX 4080' },
      { value: 'rtx4090', label: 'RTX 4090' }
    ];
  };

  // Configuration de l'usage selon le type


  // Configuration des caractéristiques selon le type
  const getCaracteristiques = () => {
    if (pcType === 'portable') return [
      { value: 'leger', label: '< 2kg', popular: true },
      { value: 'autonomie', label: 'Longue autonomie', popular: true },
      { value: 'ecran-14', label: 'Écran 14"' },
      { value: 'ecran-15', label: 'Écran 15.6"', popular: true },
      { value: 'ecran-17', label: 'Écran 17"' },
      { value: 'tactile', label: 'Écran tactile' },
      { value: 'convertible', label: '2-en-1 convertible' }
    ];
    
    if (pcType === 'bureau') return [
      { value: 'compact', label: 'Format compact', popular: true },
      { value: 'silencieux', label: 'Silencieux' },
      { value: 'upgrade', label: 'Évolutif', popular: true },
      { value: 'wifi', label: 'WiFi intégré' }
    ];

    if (pcType === 'gaming') return [
      { value: 'rgb', label: 'Éclairage RGB', popular: true },
      { value: 'watercooling', label: 'Watercooling' },
      { value: 'overclocking', label: 'Overclocking', popular: true },
      { value: 'multi-gpu', label: 'Multi-GPU' }
    ];

    return [];
  };

  const priceConfig = getFilterConfig();

  const filterSections = [
    {
      id: 'prix',
      title: ' Budget',
      type: 'priceRange',
      component: () => (
        <div className="space-y-4 px-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {formatPrice(filters.prixMin)}
            </span>
            <span className="text-xs text-gray-500">à</span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {formatPrice(filters.prixMax)}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-600 dark:text-gray-400">Prix minimum</label>
            <input
              type="range"
              min="0"
              max={priceConfig.max - 200}
              step="50"
              value={filters.prixMin}
              onChange={(e) => handlePriceRangeChange('prixMin', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-600 dark:text-gray-400">Prix maximum</label>
            <input
              type="range"
              min="200"
              max={priceConfig.max}
              step="50"
              value={filters.prixMax}
              onChange={(e) => handlePriceRangeChange('prixMax', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          
        </div>
      )
    },
    {
      id: 'marque',
      title: ' Marque',
      type: 'checkbox',
      options: getMarques()
    },
    {
      id: 'processeur',
      title: ' Processeur',
      type: 'checkbox',
      options: getProcesseurs()
    }
  ];

  // Ajouter la section carte graphique seulement si pertinente
  if (pcType === 'gaming' || pcType === 'portable' || pcType === 'all') {
    filterSections.push({
      id: 'carteGraphique',
      title: 'Carte graphique',
      type: 'checkbox',
      options: getCartesGraphiques()
    });
  }

  filterSections.push(
    {
      id: 'ram',
      title: ' RAM',
      type: 'checkbox',
      options: [
        { value: '4gb', label: '4 GB' },
        { value: '8gb', label: '8 GB', popular: pcType === 'bureau' },
        { value: '16gb', label: '16 GB', popular: true },
        { value: '32gb', label: '32 GB', popular: pcType === 'gaming' },
        { value: '64gb', label: '64 GB' }
      ]
    },
    {
      id: 'stockage',
      title: ' Stockage',
      type: 'checkbox',
      options: [
        { value: 'ssd-256', label: 'SSD 256GB', popular: pcType === 'portable' },
        { value: 'ssd-512', label: 'SSD 512GB', popular: true },
        { value: 'ssd-1tb', label: 'SSD 1TB', popular: pcType === 'gaming' },
        { value: 'ssd-2tb', label: 'SSD 2TB' },
        { value: 'hdd-1tb', label: 'HDD 1TB', popular: pcType === 'bureau' },
        { value: 'hdd-2tb', label: 'HDD 2TB' }
      ]
    },
   
  );

  // Ajouter caractéristiques spécifiques selon le type
  const caracteristiques = getCaracteristiques();
  if (caracteristiques.length > 0) {
    filterSections.push({
      id: 'caracteristiques',
      title: ' Caractéristiques',
      type: 'checkbox',
      options: caracteristiques
    });
  }

  filterSections.push({
    id: 'disponibilite',
    title: ' Disponibilité',
    type: 'radio',
    options: [
      { value: 'stock', label: 'En stock', color: 'text-gray-400' },
      { value: 'preorder', label: 'Précommande', color: 'text-orange-600' },
      { value: 'coming', label: 'Bientôt disponible', color: 'text-blue-600' }
    ]
  });

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
  ) || filters.prixMin !== 0 || filters.prixMax !== priceConfig.max;

  const activeFiltersCount = Object.values(filters).reduce((count, filter) => 
    Array.isArray(filter) ? count + filter.length : 
    (filter !== '' && filter !== false) ? count + 1 : count, 0
  ) + (filters.prixMin !== 0 || filters.prixMax !== priceConfig.max ? 1 : 0);

  const getFilterTitle = () => {
    const titles = {
      gaming: ' Filtres PC Gaming',
      portable: 'Filtres PC Portable',
      bureau: ' Filtres PC Bureau',
      all: 'Filtres PC'
    };
    return titles[pcType] || titles.all;
  };

  const FilterContent = () => (
    <div className="h-full dark:bg-[#141414] overflow-y-auto">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white dark:bg-[#141414] pb-2 border-b border-gray-200 dark:border-gray-700">
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
            className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
          >
            Tout effacer
          </button>
        )}
      </div>

      <div className="space-y-1">
        {filterSections.map((section) => (
          <FilterSection key={section.id} section={section} />
        ))}
      </div>

      {hasActiveFilters && (
        <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-300 text-center">
            <strong>{activeFiltersCount}</strong> critère(s) sélectionné(s)
          </p>
          {(filters.prixMin !== 0 || filters.prixMax !== priceConfig.max) && (
            <p className="text-xs text-blue-700 dark:text-blue-300 text-center mt-1">
              Budget: {formatPrice(filters.prixMin)} - {formatPrice(filters.prixMax)}
            </p>
          )}
        </div>
      )}

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
          className="w-full flex items-center justify-between p-3 bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="flex items-center text-gray-800 dark:text-gray-200 font-medium text-sm">
            <FiFilter className="mr-2" size={16} />
            {getFilterTitle()}
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
        <div className="p-3 dark:bg-[#141414] h-full">
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

export default UniversalPcFilter;