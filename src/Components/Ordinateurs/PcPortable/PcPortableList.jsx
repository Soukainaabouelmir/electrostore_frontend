import { useState } from 'react';
import PcPortableCard from './PcPortableCard';

const PcPortableList = ({ products = [], onProductSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  // Calculer les produits à afficher sur la page actuelle
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Calculer le nombre total de pages
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  // Fonction pour changer de page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0); // Remonter en haut de page
    }
  };

  const handleViewDetails = (product) => {
    if (!onProductSelect) {
      console.error('onProductSelect prop is missing in PcPortableList');
      return;
    }
    
    if (typeof onProductSelect !== 'function') {
      console.error('onProductSelect is not a function, received:', typeof onProductSelect);
      return;
    }

    onProductSelect(product);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">Aucun produit à afficher</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-2 px-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        {currentProducts.map(product => (
          <PcPortableCard 
            key={product.id} 
            product={product} 
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Précédent
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default PcPortableList;