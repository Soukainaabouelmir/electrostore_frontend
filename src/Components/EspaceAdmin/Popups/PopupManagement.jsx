import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import TablePopup from './TablePopup';
import SearchAndFilterPopup from './SearchAndFilterPopup/SearchAndFilterPopup';
import PopupModal from './PopupModal';
import Pagination from '../../Shared/Pagination'; 

const PopupManagement = () => {
  const navigate = useNavigate();
  const [Popup, setPopup] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPopups, setEditingPopups] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Refs pour éviter les appels multiples
  const isFetchingRef = useRef(false);
  const searchTimeoutRef = useRef(null);
  
  const API_BASE_URL = 'http://localhost:8000/api';

  // Vérification de l'authentification - Une seule fois
  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "admin") {
      navigate("/compte");
    }
  }, [navigate]);

  // Fonction fetchPopup optimisée avec protection contre les appels multiples
  const fetchPopup = useCallback(async () => {
    // Empêcher les appels multiples simultanés
    if (isFetchingRef.current) {
      console.log('Fetch déjà en cours, ignoré');
      return;
    }

    try {
      isFetchingRef.current = true;
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
      
      // Normalisation des données
      const normalizePopup = (popup) => ({
        id: popup.id,
        titre: popup.titre || '',
        description: popup.description || '',
        image: popup.image || '',
        lien: popup.lien_web || popup.lien || '',
        delai: popup.delai || '5s',
        is_active: popup.status || popup.is_active || 'active',
        dateCreation: popup.created_at || new Date().toISOString().split('T')[0]
      });

      let popupsData = [];
      if (Array.isArray(result)) {
        popupsData = result.map(normalizePopup);
      } else if (result.success && Array.isArray(result.data)) {
        popupsData = result.data.map(normalizePopup);
      } else {
        throw new Error(result.message || 'Erreur lors de la récupération des données');
      }

      setPopup(popupsData);
      
    } catch (err) {
      console.error('Erreur lors de la récupération des Popups:', err);
      setError(err.message);
      
      // Mock data en développement uniquement
      if (process.env.NODE_ENV === 'development') {
        const mockPopups = [{
          id: 1,
          titre: 'Nike',
          description: 'Popup de sport et équipements sportifs',
          image: 'https://logo.clearbit.com/nike.com',
          lien: 'https://www.nike.com',
          delai: '5s',
          is_active: 'active',
          dateCreation: '2024-01-15'
        }];
        setPopup(mockPopups);
      }
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [API_BASE_URL]);

  // Chargement initial - Une seule fois
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
    fetchPopup();
  }, [fetchPopup]);

  // Filtrage optimisé avec useMemo
  const filteredPopup = useMemo(() => {
    if (!searchTerm.trim()) {
      return Popup;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return Popup.filter(popup =>
      popup.titre.toLowerCase().includes(searchLower) ||
      (popup.description && popup.description.toLowerCase().includes(searchLower)) ||
      (popup.lien && popup.lien.toLowerCase().includes(searchLower))
    );
  }, [Popup, searchTerm]);

  // Pagination optimisée avec useMemo
  const currentPagePopup = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPopup.slice(startIndex, endIndex);
  }, [filteredPopup, currentPage, itemsPerPage]);

  // Réinitialiser la page quand le filtre change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Gestion de la recherche avec debouncing
  const handleSearchChange = useCallback((value) => {
    // Annuler le timeout précédent
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Délai de 300ms avant d'appliquer la recherche
    searchTimeoutRef.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  }, []);

  // Nettoyage du timeout
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  const handleEditFromActionButtons = useCallback(async (popup, formData) => {
    try {
      const url = `${API_BASE_URL}/admin/popups/edit/${popup.id}`;
      
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
        // Mise à jour optimiste de l'état local
        setPopup(prevPopup => 
          prevPopup.map(p => p.id === popup.id ? { ...p, ...formData } : p)
        );
        // Rafraîchir ensuite pour avoir les données serveur
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
  }, [API_BASE_URL, fetchPopup]);

  const savePopups = useCallback(async (PopupsData, PopupId = null) => {
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
  }, [API_BASE_URL, editingPopups, fetchPopup]);

  const deletePopups = useCallback(async (PopupsId) => {
    try {
      setError(null);
      
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
        // Mise à jour optimiste - suppression immédiate de l'UI
        setPopup(prevPopup => prevPopup.filter(p => p.id !== PopupsId));
        return { success: true };
      } else {
        throw new Error(result.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      return { success: false, error: err.message };
    }
  }, [API_BASE_URL]);

  const handleAddPopups = useCallback(() => {
    setEditingPopups(null);
    setShowModal(true);
  }, []);

  const handleEditPopups = useCallback((Popups) => {
    setEditingPopups(Popups);
    setShowModal(true);
  }, []);

  const handleDeletePopups = useCallback(async (Popups) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette Popup ?')) {
      setError(null);
      const result = await deletePopups(Popups.id);
      if (!result.success) {
        alert('Erreur lors de la suppression de la Popup: ' + result.error);
      }
    }
  }, [deletePopups]);

  const handleSavePopups = useCallback(async (PopupsData) => {
    const result = await savePopups(PopupsData);
    if (result.success) {
      setShowModal(false);
      setEditingPopups(null);
    } else {
      alert(`Erreur lors de la sauvegarde: ${result.error}`);
    }
  }, [savePopups]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditingPopups(null);
    setError(null);
  }, []);

  const handleRefresh = useCallback(() => {
    setError(null);
    fetchPopup();
  }, [fetchPopup]);

  // Vérification finale de l'authentification
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
            setSearchTerm={handleSearchChange}
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