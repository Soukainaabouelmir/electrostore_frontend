import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TableMarque from './TableMarque';
import SearchAndFilterMarque from './SearchAndFilterMarque/SearchAndFilterMarque';
import MarqueModal from './MarqueModal';
import Pagination from '../../../Shared/Pagination'; 

const MarqueManagement = () => {
  const navigate = useNavigate();
  const [Marque, setMarque] = useState([]);
  const [filteredMarque, setFilteredMarque] = useState([]);
  const [currentPageMarque, setCurrentPageMarque] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [editingmarques, setEditingmarques] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const API_BASE_URL = 'http://localhost:8000/api'; 

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    // Vérification d'authentification
    if (!token || role !== "admin") {
      navigate("/compte"); 
      return;
    }
  }, [navigate]);

  const fetchMarque = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/admin/marques`, {
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
      
      console.log('API Response:', result); // Debug log

      // Si l'API retourne directement un tableau
      if (Array.isArray(result)) {
        const simpleMarques = result.map(marque => ({
          id: marque.id,
          nom: marque.nom,
          description: marque.description || '',
          logo: marque.logo || '',
          site: marque.site_web || marque.site || '',
          status: marque.status || 'active',
        }));

        console.log('Transformed marques:', simpleMarques);
        setMarque(simpleMarques);
        setFilteredMarque(simpleMarques);
      }
      // Si l'API retourne un objet avec success et data
      else if (result.success) {
        // Transformation des données pour une structure simple (sans hiérarchie)
        const simpleMarques = result.data.map(marque => ({
          id: marque.id,
          nom: marque.nom,
          description: marque.description || '',
          logo: marque.logo || '',
          site: marque.site_web || marque.site || '',
          status: marque.status || 'active',
          dateCreation: marque.created_at || new Date().toISOString().split('T')[0]
        }));

        console.log('Transformed marques:', simpleMarques); // Debug log
        
        setMarque(simpleMarques);
        setFilteredMarque(simpleMarques);
      } else {
        throw new Error(result.message || 'Erreur lors de la récupération des données');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des marques:', err);
      setError(err.message);
      
      // Données de test avec la nouvelle structure
      const mockMarques = [
        {
          id: 1,
          nom: 'Nike',
          description: 'Marque de sport et équipements sportifs',
          logo: 'https://logo.clearbit.com/nike.com',
          site: 'https://www.nike.com',
          status: 'active',
          dateCreation: '2024-01-15'
        },
        {
          id: 2,
          nom: 'Adidas',
          description: 'Équipements sportifs et vêtements de sport',
          logo: 'https://logo.clearbit.com/adidas.com',
          site: 'https://www.adidas.com',
          status: 'active',
          dateCreation: '2024-01-16'
        },
        {
          id: 3,
          nom: 'Apple',
          description: 'Technologie et électronique grand public',
          logo: 'https://logo.clearbit.com/apple.com',
          site: 'https://www.apple.com',
          status: 'active',
          dateCreation: '2024-01-17'
        }
      ];
      
      setMarque(mockMarques);
      setFilteredMarque(mockMarques);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Vérification d'authentification avant de charger les données
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (token && role === "admin") {
      fetchMarque();
    }
    
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
  }, []);

  // Effet pour filtrer les marques selon le terme de recherche
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMarque(Marque);
    } else {
      const filtered = Marque.filter(marque =>
        marque.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (marque.description && marque.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (marque.site && marque.site.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredMarque(filtered);
    }
    setCurrentPage(1); // Revenir à la première page lors de la recherche
  }, [searchTerm, Marque]);

  // Effet pour la pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentPageMarque(filteredMarque.slice(startIndex, endIndex));
  }, [filteredMarque, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); 
  };

  // Dans MarqueManagement.js - Modifier la fonction savemarques

const savemarques = async (marquesData) => {
  try {
    const url = editingmarques 
      ? `${API_BASE_URL}/admin/marques/${editingmarques.id}`
      : `${API_BASE_URL}/admin/marques/store`;
    
    const method = editingmarques ? 'PUT' : 'POST';
    
    // Vérifier si c'est FormData (avec fichier) ou objet simple
    const isFormData = marquesData instanceof FormData;
    
    const headers = {
      'Accept': 'application/json',
    };
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: isFormData ? marquesData : JSON.stringify(marquesData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    
    if (result.success) {
      await fetchMarque();
      return { success: true };
    } else {
      throw new Error(result.message || 'Erreur lors de la sauvegarde');
    }
  } catch (err) {
    console.error('Erreur lors de la sauvegarde:', err);
    setError(err.message);
    return { success: false, error: err.message };
  }
};

  const deletemarques = async (marquesId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/marques/${marquesId}`, {
        method: 'DELETE',
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
        await fetchMarque();
        return { success: true };
      } else {
        throw new Error(result.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const handleAddmarques = () => {
    setEditingmarques(null);
    setShowModal(true);
  };

  const handleEditmarques = (marques) => {
    setEditingmarques(marques);
    setShowModal(true);
  };

  const handleDeletemarques = async (marques) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette marque ?')) {
      const result = await deletemarques(marques.id);
      if (!result.success) {
        alert('Erreur lors de la suppression de la marque: ' + result.error);
      }
    }
  };

  const handleSavemarques = async (marquesData) => {
    const result = await savemarques(marquesData);
    if (result.success) {
      setShowModal(false);
      setEditingmarques(null);
    } else {
      alert(`Erreur lors de la sauvegarde: ${result.error}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingmarques(null);
  };

  const handleRefresh = () => {
    fetchMarque();
  };

  // Vérification d'accès avant le rendu
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || role !== "admin") {
    return null; // Le useEffect va rediriger
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement des marques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
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
          <SearchAndFilterMarque 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddNew={handleAddmarques}
            onRefresh={handleRefresh}
            currentViewData={currentPageMarque}
            allData={Marque}
            totalCount={Marque.length}
            filteredCount={filteredMarque.length}
          />

          {/* Tableau des marques */}
          <TableMarque
            Marque={currentPageMarque}
            onEdit={handleEditmarques}
            onDelete={handleDeletemarques}
            searchTerm={searchTerm}
          />

          {/* Pagination */}
          <Pagination
            totalItems={filteredMarque.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />

          {/* Modal pour ajout/modification */}
          {showModal && (
            <MarqueModal
              marques={editingmarques}
              Marque={Marque}
              onSave={handleSavemarques}
              onClose={handleCloseModal}
              isOpen={showModal}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default MarqueManagement;