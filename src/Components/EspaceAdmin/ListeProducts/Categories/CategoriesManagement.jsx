import React, { useState, useEffect } from 'react';
import TableCategories from './TableCategories';
import SearchAndFilterCategories from './SearchAndFilterCategories/SearchAndFilterCategories';
import CategoryModal from './CategoryModal';
import { filterCategories } from '../../../Shared/filterCategories';


const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Données d'exemple pour les catégories
  useEffect(() => {
    const mockCategories = [
      {
        id: 1,
        nom: 'Ordinateurs',
        parent: null,
        subCategories: ['Pc Gamer', 'Pc Bureau', 'Pc Portable', 'Mac', 'Pc Ultrabook'],
        dateCreation: '2024-01-15',
        status: 'active'
      },
      {
        id: 2,
        nom: 'Vêtements',
        parent: null,
        subCategories: ['Hommes', 'Femmes', 'Enfants'],
        dateCreation: '2024-01-20',
        status: 'active'
      },
      {
        id: 3,
        nom: 'Pc Gamer',
        parent: 'Ordinateurs',
        subCategories: ['Gaming Intel', 'Gaming AMD', 'Gaming Custom'],
        dateCreation: '2024-02-01',
        status: 'active'
      },
      {
        id: 4,
        nom: 'Maison & Jardin',
        parent: null,
        subCategories: ['Mobilier', 'Décoration', 'Jardinage'],
        dateCreation: '2024-02-10',
        status: 'inactive'
      }
    ];
    
    setCategories(mockCategories);
    setFilteredCategories(mockCategories);
    
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    const filtered = filterCategories(categories, searchTerm);
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      setCategories(prevCategories => 
        prevCategories.filter(cat => cat.id !== categoryId)
      );
    }
  };

  const handleSaveCategory = (categoryData) => {
    if (editingCategory) {
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.id === editingCategory.id 
            ? { ...cat, ...categoryData, dateModification: new Date().toISOString().split('T')[0] }
            : cat
        )
      );
    } else {
      const newCategory = {
        id: Math.max(...categories.map(c => c.id), 0) + 1,
        ...categoryData,
        dateCreation: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setCategories(prevCategories => [...prevCategories, newCategory]);
    }
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Header avec recherche et filtres */}
          <SearchAndFilterCategories 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddNew={handleAddCategory}
            currentViewData={filteredCategories}
            allData={categories}
            totalCount={categories.length}
            filteredCount={filteredCategories.length}
          />

          {/* Tableau des catégories */}
          <TableCategories
            categories={filteredCategories}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
            searchTerm={searchTerm}
          />

          {/* Modal pour ajout/modification */}
          {showModal && (
            <CategoryModal
              category={editingCategory}
              categories={categories}
              onSave={handleSaveCategory}
              onClose={handleCloseModal}
              isOpen={showModal}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement;