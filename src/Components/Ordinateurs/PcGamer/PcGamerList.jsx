import { useState } from 'react';
import PcGamerCard from './PcGamerCard';

const PcGamerList = ({ products = [], onProductSelect }) => {
  
  const handleViewDetails = (product) => {
    // Vérification et gestion d'erreur
    if (!onProductSelect) {
      console.error('onProductSelect prop is missing in PcGamerList');
      return;
    }
    
    if (typeof onProductSelect !== 'function') {
      console.error('onProductSelect is not a function, received:', typeof onProductSelect);
      return;
    }

    onProductSelect(product);
  };

  // Vérification des produits
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">Aucun produit à afficher</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 px-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
      {products.map(product => (
        <PcGamerCard 
          key={product.id} 
          product={product} 
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
};

export default PcGamerList;