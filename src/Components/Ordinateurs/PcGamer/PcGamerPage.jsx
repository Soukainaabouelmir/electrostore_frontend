import React, { useState, useMemo } from 'react';
import PcGamerFilter from './PcGamerFilter';
import PcGamerList from './PcGamerList';

const PcGamerPage = () => {
  // État pour les filtres
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

  // Données des produits (vous pouvez les remplacer par vos vraies données)
  const allProducts = [
    { 
      id: 1, 
      name: "PC Gamer RTX 4070 - ASUS ROG", 
      price: 1299, 
      original_price: 1499,
      image_url: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop",
      marque: "asus",
      processeur: "intel-i7",
      carteGraphique: "rtx4070",
      ram: "16gb",
      stockage: "ssd-1tb",
      performance: "high",
      disponibilite: "stock",
      features: ["RTX 4070", "Intel i7", "16GB DDR4"],
      promotion: true
    },
    { 
      id: 2, 
      name: "PC Gaming MSI Aegis RS 13", 
      price: 1599, 
      original_price: 1799,
      image_url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop",
      marque: "msi",
      processeur: "intel-i9",
      carteGraphique: "rtx4080",
      ram: "32gb",
      stockage: "ssd-2tb",
      performance: "enthusiast",
      disponibilite: "stock",
      features: ["RTX 4080", "Intel i9", "32GB DDR5"],
      promotion: true
    },
    { 
      id: 3, 
      name: "Alienware Aurora R15", 
      price: 2299, 
      image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
      marque: "alienware",
      processeur: "intel-i9",
      carteGraphique: "rtx4090",
      ram: "32gb",
      stockage: "ssd-2tb",
      performance: "enthusiast",
      disponibilite: "stock",
      features: ["RTX 4090", "Intel i9", "32GB DDR5"],
      promotion: false
    },
    { 
      id: 4, 
      name: "HP Omen 45L Gaming Desktop", 
      price: 899, 
      original_price: 1099,
      image_url: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop",
      marque: "hp",
      processeur: "amd-ryzen7",
      carteGraphique: "rtx4060ti",
      ram: "16gb",
      stockage: "ssd-512",
      performance: "mid",
      disponibilite: "stock",
      features: ["RTX 4060 Ti", "Ryzen 7", "16GB DDR4"],
      promotion: true
    },
    { 
      id: 5, 
      name: "NZXT BLD Gaming PC", 
      price: 1899, 
      image_url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop",
      marque: "nzxt",
      processeur: "amd-ryzen9",
      carteGraphique: "rx7900xt",
      ram: "32gb",
      stockage: "nvme",
      performance: "high",
      disponibilite: "preorder",
      features: ["RX 7900 XT", "Ryzen 9", "32GB DDR5"],
      promotion: false
    },
    { 
      id: 6, 
      name: "Corsair iCUE Gaming PC", 
      price: 749, 
      original_price: 899,
      image_url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      marque: "corsair",
      processeur: "amd-ryzen5",
      carteGraphique: "rtx4060",
      ram: "16gb",
      stockage: "ssd-512",
      performance: "entry",
      disponibilite: "stock",
      features: ["RTX 4060", "Ryzen 5", "16GB DDR4"],
      promotion: true
    }
  ];

  // Fonction de filtrage
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Filtre prix
      if (filters.prix) {
        const [min, max] = filters.prix.includes('+') 
          ? [parseInt(filters.prix.replace('+', '')), Infinity]
          : filters.prix.split('-').map(p => parseInt(p));
        if (product.price < min || product.price > max) return false;
      }

      // Filtre marque
      if (filters.marque.length > 0) {
        if (!filters.marque.includes(product.marque)) return false;
      }

      // Filtre processeur
      if (filters.processeur.length > 0) {
        if (!filters.processeur.includes(product.processeur)) return false;
      }

      // Filtre carte graphique
      if (filters.carteGraphique.length > 0) {
        if (!filters.carteGraphique.includes(product.carteGraphique)) return false;
      }

      // Filtre RAM
      if (filters.ram.length > 0) {
        const hasRamMatch = filters.ram.some(ram => {
          if (ram === 'ddr4' || ram === 'ddr5') {
            return product.features.some(feature => 
              feature.toLowerCase().includes(ram)
            );
          }
          return product.ram === ram;
        });
        if (!hasRamMatch) return false;
      }

      // Filtre stockage
      if (filters.stockage.length > 0) {
        const hasStorageMatch = filters.stockage.some(storage => {
          return product.stockage === storage || 
                 product.features.some(feature => 
                   feature.toLowerCase().includes(storage.replace('-', ' '))
                 );
        });
        if (!hasStorageMatch) return false;
      }

      // Filtre performance
      if (filters.performance) {
        if (product.performance !== filters.performance) return false;
      }

      // Filtre disponibilité
      if (filters.disponibilite) {
        if (product.disponibilite !== filters.disponibilite) return false;
      }

      // Filtre promotion
      if (filters.promotion) {
        if (!product.promotion) return false;
      }

      return true;
    });
  }, [filters]);

  // Gestion des changements de filtres
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Effacement de tous les filtres
  const handleClearFilters = () => {
    setFilters({
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
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#141414] ">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la page */}
        <div className="mb-6 text-center py-4 md:text-left">
          <h1 className="text-2xl text-center md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PC Gamer
          </h1>
          <p className="text-gray-600 text-center dark:text-gray-300">
            Trouvez le PC gaming parfait pour vos besoins
          </p>
          
          {/* Compteur de produits */}
          <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            {filteredProducts.length !== allProducts.length && (
              <span> sur {allProducts.length} au total</span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtres */}
          <PcGamerFilter 
            onFilterChange={handleFilterChange} 
            onClearFilters={handleClearFilters} 
          />
          
          {/* Liste des produits */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <PcGamerList products={filteredProducts} />
            ) : (
              <div className="text-center py-2">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Essayez de modifier vos critères de recherche
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Effacer tous les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcGamerPage;