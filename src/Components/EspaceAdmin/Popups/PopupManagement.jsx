import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TablePopup from './TablePopup';
import SearchAndFilterPopup from './SearchAndFilterPopup/SearchAndFilterPopup';
import PopupModal from './PopupModal';
import Pagination from '../../Shared/Pagination'; 

const PopupManagement = () => {
  const navigate = useNavigate();
  const [Popup, setPopup] = useState([]);
  const [filteredPopup, setFilteredPopup] = useState([]);
  const [currentPagePopup, setCurrentPagePopup] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [editingPopups, setEditingPopups] = useState(null);
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

 // Dans PopupManagement.js - Modifiez la fonction fetchPopup
const fetchPopup = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await fetch(`${API_BASE_URL}/admin/popups`, {
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
      const simplePopups = result.map(popup => ({
        id: popup.id,
        titre: popup.titre || popup.titre, // CORRECTION: utiliser 'titre' au lieu de 'titre'
        description: popup.description || '',
        image: popup.image || '',
        lien: popup.lien_web || popup.lien || popup.lien || '', // CORRECTION: utiliser 'lien' au lieu de 'lien'
        delai: popup.delai || '5s', // AJOUT: propriété delai
        is_active: popup.status || popup.is_active || 'active', // CORRECTION: utiliser 'is_active'
        dateCreation: popup.created_at || new Date().toISOString().split('T')[0]
      }));

      setPopup(simplePopups);
      setFilteredPopup(simplePopups);
    }
    else if (result.success) {
      const simplePopups = result.data.map(popup => ({
        id: popup.id,
        titre: popup.titre || popup.titre, // CORRECTION
        description: popup.description || '',
        image: popup.image || '',
        lien: popup.lien_web || popup.lien || popup.lien || '', // CORRECTION
        delai: popup.delai || '5s', // AJOUT
        is_active: popup.status || popup.is_active || 'active', // CORRECTION
        dateCreation: popup.created_at || new Date().toISOString().split('T')[0]
      }));
      
      setPopup(simplePopups);
      setFilteredPopup(simplePopups);
    } else {
      throw new Error(result.message || 'Erreur lors de la récupération des données');
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des Popups:', err);
    setError(err.message);
    
    if (process.env.NODE_ENV === 'development') {
      const mockPopups = [
        {
          id: 1,
          titre: 'Nike', // CORRECTION: 'titre' au lieu de 'titre'
          description: 'Popup de sport et équipements sportifs',
          image: 'https://logo.clearbit.com/nike.com',
          lien: 'https://www.nike.com', // CORRECTION: 'lien' au lieu de 'lien'
          delai: '5s', // AJOUT
          is_active: 'active', // CORRECTION: 'is_active' au lieu de 'status'
          dateCreation: '2024-01-15'
        }
      ];
      
      setPopup(mockPopups);
      setFilteredPopup(mockPopups);
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (token && role === "admin") {
      fetchPopup();
    }
    
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPopup(Popup);
    } else {
      const filtered = Popup.filter(Popup =>
        Popup.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Popup.description && Popup.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Popup.lien && Popup.lien.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPopup(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, Popup]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentPagePopup(filteredPopup.slice(startIndex, endIndex));
  }, [filteredPopup, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); 
  };

  const handleEditFromActionButtons = async (Popup, formData) => {
    console.log('handleEditFromActionButtons called with:', Popup, formData);
    
    try {
      const url = `${API_BASE_URL}/admin/popups/edit/${Popup.id}`;
      
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
        await fetchPopup();
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

  const savePopups = async (PopupsData, PopupId = null) => {
    try {
      const isEditing = PopupId || editingPopups;
      const finalId = PopupId || (editingPopups ? editingPopups.id : null);
      
      const url = isEditing 
        ? `${API_BASE_URL}/admin/popups/edit/${finalId}`
        : `${API_BASE_URL}/admin/popups/store`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const isFormData = PopupsData instanceof FormData;
      
      const headers = {
        'Accept': 'application/json',
      };
      
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }
      
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: isFormData ? PopupsData : JSON.stringify(PopupsData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await fetchPopup();
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
  const deletePopups = async (PopupsId) => {
    try {
      setError(null); // Réinitialiser l'erreur avant la suppression
      
      const response = await fetch(`${API_BASE_URL}/admin/popups/delete/${PopupsId}`, {
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
        await fetchPopup();
        return { success: true };
      } else {
        throw new Error(result.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
     
      return { success: false, error: err.message };
    }
  };

  const handleAddPopups = () => {
    setEditingPopups(null);
    setShowModal(true);
  };

  const handleEditPopups = (Popups) => {
    setEditingPopups(Popups);
    setShowModal(true);
  };

  const handleDeletePopups = async (Popups) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette Popup ?')) {
      setError(null); 
      
      const result = await deletePopups(Popups.id);
      if (!result.success) {
        alert('Erreur lors de la suppression de la Popup: ' + result.error);
      } else {
        console.log('Popup supprimée avec succès');
      }
    }
  };

  const handleSavePopups = async (PopupsData) => {
    const result = await savePopups(PopupsData);
    if (result.success) {
      setShowModal(false);
      setEditingPopups(null);
    } else {
      alert(`Erreur lors de la sauvegarde: ${result.error}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPopups(null);
    setError(null); 
  };

  const handleRefresh = () => {
    setError(null); 
    fetchPopup();
  };

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
          <p className="text-gray-600 dark:text-gray-400">Chargement des Popups...</p>
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
          
          <SearchAndFilterPopup 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddNew={handleAddPopups}
            onRefresh={handleRefresh}
            currentViewData={currentPagePopup}
            allData={Popup}
            totalCount={Popup.length}
            filteredCount={filteredPopup.length}
          />

          <TablePopup
            Popup={currentPagePopup}
            onEdit={handleEditPopups}
            onDelete={handleDeletePopups}
            searchTerm={searchTerm}
          />

          <Pagination
            totalItems={filteredPopup.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />

          {showModal && (
            <PopupModal
              Popups={editingPopups}
              Popup={Popup}
              onSave={handleSavePopups}
              onClose={handleCloseModal}
              isOpen={showModal}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default PopupManagement;