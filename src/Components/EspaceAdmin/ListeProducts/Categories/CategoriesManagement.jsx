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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration de l'API - ajustez l'URL selon votre configuration
  const API_BASE_URL = 'http://localhost:8000/api'; // Remplacez par votre URL d'API

  // Fonction pour récupérer les catégories depuis l'API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/admin/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
         
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        // Transformer les données pour correspondre au format attendu par votre composant
        const transformedData = result.data.map(category => ({
          id: category.id,
          nom: category.nom,
          parent: category.parent_name,
          parent_id: category.parent_id,
          subCategories: [], // Vous pouvez calculer cela si nécessaire
          dateCreation: category.created_at || new Date().toISOString().split('T')[0],
          status: category.status || 'active',
          isMainCategory: category.is_main_category
        }));

        // Calculer les sous-catégories pour chaque catégorie principale
        const categoriesWithSubCategories = transformedData.map(category => {
          if (category.isMainCategory) {
            const subCategories = transformedData
              .filter(subCat => subCat.parent_id === category.id)
              .map(subCat => subCat.nom);
            
            return {
              ...category,
              subCategories: subCategories
            };
          }
          return category;
        });

        setCategories(categoriesWithSubCategories);
        setFilteredCategories(categoriesWithSubCategories);
      } else {
        throw new Error(result.message || 'Erreur lors de la récupération des données');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des catégories:', err);
      setError(err.message);
      
      // En cas d'erreur, utiliser les données mockées comme fallback
      const mockCategories = [
        {
          id: 1,
          nom: 'Ordinateurs',
          parent: null,
          subCategories: ['Pc Gamer', 'Pc Bureau', 'Pc Portable', 'Mac', 'Pc Ultrabook'],
          dateCreation: '2024-01-15',
          status: 'active'
        },
        // Ajoutez d'autres catégories mockées si nécessaire
      ];
      
      setCategories(mockCategories);
      setFilteredCategories(mockCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    const filtered = filterCategories(categories, searchTerm);
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const saveCategory = async (categoryData) => {
    try {
      const url = editingCategory 
        ? `${API_BASE_URL}/categories/${editingCategory.id}`
        : `${API_BASE_URL}/categories`;
      
      const method = editingCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(categoryData)
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await fetchCategories();
        return true;
      } else {
        throw new Error(result.message || 'Erreur lors de la sauvegarde');
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError(err.message);
      return false;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await fetchCategories();
        return true;
      } else {
        throw new Error(result.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError(err.message);
      return false;
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = async (category) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      const success = await deleteCategory(category.id);
      if (!success) {
        alert('Erreur lors de la suppression de la catégorie');
      }
    }
  };

  const handleSaveCategory = async (categoryData) => {
    const success = await saveCategory(categoryData);
    if (success) {
      setShowModal(false);
      setEditingCategory(null);
    } else {
      alert('Erreur lors de la sauvegarde de la catégorie');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  // Fonction pour rafraîchir les données
  const handleRefresh = () => {
    fetchCategories();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement des catégories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Affichage des erreurs */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Erreur: </strong>
              <span className="block sm:inline">{error}</span>
              <button 
                onClick={() => setError(null)}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                <span className="sr-only">Fermer</span>
                &times;
              </button>
            </div>
          )}
          
          {/* Header avec recherche et filtres */}
          <SearchAndFilterCategories 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddNew={handleAddCategory}
            onRefresh={handleRefresh}
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