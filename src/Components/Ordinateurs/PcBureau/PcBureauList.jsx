import React from 'react';
import PcBureauCard from './PcBureauCard';

const PcBureauList = ({ products, onProductSelect }) => {
  console.log('PcBureauList - products:', products);
  console.log('PcBureauList - onProductSelect:', onProductSelect);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Aucun produit trouvé
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Ajustez vos filtres pour voir plus de résultats
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* En-tête avec nombre de résultats */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          PC Gaming & Bureau
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          console.log('Rendering product:', product);
          return (
            <PcBureauCard
              key={product.id}
              product={product}
              onViewDetails={onProductSelect} // Passer la fonction onProductSelect comme onViewDetails
            />
          );
        })}
      </div>
    </div>
  );
};

export default PcBureauList;