import React, { useState, useEffect } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

const PopupModal = ({ Popups, onSave, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    lien: '',
    image: null, // Changé pour s
    is_active: 'active',
    delai:'',
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  // Initialiser le formulaire quand on édite une Popup
  useEffect(() => {
    if (Popups) {
      setFormData({
        titre: Popups.titre || '',
        description: Popups.description || '',
        lien: Popups.lien || '',
        image: null, // Réinitialiser le fichier
        is_active: Popups.is_active || 'active',
        delai: Popups.delai || ''
      });
      setImagePreview(Popups.image || '');
    } else {
      // Réinitialiser pour un nouvel ajout
      setFormData({
        titre: '',
        description: '',
        lien: '',
        image: null,
        is_active: 'active',
        delai:'',
      });
      setImagePreview('');
    }
    setErrors({});
  }, [Popups, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Créer une prévisualisation
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview('');
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Supprimer l'erreur du champ quand l'utilisateur commence à taper
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titre.trim()) {
      newErrors.titre = 'Le titre de la Popup est obligatoire';
    }

    if (formData.lien && !isValidUrl(formData.lien)) {
      newErrors.lien = 'Veuillez entrer une URL valide (ex: https://www.exemple.com)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Dans PopupModal.js - Modifier la fonction handleSubmit

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    const submitData = new FormData();
    submitData.append('titre', formData.titre);
    submitData.append('description', formData.description || '');
    submitData.append('lien', formData.lien || '');
    submitData.append('is_active', formData.is_active);
    submitData.append('delai', formData.delai || '');
    
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    const result = await onSave(submitData);
    if (result && result.success) {
      onClose();
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  } finally {
    setIsLoading(false);
  }
};

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed  inset-0 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {Popups ? 'Modifier la Popup' : 'Ajouter une nouvelle Popup'}
          </h3>
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="titre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                titre de la Popup <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="titre"
                name="titre"
                value={formData.titre}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
                  errors.titre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Popup..."
                disabled={isLoading}
              />
              {errors.titre && (
                <p className="mt-1 text-sm text-red-600">{errors.titre}</p>
              )}
            </div>

            <div>
              <label htmlFor="is_active" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Statut
              </label>
              <select
                id="is_active"
                name="is_active"
                value={formData.is_active}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                disabled={isLoading}
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="lien" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                lien 
              </label>
              <input
                type="url"
                id="lien"
                name="lien"
                value={formData.lien}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
                  errors.lien ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://www.exemple.com"
                disabled={isLoading}
              />
              {errors.lien && (
                <p className="mt-1 text-sm text-red-600">{errors.lien}</p>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                image (Fichier)
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
            </div>
          </div>

<div className='mb-3'>
              <label htmlFor="lien" className="block text-sm  font-medium text-gray-700 dark:text-gray-300 mb-2">
                Délai (ms)
              </label>
              <input
                type="number"
                id="delai"
                name="delai"
                value={formData.delai}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
                  errors.delai ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2000"
                disabled={isLoading}
              />
              {errors.delai && (
                <p className="mt-1 text-sm text-red-600">{errors.delai}</p>
              )}
            </div>

          {imagePreview && (
            <div className="mb-6  flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">Aperçu:</span>
              <div className="flex items-center">
                <img
                  src={imagePreview}
                  alt="Aperçu du image"
                  className="h-16 w-16 rounded object-contain border border-gray-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="h-16 w-16 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center" style={{display: 'none'}}>
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>
          )}
            <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              placeholder="Décrivez brièvement la Popup..."
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sauvegarde...
                </span>
              ) : (
                Popups ? 'Modifier' : 'Ajouter'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupModal;