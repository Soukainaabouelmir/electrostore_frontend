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
      
      console.log('API Response:', result);

      if (Array.isArray(result)) {
        const simpleMarques = result.map(marque => ({
          id: marque.id,
          nom: marque.nom,
          description: marque.description || '',
          logo: marque.logo || '',
          site: marque.site_web || marque.site || '',
          status: marque.status || 'active',
        }));

        setMarque(simpleMarques);
        setFilteredMarque(simpleMarques);
      }
      else if (result.success) {
        const simpleMarques = result.data.map(marque => ({
          id: marque.id,
          nom: marque.nom,
          description: marque.description || '',
          logo: marque.logo || '',
          site: marque.site_web || marque.site || '',
          status: marque.status || 'active',
          dateCreation: marque.created_at || new Date().toISOString().split('T')[0]
        }));
        
        setMarque(simpleMarques);
        setFilteredMarque(simpleMarques);
      } else {
        throw new Error(result.message || 'Erreur lors de la récupération des données');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des marques:', err);
      setError(err.message);
      
      // NE PAS utiliser les données mockées en cas d'erreur réelle
      // Seulement pour le développement
      if (process.env.NODE_ENV === 'development') {
        const mockMarques = [
          {
            id: 1,
            nom: 'Nike',
            description: 'Marque de sport et équipements sportifs',
            logo: 'https://logo.clearbit.com/nike.com',
            site: 'https://www.nike.com',
            status: 'active',
            dateCreation: '2024-01-15'
          }
        ];
        
        setMarque(mockMarques);
        setFilteredMarque(mockMarques);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (token && role === "admin") {
      fetchMarque();
    }
    
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
  }, []);

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
    setCurrentPage(1);
  }, [searchTerm, Marque]);

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

  const handleEditFromActionButtons = async (marque, formData) => {
    console.log('handleEditFromActionButtons called with:', marque, formData);
    
    try {
      const url = `${API_BASE_URL}/admin/marques/edit/${marque.id}`;
      
      const headers = {
        'Accept': 'application/json',
      };
      
      const isFormData = formData instanceof FormData;
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: isFormData ? formData : JSON.stringify(formData)
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

  const savemarques = async (marquesData, marqueId = null) => {
    try {
      const isEditing = marqueId || editingmarques;
      const finalId = marqueId || (editingmarques ? editingmarques.id : null);
      
      const url = isEditing 
        ? `${API_BASE_URL}/admin/marques/edit/${finalId}`
        : `${API_BASE_URL}/admin/marques/store`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
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

  // CORRECTION PRINCIPALE : Fonction de suppression améliorée
  const deletemarques = async (marquesId) => {
    try {
      setError(null); // Réinitialiser l'erreur avant la suppression
      
      const response = await fetch(`${API_BASE_URL}/admin/marques/delete/${marquesId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        // Recharger les données sans afficher d'erreur
        await fetchMarque();
        return { success: true };
      } else {
        throw new Error(result.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
     
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
      setError(null); 
      
      const result = await deletemarques(marques.id);
      if (!result.success) {
        alert('Erreur lors de la suppression de la marque: ' + result.error);
      } else {
        console.log('Marque supprimée avec succès');
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
    setError(null); // Réinitialiser les erreurs en fermant le modal
  };

  const handleRefresh = () => {
    setError(null); // Réinitialiser les erreurs au rafraîchissement
    fetchMarque();
  };

  // Vérification d'accès avant le rendu
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || role !== "admin") {
    return null;
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
          
          {/* Afficher l'erreur seulement si elle n'est pas liée à une suppression */}
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

          <TableMarque
            Marque={currentPageMarque}
            onEdit={handleEditmarques}
            onDelete={handleDeletemarques}
            searchTerm={searchTerm}
          />

          <Pagination
            totalItems={filteredMarque.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />

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