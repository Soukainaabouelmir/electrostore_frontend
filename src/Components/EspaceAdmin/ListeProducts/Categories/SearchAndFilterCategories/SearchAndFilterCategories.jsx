import React, { useState } from 'react';
import AddButton from '../../../../Shared/AddButton';
import SearchBar from '../../../../Shared/SearchBar';
import ExportButton from './ExportButton';
import FilterDropdown from './FilterDropDown';



const SearchAndFilterCategories = ({ 
  searchTerm, 
  setSearchTerm, 
  onAddNew,
  currentViewData,
  allData,
  totalCount,
  filteredCount
}) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterParent, setFilterParent] = useState('all');
  const [signature, setSignature] = useState(null);

  React.useEffect(() => {
    const savedSignature = localStorage.getItem('savedSignature');
    if (savedSignature) {
      setSignature(savedSignature);
    }
  }, []);

  // Statistiques pour les cards
  const stats = {
    total: totalCount,
    filtered: filteredCount,
    active: allData.filter(cat => cat.status === 'active').length,
    parents: allData.filter(cat => !cat.parent).length,
    children: allData.filter(cat => cat.parent).length
  };

  return (
    <div className="space-y-6">
   
          <div className="flex mb-4 flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <AddButton onClick={onAddNew} text="Nouvelle Catégorie" />

         {/* <div className="flex flex-wrap items-center gap-3">
          <FilterDropdown
            label="Status"
            value={filterStatus}
            onChange={setFilterStatus}
            options={[
              { value: 'all', label: 'Tous les status' },
              { value: 'active', label: 'Actives' },
              { value: 'inactive', label: 'Inactives' }
            ]}
          />
          
          <FilterDropdown
            label="Type"
            value={filterParent}
            onChange={setFilterParent}
            options={[
              { value: 'all', label: 'Tous les types' },
              { value: 'parent', label: 'Catégories principales' },
              { value: 'child', label: 'Sous-catégories' }
            ]}
          />

          <ExportButton 
            currentViewData={currentViewData} 
            allData={allData}
            signature={signature}
          />
        </div> */}
        <div className="flex-1 max-w-md">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            placeholder="Rechercher une catégorie..."
          />
        </div>
       
      </div>
    </div>
  );
};

export default SearchAndFilterCategories;
