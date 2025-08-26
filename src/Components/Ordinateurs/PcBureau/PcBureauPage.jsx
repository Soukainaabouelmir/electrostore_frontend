import React, { useState, useMemo } from 'react';
import UniversalPcFilter from '../../Shared/UniversalPcFilter';
import PcBureauList from './PcBureauList';
import ProductDetails from '../../Shared/ProductDetails';

const PcBureauPage = () => {
  // État pour gérer le produit sélectionné
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const allProducts = [
   
  
    { 
      id: 5, 
      name: "Alienware HELLO  R15", 
      price: 2252699, 
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
    }
  ];

  const filteredProducts = useMemo(() => {
    console.log('Filtering products with filters:', filters);
    console.log('All products:', allProducts);
    
    const filtered = allProducts.filter(product => {
      // Prix
      if (filters.prix) {
        const [min, max] = filters.prix.includes('+') 
          ? [parseInt(filters.prix.replace('+', '')), Infinity]
          : filters.prix.split('-').map(p => parseInt(p));
        if (product.price < min || product.price > max) {
          console.log(`Product ${product.name} filtered out by price`);
          return false;
        }
      }

      // Marque
      if (filters.marque.length > 0) {
        if (!filters.marque.includes(product.marque)) {
          console.log(`Product ${product.name} filtered out by marque`);
          return false;
        }
      }

      // Processeur
      if (filters.processeur.length > 0) {
        if (!filters.processeur.includes(product.processeur)) {
          console.log(`Product ${product.name} filtered out by processeur`);
          return false;
        }
      }

      // Carte Graphique
      if (filters.carteGraphique.length > 0) {
        if (!filters.carteGraphique.includes(product.carteGraphique)) {
          console.log(`Product ${product.name} filtered out by carteGraphique`);
          return false;
        }
      }

      // RAM
      if (filters.ram.length > 0) {
        const hasRamMatch = filters.ram.some(ram => {
          if (ram === 'ddr4' || ram === 'ddr5') {
            return product.features && product.features.some(feature => 
              feature.toLowerCase().includes(ram)
            );
          }
          return product.ram === ram;
        });
        if (!hasRamMatch) {
          console.log(`Product ${product.name} filtered out by RAM`);
          return false;
        }
      }

      // Stockage
      if (filters.stockage.length > 0) {
        const hasStorageMatch = filters.stockage.some(storage => {
          return product.stockage === storage || 
                 (product.features && product.features.some(feature => 
                   feature.toLowerCase().includes(storage.replace('-', ' '))
                 ));
        });
        if (!hasStorageMatch) {
          console.log(`Product ${product.name} filtered out by stockage`);
          return false;
        }
      }

      // Performance
      if (filters.performance) {
        if (product.performance !== filters.performance) {
          console.log(`Product ${product.name} filtered out by performance`);
          return false;
        }
      }

      // Disponibilité
      if (filters.disponibilite) {
        if (product.disponibilite !== filters.disponibilite) {
          console.log(`Product ${product.name} filtered out by disponibilite`);
          return false;
        }
      }

      // Promotion
      if (filters.promotion) {
        if (!product.promotion) {
          console.log(`Product ${product.name} filtered out by promotion`);
          return false;
        }
      }

      return true;
    });

    console.log('Filtered products:', filtered);
    return filtered;
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    console.log('Filter change:', newFilters);
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    console.log('Clearing all filters');
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

  const handleProductSelect = (product) => {
    console.log('Product selected:', product);
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    console.log('Back to list');
    setSelectedProduct(null);
  };

  console.log('Rendering PcBureauPage');
  console.log('selectedProduct:', selectedProduct);
  console.log('filteredProducts length:', filteredProducts.length);

  return (
    <div className="min-h-screen bg-white dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-1 text-center py-4 md:text-left"></div>
        
        {!selectedProduct ? (
          <div className="flex flex-col md:flex-row gap-1">
            <UniversalPcFilter 
              onFilterChange={handleFilterChange} 
              onClearFilters={handleClearFilters} 
            />
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <PcBureauList 
                  products={filteredProducts} 
                  onProductSelect={handleProductSelect}
                />
              ) : (
                <div className="text-center py-12">
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
        ) : (
  
          <ProductDetails 
            productId={selectedProduct.id} 
            onClose={handleBackToList}
          />
        )}
      </div>
    </div>
  );
};

export default PcBureauPage;